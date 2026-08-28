import { Reveal } from "@/components/reveal"

export function AboutSection() {
  return (
    <section
      id="about-section"
      className="relative border-t border-border/60 bg-card/30 py-24 md:py-36"
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-14 px-6 md:px-10 md:grid-cols-[0.85fr_1.15fr] md:gap-16 lg:gap-20">
        {/* Personal photo — placeholder frame (left) */}
        <Reveal from="left" className="relative mx-auto w-full max-w-xs sm:max-w-sm md:mx-0">
          {/* corner ticks */}
          <span className="absolute -left-2 -top-2 h-5 w-5 border-l border-t border-primary/60" aria-hidden />
          <span className="absolute -right-2 -top-2 h-5 w-5 border-r border-t border-primary/60" aria-hidden />
          <span className="absolute -bottom-2 -left-2 h-5 w-5 border-b border-l border-primary/60" aria-hidden />
          <span className="absolute -bottom-2 -right-2 h-5 w-5 border-b border-r border-primary/60" aria-hidden />

          <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-border bg-background">
            <img
              src="/portrait.jpg"
              alt="Portrait of Hyunseok Oh, Quantum Hardware Engineer"
              className="h-full w-full object-cover"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent"
              aria-hidden
            />
          </div>
        </Reveal>

        {/* Statement (right) */}
        <div>
          <Reveal from="right">
            <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.35em] text-primary">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary animate-quantum-blink" />
              About
            </p>
          </Reveal>

          <Reveal from="right" delay={100}>
            <h2 className="mt-6 text-balance font-sans text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Toward the <span className="text-highlight">Quantum Future</span>
            </h2>
          </Reveal>

          <Reveal from="right" delay={200}>
            <p className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
              Quantum technology has been shifting from an abstract idea into an
              engineered system. I want to keep building the hardware that makes
              it real.
            </p>
          </Reveal>

          <Reveal from="right" delay={300}>
            <div className="mt-10 h-px w-full max-w-md bg-gradient-to-r from-primary/50 via-border to-transparent" />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
