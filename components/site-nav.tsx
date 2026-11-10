"use client"

import { useEffect, useState } from "react"
import { ChevronDown, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

type NavLink = { href: string; label: string }
type NavItem = NavLink & { children?: NavLink[] }

// The first child of a group points at the parent's own section,
// so it shows up in the dropdown exactly like the other subsections.
const items: NavItem[] = [
  { href: "#home-section", label: "Home" },
  { href: "#about-section", label: "About" },
  { href: "#experience-section", label: "Experience" },
  { href: "#skill-section", label: "Skills" },
  {
    href: "#research-section",
    label: "Research",
    children: [
      { href: "#research-section", label: "Projects" },
      { href: "#publication-section", label: "Publications" },
      { href: "#presentation-section", label: "Presentations" },
    ],
  },
  {
    href: "#education-section",
    label: "Academics",
    children: [
      { href: "#education-section", label: "Education" },
      { href: "#honors-section", label: "Honors & Awards" },
    ],
  },
  { href: "#contact-section", label: "Contact" },
]

function DesktopDropdown({ item }: { item: NavItem }) {
  return (
    <div className="group/dd relative">
      <a
        href={item.href}
        onClick={(e) => e.currentTarget.blur()}
        aria-haspopup="true"
        className="flex items-center gap-1 transition-colors hover:text-foreground group-hover/dd:text-foreground group-focus-within/dd:text-foreground"
      >
        {item.label}
        <ChevronDown className="size-3 transition-transform duration-200 group-hover/dd:rotate-180 group-focus-within/dd:rotate-180" />
      </a>

      {/* The top padding is an invisible bridge so the menu stays open while the pointer moves down,
          and it drops the box to just below the header. -left-3 lines the item text up under the parent. */}
      <div
        className={cn(
          "absolute -left-3 top-full z-50 pt-[22px]",
          "invisible translate-y-1 opacity-0 transition-all duration-200",
          "group-hover/dd:visible group-hover/dd:translate-y-0 group-hover/dd:opacity-100",
          "group-focus-within/dd:visible group-focus-within/dd:translate-y-0 group-focus-within/dd:opacity-100",
        )}
      >
        <ul className="min-w-48 rounded-lg border border-border/60 bg-background/95 p-1.5 shadow-[0_8px_30px_-12px_var(--primary)] backdrop-blur-md">
          {item.children!.map((c) => (
            <li key={c.href + c.label}>
              <a
                href={c.href}
                onClick={(e) => e.currentTarget.blur()}
                className="block whitespace-nowrap rounded-md px-3 py-2.5 transition-colors hover:bg-primary/10 hover:text-foreground"
              >
                {c.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function SiteNav() {
  const [open, setOpen] = useState(false)

  // Close the phone menu on Escape, and when the viewport grows past the lg breakpoint.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    const mq = window.matchMedia("(min-width: 1024px)")
    const onResize = () => mq.matches && setOpen(false)
    window.addEventListener("keydown", onKey)
    mq.addEventListener("change", onResize)
    return () => {
      window.removeEventListener("keydown", onKey)
      mq.removeEventListener("change", onResize)
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/40 bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5 md:px-10">
        <a
          href="#home-section"
          onClick={close}
          className="flex items-center gap-2 font-sans text-sm font-medium tracking-tight"
        >
          <span className="inline-block h-2 w-2 rotate-45 bg-primary animate-quantum-blink" />
          <span className="text-highlight">Hyunseok (Dan) Oh</span>
          Quantum Hardware Engineer
        </a>

        {/* Desktop links */}
        <nav className="hidden items-center gap-8 font-sans text-[13px] font-medium uppercase tracking-[0.12em] text-foreground/70 lg:flex">
          {items.map((item) =>
            item.children ? (
              <DesktopDropdown key={item.href} item={item} />
            ) : (
              <a key={item.href} href={item.href} className="transition-colors hover:text-foreground">
                {item.label}
              </a>
            ),
          )}
        </nav>

        {/* Phone menu button */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="-mr-2 flex size-10 shrink-0 items-center justify-center rounded-md text-foreground/80 transition-colors hover:text-foreground lg:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Phone menu panel: groups show their subsections indented underneath */}
      <nav
        id="mobile-nav"
        aria-hidden={!open}
        className={cn(
          "grid overflow-hidden border-t border-border/40 transition-[grid-template-rows,opacity] duration-300 ease-out lg:hidden",
          open ? "grid-rows-[1fr] opacity-100" : "pointer-events-none grid-rows-[0fr] border-t-transparent opacity-0",
        )}
      >
        <ul className="min-h-0 max-h-[calc(100svh-5rem)] overflow-y-auto px-6 font-sans text-sm font-medium uppercase tracking-[0.12em] text-muted-foreground">
          {items.map((item) => (
            <li key={item.href}>
              {item.children ? (
                <>
                  <span className="block pt-3 pb-1 text-foreground/90">{item.label}</span>
                  <ul className="mb-1 ml-1 border-l border-border/60">
                    {item.children.map((c) => (
                      <li key={c.href + c.label}>
                        <a
                          href={c.href}
                          tabIndex={open ? 0 : -1}
                          onClick={close}
                          className="block py-2.5 pl-4 text-xs transition-colors hover:text-foreground"
                        >
                          {c.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <a
                  href={item.href}
                  tabIndex={open ? 0 : -1}
                  onClick={close}
                  className="block py-3 transition-colors hover:text-foreground"
                >
                  {item.label}
                </a>
              )}
            </li>
          ))}
          <li aria-hidden className="h-3" />
        </ul>
      </nav>
    </header>
  )
}