const links = [
  { href: "#home", label: "Home" },
  { href: "#vision", label: "Vision" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export function DesktopHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 hidden items-center justify-between px-[clamp(1.5rem,5vw,3rem)] py-[clamp(0.85rem,2vw,1.1rem)] md:flex">
      <a
        href="#home"
        className="font-heading text-[clamp(0.9rem,1.2vw,1rem)] font-bold tracking-[0.22em] text-white drop-shadow-sm"
      >
        KEDANTRA
      </a>
      <nav
        aria-label="Desktop"
        className="flex items-center gap-[clamp(1rem,2.5vw,2rem)] rounded-full border border-white/15 bg-primary/40 px-[clamp(1rem,2.5vw,1.5rem)] py-[clamp(0.4rem,1vw,0.55rem)] backdrop-blur-md"
      >
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-clamp-small font-medium text-white/85 transition-colors hover:text-ternary"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
