import { Wrench, Gauge, Cpu, SlidersHorizontal, Code2 } from "lucide-react"
import { Reveal } from "@/components/reveal"

type Category = {
  title: string
  icon: typeof Wrench
  note?: string
  items: string[]
}

const categories: Category[] = [
  {
    title: "Fabrication",
    icon: Wrench,
    note: "6 years · UCSB Nanofabrication Facility",
    items: [
      "Flip-chip & wafer bonding",
      "Lithography (MLA, E-beam)",
      "Deposition (ALD, PECVD, Sputter)",
      "Dry etch (ICP, Ion mill, XeF2, VHF)",
      "Imaging (AFM, SEM)",
      "Dicing",
      "Thermal processing",
    ],
  },
  {
    title: "Characterization",
    icon: Gauge,
    items: [
      "Dilution refrigerator cryogenics",
      "Telecom band fiber optics",
      "Confocal microscopy",
      "Microwave & RF measurement",
    ],
  },
  {
    title: "Simulation & Design",
    icon: Cpu,
    items: ["COMSOL Multiphysics", "Sonnet", "QuTiP", "Qiskit", "HPC pipelines"],
  },
  {
    title: "Instrumentation & Control",
    icon: SlidersHorizontal,
    items: ["PyQt5", "PyVISA", "Xilinx Vivado", "LabVIEW FPGA Module"],
  },
]

const programming = {
  proficient: ["Python", "C", "Java", "MATLAB", "LabVIEW", "Verilog"],
  familiar: [
    "C++",
    "VHDL",
    "Scala",
    "OCaml",
    "Mathematica",
    "HTML",
    "CSS",
    "JavaScript",
    "Julia",
  ],
}

function Chip({
  children,
  tone = "default",
}: {
  children: React.ReactNode
  tone?: "default" | "primary" | "muted"
}) {
  const tones = {
    default:
      "border-border/70 bg-secondary/40 text-foreground/85 hover:border-primary/40 hover:text-foreground",
    primary:
      "border-highlight/40 bg-highlight/10 text-highlight hover:border-highlight/70",
    muted: "border-border/50 bg-transparent text-muted-foreground hover:text-foreground/80",
  }
  return (
    <span
      className={`rounded-md border px-2.5 py-1 font-mono text-[13px] leading-none transition-colors ${tones[tone]}`}
    >
      {children}
    </span>
  )
}

export function SkillsSection() {
  return (
    <section
      id="skill-section"
      className="relative border-t border-border/60 py-24 md:py-36"
    >
      <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
        <Reveal>
          <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.35em] text-primary">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
            Professional Skills
          </p>
          <h2 className="mt-6 text-balance font-sans text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            An Engineer&apos;s <span className="text-highlight">Toolkit</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {categories.map((c, i) => {
            const Icon = c.icon
            return (
              <Reveal key={c.title} from="up" delay={i * 80}>
                <div className="flex h-full flex-col rounded-xl border border-border/60 bg-card/40 p-6 transition-colors hover:border-primary/40 md:p-8">
                  <div className="flex items-center gap-3">
                    <span className="flex size-9 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
                      <Icon className="size-4.5" />
                    </span>
                    <h3 className="font-mono text-sm uppercase tracking-[0.25em] text-highlight-2">
                      {c.title}
                    </h3>
                  </div>

                  {c.note && (
                    <p className="mt-4 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                      {c.note}
                    </p>
                  )}

                  <div className="mt-5 flex flex-wrap gap-2">
                    {c.items.map((item) => (
                      <Chip key={item}>{item}</Chip>
                    ))}
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>

        {/* Programming — spans full width with two proficiency tiers */}
        <Reveal from="up" delay={120}>
          <div className="mt-6 rounded-xl border border-border/60 bg-card/40 p-6 transition-colors hover:border-primary/40 md:p-8">
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
                <Code2 className="size-4.5" />
              </span>
              <h3 className="font-mono text-sm uppercase tracking-[0.25em] text-highlight-2">
                Programming
              </h3>
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-[auto_1fr] sm:gap-8">
              <div className="flex items-start gap-4 sm:contents">
                <span className="mt-1 shrink-0 font-mono text-[11px] uppercase tracking-widest text-highlight sm:mt-1.5">
                  Proficient
                </span>
                <div className="flex flex-wrap gap-2">
                  {programming.proficient.map((lang) => (
                    <Chip key={lang} tone="primary">
                      {lang}
                    </Chip>
                  ))}
                </div>
              </div>

              <div className="flex items-start gap-4 sm:contents">
                <span className="mt-1 shrink-0 font-mono text-[11px] uppercase tracking-widest text-muted-foreground sm:mt-1.5">
                  Familiar
                </span>
                <div className="flex flex-wrap gap-2">
                  {programming.familiar.map((lang) => (
                    <Chip key={lang} tone="muted">
                      {lang}
                    </Chip>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
