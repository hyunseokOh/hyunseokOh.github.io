import { Award, Trophy } from "lucide-react"
import { Reveal } from "@/components/reveal"

type Honor = {
  name: string
  detail?: string
  period: string
}

type Group = {
  kind: string
  icon: typeof Award
  items: Honor[]
}

const groups: Group[] = [
  {
    kind: "Awards",
    icon: Trophy,
    items: [
      {
        name: "John Cardy Award",
        detail: "University of California, Santa Barbara",
        period: "2021",
      },
    ],
  },
  {
    kind: "Fellowships",
    icon: Award,
    items: [
      {
        name: "Government Scholarship for Overseas Study",
        detail: "National Institute for International Education",
        period: "2020 — 2022",
      },
      {
        name: "Presidential Science Scholarship",
        detail: "Korea Student Aid Foundation",
        period: "2013 — 2018",
      },
    ],
  },
]

export function HonorsSection() {
  return (
    <section
      id="honors-section"
      className="relative border-t border-border/60 bg-card/30 py-24 md:py-36"
    >
      <div className="mx-auto w-full max-w-5xl px-6 md:px-10">
        <Reveal>
          <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.35em] text-primary">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary animate-quantum-blink" />
            Honors, Awards &amp; Fellowships
          </p>
          <h2 className="mt-6 text-balance font-sans text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Distinctions &amp; Funding
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {groups.map((g, gi) => {
            const Icon = g.icon
            return (
              <Reveal key={g.kind} from="up" delay={gi * 100}>
                <div className="h-full rounded-xl border border-border/60 bg-card/40 p-6 md:p-8">
                  <div className="flex items-center gap-3">
                    <span className="flex size-9 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
                      <Icon className="size-4.5" />
                    </span>
                    <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-highlight-2">
                      {g.kind}
                    </h3>
                  </div>

                  <ul className="mt-6 space-y-5">
                    {g.items.map((h) => (
                      <li
                        key={h.name}
                        className="flex flex-col gap-1 border-l-2 border-primary/40 pl-4"
                      >
                        <div className="flex items-baseline justify-between gap-3">
                          <span className="text-pretty font-sans font-medium leading-snug text-foreground">
                            {h.name}
                          </span>
                          <span className="shrink-0 font-mono text-xs uppercase tracking-widest text-foreground">
                            {h.period}
                          </span>
                        </div>
                        {h.detail && (
                          <span className="text-sm leading-relaxed text-muted-foreground">
                            {h.detail}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
