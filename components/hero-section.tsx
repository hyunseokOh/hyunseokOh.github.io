import { ArrowUpRight, Download } from "lucide-react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { BlochSphere } from "@/components/bloch-sphere"

export function HeroSection() {
  return (
    <section
      id="home-section"
      className="relative isolate flex min-h-svh flex-col justify-center overflow-hidden"
    >
      {/* Rotating Bloch sphere — the signature element */}
      <BlochSphere className="pointer-events-auto absolute inset-0 h-full w-full" />

      {/* faint measurement grid + readability gradients over the sphere */}
      <div className="pointer-events-none absolute inset-0 quantum-grid opacity-30" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,var(--background)_18%,transparent_62%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col px-6 py-28 md:px-10">
        <p className="animate-quantum-rise flex items-center gap-3 font-mono text-xs uppercase tracking-[0.35em] text-primary">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary animate-quantum-blink" />
          Portfolio
        </p>

        <h1 className="animate-quantum-rise mt-6 text-balance font-sans text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl" style={{ animationDelay: "0.05s" }}>
          Hyunseok Oh
        </h1>

        <div className="animate-quantum-rise mt-5 flex flex-wrap items-center gap-x-4 gap-y-2" style={{ animationDelay: "0.12s" }}>
          <span className="text-2xl font-medium text-highlight sm:text-3xl">
            Quantum Hardware Engineer
          </span>
        </div>

        <p className="animate-quantum-rise mt-6 max-w-xl text-pretty text-lg leading-relaxed text-foreground/80" style={{ animationDelay: "0.2s" }}>
          Hands-on experience across{" "}
          <span className="font-medium text-highlight-2">multiple qubit platforms</span>.
        </p>

        <div className="animate-quantum-rise mt-10 flex flex-wrap items-center gap-4" style={{ animationDelay: "0.28s" }}>
          <a
            href="#contact-section"
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "group h-12 rounded-full px-6 text-sm font-medium shadow-[0_0_40px_-8px_var(--primary)] hover:bg-primary/90",
            )}
          >
            Get In Touch
            <ArrowUpRight className="ml-1 size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href="https://drive.google.com/file/d/16n9EbzqLo1PLZ7Ez0nuKuG6XYit9c12g/view?usp=sharing"
            download
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-12 rounded-full border-primary/30 bg-transparent px-6 text-sm font-medium hover:border-primary/60 hover:bg-primary/10 hover:text-foreground",
            )}
          >
            <Download className="mr-1 size-4" />
            Download CV
          </a>
        </div>
      </div>
    </section>
  )
}
