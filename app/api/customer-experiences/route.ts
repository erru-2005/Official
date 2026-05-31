import { mapRowToCard } from "@/lib/customer-experiences";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { CustomerExperienceRow } from "@/lib/types/customer-experience";
import { validateCustomerExperienceForm } from "@/lib/validation/customer-experience";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = createSupabaseServerClient();

    const { data, error } = await supabase
      .from("customer_experiences")
      .select("id, quote, author, role, company, image_url, created_at")
      .eq("is_published", true)
      .order("created_at", { ascending: false });

    const mockExperiences = [
      {
        id: "mock-1",
        quote: "KEDANTRA delivered our next-gen enterprise dashboard ahead of schedule. The security posture and real-time AI automation exceeded all expectations.",
        author: "Sarah Chen",
        role: "Creative Director",
        company: "Studio Forma",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80",
      },
      {
        id: "mock-2",
        quote: "The integration of secure, scalable APIs into our banking portal was seamless. Working with KEDANTRA was the best decision we made this year.",
        author: "Marcus Vance",
        role: "VP of Engineering",
        company: "Zenith Digital",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
      },
      {
        id: "mock-3",
        quote: "Their autonomous agent technology helped us automate over 85% of our customer operations. Exceptional craftsmanship and performance.",
        author: "Elena Rostova",
        role: "CEO",
        company: "NovaSphere",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&auto=format&fit=crop&q=80",
      }
    ];

    if (error) {
      console.warn("[customer-experiences] Supabase select failed. Falling back to mock testimonials:", error.message);
      return NextResponse.json({ experiences: mockExperiences });
    }

    const experiences = (data ?? []).map(mapRowToCard);

    return NextResponse.json({ experiences });
  } catch (err) {
    console.warn("[customer-experiences] Server error. Falling back to mock testimonials:", err);
    const mockExperiences = [
      {
        id: "mock-1",
        quote: "KEDANTRA delivered our next-gen enterprise dashboard ahead of schedule. The security posture and real-time AI automation exceeded all expectations.",
        author: "Sarah Chen",
        role: "Creative Director",
        company: "Studio Forma",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80",
      },
      {
        id: "mock-2",
        quote: "The integration of secure, scalable APIs into our banking portal was seamless. Working with KEDANTRA was the best decision we made this year.",
        author: "Marcus Vance",
        role: "VP of Engineering",
        company: "Zenith Digital",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
      },
      {
        id: "mock-3",
        quote: "Their autonomous agent technology helped us automate over 85% of our customer operations. Exceptional craftsmanship and performance.",
        author: "Elena Rostova",
        role: "CEO",
        company: "NovaSphere",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&auto=format&fit=crop&q=80",
      }
    ];
    return NextResponse.json({ experiences: mockExperiences });
  }
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { quote, author, role, company, image_url } = body as Record<
    string,
    unknown
  >;

  const validated = validateCustomerExperienceForm(
    {
      quote: String(quote ?? ""),
      author: String(author ?? ""),
      role: role != null ? String(role) : undefined,
      company: company != null ? String(company) : undefined,
      image_url: image_url != null ? String(image_url) : undefined,
    },
    {
      userAgent: request.headers.get("user-agent"),
      pagePath:
        request.headers.get("referer") ??
        request.headers.get("x-page-path") ??
        null,
    },
  );

  if (!validated.ok) {
    return NextResponse.json({ error: validated.error }, { status: 400 });
  }

  try {
    const supabase = createSupabaseServerClient();

    const { data, error } = await supabase
      .from("customer_experiences")
      .insert({
        quote: validated.data.quote,
        author: validated.data.author,
        role: validated.data.role,
        company: validated.data.company,
        image_url: validated.data.image_url,
        source: validated.data.source,
        user_agent: validated.data.user_agent,
        page_path: validated.data.page_path,
        is_published: true,
      })
      .select("id, quote, author, role, company, image_url")
      .single();

    if (error || !data) {
      console.error(
        "[customer-experiences] Supabase insert failed:",
        error?.message,
      );
      return NextResponse.json(
        {
          error:
            "Unable to save your experience right now. Please try again shortly.",
        },
        { status: 500 },
      );
    }

    const experience = mapRowToCard(data as CustomerExperienceRow);

    return NextResponse.json({ ok: true, experience }, { status: 201 });
  } catch (err) {
    console.error("[customer-experiences] Server error:", err);
    return NextResponse.json(
      { error: "Server configuration error. Contact support." },
      { status: 500 },
    );
  }
}
