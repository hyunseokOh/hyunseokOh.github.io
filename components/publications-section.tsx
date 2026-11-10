import { ArrowUpRight, Star } from "lucide-react"
import { Reveal } from "@/components/reveal"

type Publication = {
  title: string
  authors: string
  venue: string
  doi: string
  highlight?: boolean
}

const AUTHOR = "H. Oh"

const publications: Publication[] = [
  {
    title: "Quantum nanophotonic interface for tin-vacancy centers in thin-film diamond",
    authors:
      "H. Lee, H. C. Kleidermacher, A. J. M. Stein, H. Oh, L. B. H. Wyatt, C. K. Kim, L. Basso, A. M. Mounce, Y. Wang, S. S. Su, M. Titze, A. C. B. Jayich, J. Vučković",
    venue: "Phys. Rev. Appl. 25, 044074 (2026)",
    doi: "10.1103/vwt7-b64x",
  },
  {
    title:
      "Spin-embedded diamond optomechanical resonator with a mechanical quality factor exceeding one million",
    authors:
      "H. Oh, V. Dharod, C. Padgett, L. B. H. Wyatt, J. Venkatraman, S. Parthasarathy, E. Osipova, I. Hedgepeth, J. V. Cady, L. Basso, Y. Wang, M. Titze, E. S. Bielejec, A. M. Mounce, D. Bouwmeester, A. C. B. Jayich",
    venue: "Optica 13, 485–490 (2026)",
    doi: "10.1364/OPTICA.577541",
    highlight: true,
  },
  {
    title: "Integrated phononic waveguide on thin-film lithium niobate on diamond",
    authors:
      "S. Malik, F. M. Mayor, W. Jiang, H. Oh, C. Padgett, V. Dharod, J. Venkatraman, A. C. B. Jayich, A. H. Safavi-Naeini",
    venue: "Appl. Phys. Lett. 127, 154001 (2025)",
    doi: "10.1063/5.0285138",
  },
  {
    title: "Single-spin readout and quantum sensing using optomechanically-induced transparency",
    authors:
      "M. Koppenhöfer, C. Padgett, J. V. Cady, V. Dharod, H. Oh, A. C. B. Jayich, A. A. Clerk",
    venue: "Phys. Rev. Lett. 130, 093603 (2023)",
    doi: "10.1103/PhysRevLett.130.093603",
  },
  {
    title: "Deep learning enhanced individual nuclear-spin detection",
    authors:
      "K. Jung, M. H. Abobeih, J. Yun, G. Kim, H. Oh, H. Ang, T. H. Taminiau, D. Kim",
    venue: "npj Quantum Inf. 7, 41 (2021)",
    doi: "10.1038/s41534-021-00377-3",
  },
  {
    title: "Algorithmic decomposition for efficient multiple nuclear spin detection in diamond",
    authors:
      "H. Oh, J. Yun, M. H. Abobeih, K. Jung, K. Kim, T. H. Taminiau, D. Kim",
    venue: "Sci. Rep. 10, 14884 (2020)",
    doi: "10.1038/s41598-020-71339-6",
    highlight: true,
  },
]

/** Render an author string, emphasizing the site owner's name. */
function Authors({ value }: { value: string }) {
  const parts = value.split(new RegExp(`(${AUTHOR.replace(".", "\\.")})`, "g"))
  return (
    <>
      {parts.map((part, i) =>
        part === AUTHOR ? (
          <span key={i} className="font-semibold text-foreground">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  )
}

export function PublicationsSection() {
  return (
    <section
      id="publication-section"
      className="relative border-t border-border/60 bg-card/30 py-24 md:py-36"
    >
      <div className="mx-auto w-full max-w-5xl px-6 md:px-10">
        <Reveal>
          <p className="flex items-center gap-3 font-sans font-medium text-xs uppercase tracking-[0.2em] text-primary">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary animate-quantum-blink" />
            Publications
          </p>
          <h2 className="mt-6 text-balance font-sans text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Peer-Reviewed <span className="text-highlight">Work</span>
          </h2>
        </Reveal>

        <ol className="mt-16 space-y-px overflow-hidden rounded-xl border border-border/60">
          {publications.map((p, i) => (
            <Reveal key={p.doi} as="li" from="up" delay={i * 60}>
              <a
                href={`https://doi.org/${p.doi}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex gap-4 border-b border-border/60 bg-card/40 p-6 transition-colors last:border-b-0 hover:bg-card/80 md:gap-6 md:p-8"
              >
                <span className="shrink-0 font-sans font-medium text-sm tabular-nums text-muted-foreground/70">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="min-w-0 flex-1">
                  <h3 className="flex items-start gap-2 text-pretty font-sans text-lg font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover:text-highlight">
                    {p.title}
                    {p.highlight && (
                      <span
                        title="Selected work"
                        className="mt-1 inline-flex shrink-0 items-center gap-1 rounded-full border border-highlight-2/40 px-2 py-0.5 font-sans font-medium text-[10px] uppercase tracking-[0.12em] text-highlight-2"
                      >
                        <Star className="size-3 fill-current" />
                        Featured
                      </span>
                    )}
                  </h3>
                  <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                    <Authors value={p.authors} />
                  </p>
                  <p className="mt-2 font-sans font-medium text-xs uppercase tracking-[0.12em] text-highlight/80">
                    {p.venue}
                  </p>
                </div>

                <ArrowUpRight className="size-5 shrink-0 self-center text-muted-foreground/50 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-highlight" />
              </a>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
