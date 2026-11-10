import { ArrowUpRight } from "lucide-react"
import { Reveal } from "@/components/reveal"

type Role = {
  org: string
  href?: string
  role: string
  period: string
  points: string[]
}

const roles: Role[] = [
  {
    org: "Google Quantum AI",
    href: "https://quantumai.google/",
    role: "Calibration Engineer",
    period: "Sep 2026 — Present",
    points: [
      "Calibrating superconducting quantum processors",
    ],
  },
  {
    org: "Quantum Sensing and Imaging Group, UCSB",
    href: "https://www.10-9lab.com",
    role: "Graduate Student Researcher",
    period: "Oct 2020 — Sep 2026",
    points: [
      "Optimized mechanical resonator designs with COMSOL, cutting simulation time 10x via a parallelized HPC pipeline",
      "Developed a diamond smart-cut fabrication process, achieving 100x scalability and 3x faster throughput",
      "Characterized devices in a dilution refrigerator, using an automated Python framework",
    ],
  },
  {
    org: "Hallym Medical A.I. Center",
    href: "https://hallym.hallym.or.kr/eng",
    role: "A.I. Research Engineer",
    period: "Apr 2020 — Jul 2020",
    points: [
      "Implemented a nine gaze estimation machine learning model for strabismus diagnosis",
    ],
  },
  {
    org: "Quantum Information and Quantum Computing Lab, SNU",
    href: "https://quiqcl.snu.ac.kr",
    role: "Undergraduate Student Researcher",
    period: "Aug 2019 — Feb 2020",
    points: ["Constructed the RF voltage stabilizing system for trapped ion qubits"],
  },
  {
    org: "Integrated Quantum Systems Lab, SNU",
    href: "https://iqslab.net",
    role: "Undergraduate Student Researcher",
    period: "Mar 2017 — Aug 2019",
    points: [
      "Developed an automated algorithmic framework for NV center magnetometry signal processing",
      "Implemented a real-time adaptive feedback system for quantum dot qubits",
    ],
  },
]

export function ExperienceSection() {
  return (
    <section
      id="experience-section"
      className="relative border-t border-border/60 py-24 md:py-36"
    >
      <div className="mx-auto w-full max-w-5xl px-6 md:px-10">
        <Reveal>
          <p className="flex items-center gap-3 font-sans font-medium text-xs uppercase tracking-[0.2em] text-primary">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary animate-quantum-blink" />
            Experience
          </p>
          <h2 className="mt-6 text-balance font-sans text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            A <span className="text-highlight">Coherent</span> Trajectory
          </h2>
        </Reveal>

        {/* Timeline */}
        <ol className="relative mt-16 space-y-14 md:space-y-16">
          {/* glowing spine */}
          <span
            aria-hidden
            className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-primary/70 via-border to-transparent md:left-[9px]"
          />

          {roles.map((r, i) => (
            <Reveal key={r.org} as="li" from="up" delay={i * 80} className="relative pl-10 md:pl-14">
              {/* node */}
              <span
                aria-hidden
                className="absolute left-0 top-1.5 flex h-4 w-4 items-center justify-center md:h-5 md:w-5"
              >
                <span className={`absolute inset-0 rounded-full bg-primary/25 ${i === 0 ? "animate-quantum-blink" : ""}`} />
                <span className={`relative h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_2px_var(--primary)] md:h-2.5 md:w-2.5" ${i === 0 ? "animate-quantum-blink" : ""}`} />
              </span>

              <div className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                {r.href ? (
                  <a
                    href={r.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 font-sans text-xl font-semibold leading-snug tracking-tight text-highlight transition-colors hover:text-primary"
                  >
                    {r.org}
                    <ArrowUpRight className="size-4 shrink-0 opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                ) : (
                  <span className="font-sans text-xl font-semibold leading-snug tracking-tight text-foreground">
                    {r.org}
                  </span>
                )}
                <span className="shrink-0 font-sans font-medium text-xs uppercase tracking-[0.12em] tabular-nums text-foreground">
                  {r.period}
                </span>
              </div>

              <p className="mt-1.5 font-sans font-medium text-[13px] uppercase tracking-[0.18em] text-highlight-2">
                {r.role}
              </p>

              <ul className="mt-4 space-y-2.5">
                {r.points.map((p) => (
                  <li key={p} className="flex gap-3 text-pretty leading-relaxed text-foreground/80">
                    <span
                      aria-hidden
                      className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-primary/60"
                    />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
