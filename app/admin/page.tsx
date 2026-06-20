"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const clickCountRef = useRef<number>(0);
  const clickTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const handleImageClick = useCallback(() => {
    clickCountRef.current += 1;

    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);

    if (clickCountRef.current >= 3) {
      clickCountRef.current = 0;
      setShowLogin(true);
      return;
    }

    clickTimerRef.current = setTimeout(() => {
      clickCountRef.current = 0;
    }, 1500);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          password,
          route: "/admin",
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setAuthenticated(true);
        setShowLogin(false);
      } else {
        setError(data.error ?? "Invalid credentials");
      }
    } catch {
      setError("Connection error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (authenticated) {
    return (
      <div className="select-none min-h-screen bg-white font-serif text-black">
        <div className="relative mx-auto w-full max-w-[clamp(20rem,92vw,76rem)] px-6 sm:px-12 lg:px-16 pt-14 sm:pt-20 lg:pt-40 pb-12">
          <div className="mb-12">
            <p className="text-sm mb-2 font-semibold tracking-[0.25em] text-black/50 uppercase">
              Admin Panel
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-black">
              Dashboard
            </h1>
          </div>

          <div className="grid gap-6 md:grid-cols-3 mb-8">
            <div className="rounded-lg border border-black/10 bg-black/[0.02] p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-black/50">
                Total Projects
              </p>
              <p className="text-4xl font-bold mt-2">5</p>
            </div>
            <div className="rounded-lg border border-black/10 bg-black/[0.02] p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-black/50">
                Contact Inquiries
              </p>
              <p className="text-4xl font-bold mt-2">—</p>
            </div>
            <div className="rounded-lg border border-black/10 bg-black/[0.02] p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-black/50">
                Experiences
              </p>
              <p className="text-4xl font-bold mt-2">—</p>
            </div>
          </div>

          <div className="rounded-lg border border-black/10 bg-black/[0.02] p-6">
            <h2 className="text-lg font-bold mb-3">Site Overview</h2>
            <p className="text-sm text-black/60 leading-relaxed">
              Welcome to KEDANTRA admin. All systems operational.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="select-none bg-white font-serif min-h-screen flex items-center justify-center">
      <div className="container mx-auto">
        <div className="flex justify-center">
          <div className="w-full sm:w-10/12 md:w-8/12 text-center">
            <div
              className="bg-[url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)] h-[250px] sm:h-[350px] md:h-[400px] bg-center bg-no-repeat bg-contain cursor-pointer"
              onClick={handleImageClick}
              aria-hidden="true"
            >
              <h1 className="text-center text-black text-6xl sm:text-7xl md:text-8xl pt-6 sm:pt-8">
                404
              </h1>
            </div>

            <div className="mt-[-50px]">
              <h3 className="text-2xl text-black sm:text-3xl font-bold mb-4">
                Look like you&apos;re lost
              </h3>
              <p className="mb-6 text-black sm:mb-5">
                The page you are looking for is not available!
              </p>

              <Button
                variant="default"
                asChild
                className="my-5 bg-green-600 hover:bg-green-700"
              >
                <Link href="/">Go to KEDANTRA</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {showLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-sm mx-4 rounded-lg border border-black/10 bg-white p-6 shadow-2xl">
            <h2 className="font-serif text-lg font-bold text-black mb-5">
              Access
            </h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs text-black/50 mb-1.5 uppercase tracking-wider">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-black/10 bg-black/[0.02] px-3.5 py-2.5 text-sm text-black outline-none focus:border-black/30 transition-colors placeholder:text-black/20"
                  placeholder="kedantra@gmail.com"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-black/50 mb-1.5 uppercase tracking-wider">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-black/10 bg-black/[0.02] px-3.5 py-2.5 text-sm text-black outline-none focus:border-black/30 transition-colors placeholder:text-black/20"
                  placeholder="••••••••"
                  required
                />
              </div>
              {error && (
                <p className="text-sm text-red-500/80">{error}</p>
              )}
              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setShowLogin(false);
                    setError("");
                  }}
                  className="flex-1 rounded-lg border border-black/10 px-4 py-2.5 text-sm text-black/50 hover:bg-black/[0.02] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 rounded-lg bg-black px-4 py-2.5 text-sm font-semibold text-white hover:bg-black/90 transition-colors disabled:opacity-50"
                >
                  {loading ? "Validating..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
