export function DesktopHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 hidden items-center justify-start bg-black/60 px-[clamp(1.5rem,5vw,3rem)] py-[clamp(0.85rem,2vw,1.1rem)] backdrop-blur-md md:flex">
      <a
        href="#home"
        className="font-heading text-[clamp(0.9rem,1.2vw,1rem)] font-bold tracking-[0.22em] text-white drop-shadow-sm"
      >
        KEDANTRA
      </a>
    </header>
  );
}
