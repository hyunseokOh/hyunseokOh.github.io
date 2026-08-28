import { ArrowUpRight } from "lucide-react"
import { Reveal } from "@/components/reveal"

type Presentation = {
  title: string
  event: string
  location: string
  date: string
  link: string
}

type Group = {
  kind: string
  items: Presentation[]
}

const groups: Group[] = [
  {
    kind: "Talks",
    items: [
      {
        title: "High-Q diamond optomechanical crystals with preserved spin coherence",
        event: "APS Global Physics Summit 2026",
        location: "Denver, CO, USA",
        date: "Mar 2026",
        link: "https://www.aps.org/events/2026/joint-meeting-2026",
      },
    ],
  },
  {
    kind: "Posters",
    items: [
      {
        title: "Hybrid spin-mechanical systems with color centers in diamond",
        event: "Gordon Research Conference, Mechanical Systems in the Quantum Regime (GRC 2024)",
        location: "Ventura, CA, USA",
        date: "Mar 2024",
        link: "https://www.grc.org/mechanical-systems-in-the-quantum-regime-conference/2024/",
      },
      {
        title: "Fabrication of nanomechanical diamond devices via a scalable smart-cut method",
        event: "Frontiers of Nanomechanical Systems (FNS 2023)",
        location: "Delft, the Netherlands",
        date: "Jun 2023",
        link: "https://www.fns2023.nl/",
      },
      {
        title: "Fabrication of high-Q mechanical devices on diamond",
        event: "Gordon Research Conference, Mechanical Systems in the Quantum Regime (GRC 2022)",
        location: "Ventura, CA, USA",
        date: "Jun 2022",
        link: "https://www.grc.org/mechanical-systems-in-the-quantum-regime-conference/2022/",
      },
    ],
  },
]

export function PresentationsSection() {
  return (
    <section
      id="presentation-section"
      className="relative border-t border-border/60 py-24 md:py-36"
    >
      <div className="mx-auto w-full max-w-5xl px-6 md:px-10">
        <Reveal>
          <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.35em] text-primary">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary animate-quantum-blink" />
            Presentations
          </p>
          <h2 className="mt-6 text-balance font-sans text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Talks &amp; Posters
          </h2>
        </Reveal>

        <div className="mt-16 space-y-14">
          {groups.map((g) => (
            <div key={g.kind}>
              <Reveal>
                <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-highlight-2">
                  {g.kind}
                </h3>
              </Reveal>

              <ul className="mt-6 divide-y divide-border/60 border-t border-border/60">
                {g.items.map((p, i) => (
                  <Reveal key={p.title} as="li" from="up" delay={i * 70}>
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col gap-2 py-6 transition-colors sm:flex-row sm:items-start sm:justify-between sm:gap-8"
                    >
                      <div className="min-w-0 flex-1">
                        <h4 className="flex items-start gap-1.5 text-pretty font-sans text-lg font-medium leading-snug tracking-tight text-foreground transition-colors group-hover:text-highlight">
                          {p.title}
                          <ArrowUpRight className="mt-1 size-4 shrink-0 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-70" />
                        </h4>
                        <p className="mt-2 text-pretty text-sm leading-relaxed">
                          <span className="text-highlight-2">
                            {p.event}
                          </span>
                          <span className="text-muted-foreground">
                            {" · "}
                            {p.location}
                          </span>
                        </p>
                      </div>
                      <span className="shrink-0 font-mono text-xs uppercase tracking-widest text-foreground sm:pt-1">
                        {p.date}
                      </span>
                    </a>
                  </Reveal>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
