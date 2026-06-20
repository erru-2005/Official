import { createSupabaseServerClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

const ADMIN_EMAIL = "kedantra@gmail.com";
const ADMIN_PASSWORD = "kedantra";

export async function POST(request: Request) {
  const referer = request.headers.get("referer") ?? "";
  if (!referer.includes("/admin")) {
    return NextResponse.json({ error: "Unauthorized origin" }, { status: 403 });
  }

  let body: { email?: string; password?: string; route?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { email, password, route } = body;

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password required" },
      { status: 400 },
    );
  }

  if (route !== "/admin") {
    return NextResponse.json({ error: "Invalid route" }, { status: 403 });
  }

  try {
    const supabase = createSupabaseServerClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (!authError) {
      return NextResponse.json({ ok: true });
    }
  } catch {
    // Supabase unavailable — fall through to hardcoded check
  }

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
}
