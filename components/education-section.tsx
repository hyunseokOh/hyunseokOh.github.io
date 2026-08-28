import { ArrowUpRight } from "lucide-react"
import { Reveal } from "@/components/reveal"

type School = {
  name: string
  href: string
  period: string
  image: string
  degrees: string[]
  honors?: string
  advisor?: string
  thesis?: string
  note?: string
}

const schools: School[] = [
  {
    name: "University of California, Santa Barbara",
    href: "https://ucsb.edu",
    period: "Oct 2020 — Sep 2026",
    image: "/education/ucsb.jpg",
    degrees: ["Ph.D. in Physics, Sep 2026", "M.A. in Physics, Sep 2023"],
    advisor: "Prof. Ania C. Bleszynski Jayich",
    thesis:
      "Towards diamond spin-opto-mechanical systems: Design, fabrication, and characterization of optomechanical crystals with embedded spins",
  },
  {
    name: "Seoul National University",
    href: "https://en.snu.ac.kr",
    period: "Mar 2013 — Feb 2020",
    image: "/education/snu.jpg",
    degrees: [
      "B.S. in Physics, Feb 2020",
      "B.S. in Computer Science and Engineering, Feb 2020",
    ],
    honors: "Summa Cum Laude",
    advisor: "Prof. Dohun Kim",
    thesis:
      "Development of a program for efficient detection of nuclear spins using the diamond NV center",
  },
  {
    name: "Seoul Science High School",
    href: "https://sshs.sen.hs.kr/",
    period: "Mar 2010 — Feb 2013",
    image: "/education/sshs.jpg",
    degrees: [],
    note: "School for gifted students in mathematics and science",
  },
]

export function EducationSection() {
  return (
    <section
      id="education-section"
      className="relative border-t border-border/60 py-24 md:py-36"
    >
      <div className="mx-auto w-full max-w-5xl px-6 md:px-10">
        <Reveal>
          <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.35em] text-primary">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary animate-quantum-blink" />
            Education
          </p>
          <h2 className="mt-6 text-balance font-sans text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            <span className="text-highlight">Academic</span> Foundations
          </h2>
        </Reveal>

        <div className="mt-16 space-y-6">
          {schools.map((s, i) => (
            <Reveal key={s.name} from="up" delay={i * 80}>
              <article className="group flex flex-col overflow-hidden rounded-xl border border-border/60 bg-card/40 transition-colors hover:border-primary/40 md:flex-row">
                <div className="relative h-40 shrink-0 overflow-hidden border-b border-border/60 md:h-auto md:w-56 md:border-b-0 md:border-r lg:w-64">
                  <img
                    src={s.image || "/placeholder.svg"}
                    alt={`${s.name} campus`}
                    className="h-full w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card/60 to-transparent md:bg-gradient-to-r"
                    aria-hidden
                  />
                </div>

                <div className="flex-1 p-6 md:p-8">
                  <div className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link inline-flex items-center gap-1.5 font-sans text-xl font-semibold leading-snug tracking-tight text-highlight transition-colors hover:text-primary"
                    >
                      {s.name}
                      <ArrowUpRight className="size-4 shrink-0 opacity-70 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </a>
                    <span className="shrink-0 font-mono text-xs uppercase tracking-widest text-foreground">
                      {s.period}
                    </span>
                  </div>

                  {s.degrees.length > 0 && (
                    <ul className="mt-4 space-y-1.5">
                      {s.degrees.map((d) => (
                        <li
                          key={d}
                          className="font-mono text-[13px] uppercase tracking-[0.14em] text-highlight-2"
                        >
                          {d}
                        </li>
                      ))}
                    </ul>
                  )}

                  {s.honors && (
                    <p className="mt-3 inline-block rounded-full border border-highlight-2/50 bg-highlight-2/15 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-highlight-2">
                      {s.honors}
                    </p>
                  )}

                  {s.note && (
                    <p className="mt-4 text-pretty text-sm leading-relaxed text-foreground/90">
                      {s.note}
                    </p>
                  )}

                  {(s.advisor || s.thesis) && (
                    <dl className="mt-5 space-y-3 border-t border-border/60 pt-5 text-sm">
                      {s.advisor && (
                        <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
                          <dt className="w-24 shrink-0 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                            Advisor
                          </dt>
                          <dd className="text-foreground/90">{s.advisor}</dd>
                        </div>
                      )}
                      {s.thesis && (
                        <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
                          <dt className="w-24 shrink-0 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                            Thesis
                          </dt>
                          <dd className="text-pretty leading-relaxed text-foreground/90">
                            &ldquo;{s.thesis}&rdquo;
                          </dd>
                        </div>
                      )}
                    </dl>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
