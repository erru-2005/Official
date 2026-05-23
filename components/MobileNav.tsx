"use client";

const links = [
  { href: "#home", label: "Home" },
  { href: "#vision", label: "Vision" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export function MobileNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between bg-primary/85 px-[clamp(1rem,4vw,2rem)] py-[clamp(0.65rem,1.5vw,0.9rem)] backdrop-blur-md md:hidden">
      <span className="font-heading text-[clamp(0.875rem,2.5vw,1rem)] font-bold tracking-[0.2em] text-white">
        KEDANTRA
      </span>
      <nav aria-label="Mobile" className="flex gap-[clamp(0.5rem,2vw,1rem)]">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-clamp-small font-medium text-white/80 transition-colors hover:text-ternary"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
