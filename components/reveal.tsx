"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { cn } from "@/lib/utils"

type RevealProps = {
  children: ReactNode
  className?: string
  /** delay in ms before the reveal transition starts (capped so long lists don't lag) */
  delay?: number
  /** direction the element travels in from (sideways only on md+ screens) */
  from?: "up" | "left" | "right"
  as?: "div" | "section" | "li"
  /** hide again when scrolled out of view, so the animation replays. Off by default. */
  replay?: boolean
}

/**
 * Reveals its children with a fade + slide as soon as any part of them scrolls into view.
 * By default it reveals once and stays visible, so a section is never left half shown.
 * Respects prefers-reduced-motion (renders visible immediately).
 */
export function Reveal({
  children,
  className,
  delay = 0,
  from = "up",
  as = "div",
  replay = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true)
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true)
            if (!replay) io.unobserve(entry.target)
          } else if (replay) {
            setShown(false)
          }
        }
      },
      // threshold 0: start as soon as the first pixel enters, just above the bottom edge
      { threshold: 0, rootMargin: "0px 0px -40px 0px" },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [replay])

  const hidden =
    from === "left"
      ? "translate-y-6 md:translate-y-0 md:-translate-x-8 opacity-0"
      : from === "right"
        ? "translate-y-6 md:translate-y-0 md:translate-x-8 opacity-0"
        : "translate-y-6 opacity-0"

  const Tag = as

  return (
    <Tag
      ref={ref as never}
      className={cn(
        "transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform",
        shown ? "translate-x-0 translate-y-0 opacity-100" : hidden,
        className,
      )}
      style={{ transitionDelay: shown ? `${delay}ms` : "0ms" }}    >
      {children}
    </Tag>
  )
}