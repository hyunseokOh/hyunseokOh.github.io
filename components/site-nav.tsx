export function SiteNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5 md:px-10">
        <a
          href="#home-section"
          className="flex items-center gap-2 font-mono text-sm tracking-tight"
        >
          <span className="inline-block h-2 w-2 rotate-45 bg-primary animate-quantum-blink" />
          <span className="text-highlight">Hyunseok Oh</span>
          Quantum Hardware Engineer
        </a>
        <nav className="hidden items-center gap-8 font-mono text-xs uppercase tracking-widest text-muted-foreground sm:flex">
          <a href="#home-section" className="transition-colors hover:text-foreground">
            Home
          </a>
          <a href="#about-section" className="transition-colors hover:text-foreground">
            About
          </a>
          <a href="#experience-section" className="transition-colors hover:text-foreground">
            Experience
          </a>
          <a href="#skill-section" className="transition-colors hover:text-foreground">
            Skills
          </a>
          <a href="#research-section" className="transition-colors hover:text-foreground">
            Research
          </a>
          <a href="#education-section" className="transition-colors hover:text-foreground">
            Education
          </a>
          <a href="#contact-section" className="transition-colors hover:text-foreground">
            Contact
          </a>
        </nav>
      </div>
    </header>
  )
}
