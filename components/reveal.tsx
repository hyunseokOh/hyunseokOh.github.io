"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { cn } from "@/lib/utils"

type RevealProps = {
  children: ReactNode
  className?: string
  /** delay in ms before the reveal transition starts */
  delay?: number
  /** direction the element travels in from */
  from?: "up" | "left" | "right"
  as?: "div" | "section" | "li"
}

/**
 * Reveals its children with a fade + slide whenever they scroll into view,
 * and resets when they scroll back out so the animation replays on every
 * re-entry. Respects prefers-reduced-motion (renders visible immediately).
 */
export function Reveal({
  children,
  className,
  delay = 0,
  from = "up",
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) {
      setShown(true)
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // toggle so the reveal replays each time the element re-enters view
          setShown(entry.isIntersecting)
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const hidden =
    from === "left"
      ? "-translate-x-10 opacity-0"
      : from === "right"
        ? "translate-x-10 opacity-0"
        : "translate-y-10 opacity-0"

  const Tag = as

  return (
    <Tag
      ref={ref as never}
      className={cn(
        "transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform",
        shown ? "translate-x-0 translate-y-0 opacity-100" : hidden,
        className,
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}
