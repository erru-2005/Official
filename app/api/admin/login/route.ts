import { createSupabaseServerClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

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

    const { data, error } = await supabase.rpc("verify_admin_password", {
      email,
      password,
    });

    if (error) {
      console.error("[admin-login] RPC error:", error.message, error.code, error.details);
      const isPgCrypto = error.message?.includes("crypt");
      const isMissingFn = error.message?.includes("does not exist") || error.code === "PGRST202";
      return NextResponse.json(
        {
          error: isPgCrypto
            ? "Auth setup incomplete: run 'CREATE EXTENSION IF NOT EXISTS pgcrypto;' in Supabase SQL Editor first."
            : isMissingFn
              ? "Admin auth not set up. Run supabase/run_all_migrations.sql in the Supabase SQL Editor."
              : "Authentication service unavailable.",
        },
        { status: 503 },
      );
    }

    if (data === true) {
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  } catch (err) {
    console.error("[admin-login] Server error:", err);
    return NextResponse.json(
      { error: "Server configuration error." },
      { status: 500 },
    );
  }
}
