import type React from "react"
import { Mail, GraduationCap, ArrowUpRight } from "lucide-react"
import { LinkedinIcon, GithubIcon, OrcidIcon } from "@/components/brand-icons"
import { Reveal } from "@/components/reveal"

type Profile = {
  label: string
  handle: string
  href: string
  icon: (props: { className?: string }) => React.ReactNode
}

const profiles: Profile[] = [
  {
    label: "LinkedIn",
    handle: "in/hyunseok0222",
    href: "https://linkedin.com/in/hyunseok0222",
    icon: LinkedinIcon,
  },
  {
    label: "GitHub",
    handle: "hyunseokOh",
    href: "https://github.com/hyunseokOh",
    icon: GithubIcon,
  },
  {
    label: "Google Scholar",
    handle: "Citations",
    href: "https://scholar.google.com/citations?hl=en&user=GpharwMAAAAJ",
    icon: GraduationCap,
  },
  {
    label: "ORCID",
    handle: "0000-0003-0076-3844",
    href: "https://orcid.org/0000-0003-0076-3844",
    icon: OrcidIcon,
  },
]

export function ContactSection() {
  return (
    <section
      id="contact-section"
      className="relative overflow-hidden border-t border-border/60 py-24 md:py-36"
    >
      {/* faint measurement grid, echoing the hero */}
      <div className="pointer-events-none absolute inset-0 quantum-grid opacity-20" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_0%,color-mix(in_oklch,var(--primary)_10%,transparent),transparent_70%)]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-4xl px-6 md:px-10">
        <Reveal>
          <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.35em] text-primary">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary animate-quantum-blink" />
            Contact
          </p>
          <h2 className="mt-6 text-balance font-sans text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Let&apos;s build the <span className="text-highlight">quantum future</span>
          </h2>
          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-foreground/80">
            Open to conversations about quantum hardware, device fabrication, and
            what comes next. Reach out directly or find me across the web.
          </p>
        </Reveal>

        {/* primary email CTA */}
        <Reveal from="up" delay={120}>
          <a
            href="mailto:hyunseok0222@gmail.com"
            className="group mt-10 flex items-center justify-between gap-4 rounded-xl border border-primary/30 bg-primary/5 p-6 transition-colors hover:border-primary/60 hover:bg-primary/10 md:p-8"
          >
            <span className="flex items-center gap-4">
              <span className="flex size-11 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
                <Mail className="size-5" />
              </span>
              <span className="flex flex-col">
                <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                  Email
                </span>
                <span className="text-pretty font-sans text-lg font-medium text-foreground sm:text-xl">
                  hyunseok0222@gmail.com
                </span>
              </span>
            </span>
            <ArrowUpRight className="size-5 shrink-0 text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </Reveal>

        {/* profile links */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {profiles.map((p, i) => {
            const Icon = p.icon
            return (
              <Reveal key={p.label} from="up" delay={180 + i * 80}>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-3 rounded-xl border border-border/60 bg-card/40 p-5 transition-colors hover:border-highlight-2/50 hover:bg-card/70"
                >
                  <span className="flex items-center gap-3">
                    <span className="flex size-9 items-center justify-center rounded-lg border border-highlight-2/30 bg-highlight-2/10 text-highlight-2">
                      <Icon className="size-4.5" />
                    </span>
                    <span className="flex flex-col">
                      <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                        {p.label}
                      </span>
                      <span className="font-sans text-sm text-foreground">{p.handle}</span>
                    </span>
                  </span>
                  <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-all group-hover:text-highlight-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={520}>
          <p className="mt-16 text-center font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground/70">
            Hyunseok Oh · Quantum Hardware Engineer
          </p>
        </Reveal>
      </div>
    </section>
  )
}
