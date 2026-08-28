import type React from "react"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { Reveal } from "@/components/reveal"

type Project = {
  title: string
  blurb: React.ReactNode
  lab: string
  href: string
  image: string
  imageAlt: string
  metric?: { value: React.ReactNode; label: string }
}

const projects: Project[] = [
  {
    title: "High-Q diamond optomechanics with preserved spin coherence",
    blurb: (
      <>
        Spin-embedded diamond optomechanical crystals featuring a mechanical
        quality factor of 1.9 × 10<sup>6</sup> with long spin coherence.
      </>
    ),
    lab: "Quantum Sensing and Imaging Group, UCSB",
    href: "https://doi.org/10.1364/OPTICA.577541",
    image: "/research/OMC.jpg",
    imageAlt:
      "SEM micrograph of a suspended diamond optomechanical crystal nanobeam with a periodic array of holes",
    metric: {
      value: (
        <>
          1.9 × 10<sup className="text-[0.6em]">6</sup>
        </>
      ),
      label: "mechanical Q",
    },
  },
  {
    title: "Automated nuclear spin detection in diamond",
    blurb:
      "An automated algorithm that resolved 14 individual nuclear spins around a diamond NV center from real experimental data.",
    lab: "Integrated Quantum Systems Lab, SNU",
    href: "https://doi.org/10.1038/s41598-020-71339-6",
    image: "/research/algorithm.jpg",
    imageAlt:
      "Spectroscopy plot showing sharp resonance peaks for individual nuclear spins around a diamond NV center",
    metric: { value: "14", label: "nuclear spins resolved" },
  },
]

export function ResearchSection() {
  return (
    <section
      id="research-section"
      className="relative border-t border-border/60 bg-card/30 py-24 md:py-36"
    >
      <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
        <Reveal>
          <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.35em] text-primary">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary animate-quantum-blink" />
            Research
          </p>
          <h2 className="mt-6 text-balance font-sans text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Selected <span className="text-highlight">Projects</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {projects.map((p, i) => (
            <Reveal key={p.title} from="up" delay={i * 120} className="h-full">
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-background/60 transition-colors duration-300 hover:border-primary/50"
              >
                {/* Media panel — light backdrop so white figures read as intentional */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-white to-slate-200">
                  <Image
                    src={p.image || "/placeholder.svg"}
                    alt={p.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  {/* seam gradient blends the light image into the dark card */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background/90 to-transparent"
                  />
                  {p.metric && (
                    <div className="absolute bottom-3 left-4 flex items-baseline gap-2">
                      <span className="font-mono text-2xl tracking-tight text-highlight-2 [text-shadow:0_1px_10px_var(--background)]">
                        {p.metric.value}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/80 [text-shadow:0_1px_8px_var(--background)]">
                        {p.metric.label}
                      </span>
                    </div>
                  )}
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-balance font-sans text-lg font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover:text-highlight">
                    {p.title}
                  </h3>

                  <p className="mt-3 text-pretty text-sm leading-relaxed text-foreground/70">
                    {p.blurb}
                  </p>

                  <div className="mt-auto flex flex-col gap-3 pt-6">
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                      {p.lab}
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-primary">
                      Learn More
                      <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
