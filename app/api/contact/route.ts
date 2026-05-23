import { createSupabaseServerClient } from "@/lib/supabase/server";
import { validateContactForm } from "@/lib/validation/contact";
import { NextResponse } from "next/server";

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

  const { name, type, message } = body as Record<string, unknown>;

  const validated = validateContactForm(
    {
      name: String(name ?? ""),
      type: String(type ?? ""),
      message: String(message ?? ""),
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

    const { error } = await supabase.from("contact_inquiries").insert({
      name: validated.data.name,
      inquiry_type: validated.data.inquiry_type,
      message: validated.data.message,
      source: validated.data.source,
      user_agent: validated.data.user_agent,
      page_path: validated.data.page_path,
      status: "new",
    });

    if (error) {
      console.error("[contact] Supabase insert failed:", error.message);
      return NextResponse.json(
        {
          error:
            "Unable to save your message right now. Please try again shortly.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        ok: true,
        inquiry_type: validated.data.inquiry_type,
      },
      { status: 201 },
    );
  } catch (err) {
    console.error("[contact] Server error:", err);
    return NextResponse.json(
      { error: "Server configuration error. Contact support." },
      { status: 500 },
    );
  }
}
