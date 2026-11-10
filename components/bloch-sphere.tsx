"use client"

import { useEffect, useRef } from "react"

const CYAN = "94, 234, 255"
const VIOLET = "167, 139, 250"

type V3 = { x: number; y: number; z: number }

/**
 * Bloch Sphere — a rotating wireframe sphere (equator, meridians, latitude
 * lines), X/Y/Z axes, |0>/|1> pole states, and a precessing state vector.
 * The whole sphere follows the mouse cursor with a parallax tilt, and
 * slowly auto-spins when the pointer is idle.
 */
export function BlochSphere({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    // Use the site font (Space Grotesk) for the canvas labels. next/font exposes its
    // generated family name through this CSS variable on <html>.
    const siteFont =
      getComputedStyle(document.documentElement).getPropertyValue("--font-space-grotesk").trim() || "sans-serif"
    const LABEL_FONT = `700 20px ${siteFont}, ui-sans-serif, sans-serif`

    // Height of the fixed header, so the sphere is centered in the space below it
    // and the |0> label is not hidden behind the header.
    const HEADER_H = 72

    let width = 0
    let height = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let raf = 0
    let t = 0

    // rotation state (auto-spin + pointer influence)
    // base pitch is 0 (equator level) so tilting up toward |0> and down
    // toward |1> are symmetric about the horizon.
    const BASE_YAW = -0.5
    const BASE_PITCH = 0
    let yaw = BASE_YAW
    let pitch = BASE_PITCH
    let targetYaw = yaw
    let targetPitch = pitch
    const pointer = { active: false }

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      width = parent.clientWidth
      height = parent.clientHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.max(1, Math.floor(width * dpr))
      canvas.height = Math.max(1, Math.floor(height * dpr))
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    const ro = new ResizeObserver(resize)
    if (canvas.parentElement) ro.observe(canvas.parentElement)
    resize()

    // follow the cursor across the whole window (stronger, more responsive)
    const onMove = (e: PointerEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5
      const ny = e.clientY / window.innerHeight - 0.5
      // symmetric pitch: cursor at the top tilts |0> up, cursor at the bottom
      // tilts |1> up by an equal amount (range roughly ±0.7 rad about horizon)
      targetYaw = BASE_YAW + nx * 1.4
      targetPitch = BASE_PITCH - ny * 1.4
      pointer.active = true
    }
    const onLeave = () => {
      pointer.active = false
      targetYaw = BASE_YAW
      targetPitch = BASE_PITCH
    }
    window.addEventListener("pointermove", onMove)
    window.addEventListener("pointerleave", onLeave)

    // sphere placement: centred, offset a little to the right on wide screens
    const layout = () => {
      const usableH = Math.max(1, height - HEADER_H)
      const r = Math.min(width, usableH) * (width > 900 ? 0.34 : 0.3)
      const cx = width > 900 ? width * 0.68 : width * 0.5
      const cy = HEADER_H + usableH * 0.5
      return { r, cx, cy }
    }

    const rotate = (p: V3): V3 => {
      // yaw around Y, then pitch around X
      const cosY = Math.cos(yaw)
      const sinY = Math.sin(yaw)
      const x1 = p.x * cosY + p.z * sinY
      const z1 = -p.x * sinY + p.z * cosY
      const cosP = Math.cos(pitch)
      const sinP = Math.sin(pitch)
      const y1 = p.y * cosP - z1 * sinP
      const z2 = p.y * sinP + z1 * cosP
      return { x: x1, y: y1, z: z2 }
    }

    // project a unit-sphere point -> screen; z used for depth cueing
    const project = (p: V3, r: number, cx: number, cy: number) => {
      const rp = rotate(p)
      return { sx: cx + rp.x * r, sy: cy - rp.y * r, depth: rp.z }
    }

    const circlePts = (plane: "xy" | "xz" | "yz", steps = 96): V3[] => {
      const pts: V3[] = []
      for (let i = 0; i <= steps; i++) {
        const a = (i / steps) * Math.PI * 2
        const c = Math.cos(a)
        const s = Math.sin(a)
        if (plane === "xy") pts.push({ x: c, y: s, z: 0 })
        else if (plane === "xz") pts.push({ x: c, y: 0, z: s })
        else pts.push({ x: 0, y: c, z: s })
      }
      return pts
    }

    // latitude ring at height y = sin(lat)
    const latitudePts = (lat: number, steps = 96): V3[] => {
      const pts: V3[] = []
      const ry = Math.sin(lat)
      const rr = Math.cos(lat)
      for (let i = 0; i <= steps; i++) {
        const a = (i / steps) * Math.PI * 2
        pts.push({ x: Math.cos(a) * rr, y: ry, z: Math.sin(a) * rr })
      }
      return pts
    }

    const strokePath = (
      pts: V3[],
      r: number,
      cx: number,
      cy: number,
      color: string,
      opts: { frontAlpha: number; backAlpha: number; lineWidth?: number },
    ) => {
      ctx.lineWidth = opts.lineWidth ?? 1
      // draw in short segments so we can vary alpha by depth (front vs back)
      for (let i = 0; i < pts.length - 1; i++) {
        const a = project(pts[i], r, cx, cy)
        const b = project(pts[i + 1], r, cx, cy)
        const depth = (a.depth + b.depth) / 2
        const alpha = depth >= 0 ? opts.frontAlpha : opts.backAlpha
        ctx.strokeStyle = `rgba(${color}, ${alpha})`
        ctx.beginPath()
        ctx.moveTo(a.sx, a.sy)
        ctx.lineTo(b.sx, b.sy)
        ctx.stroke()
      }
    }

    const equator = circlePts("xy")
    const meridianA = circlePts("xz")
    const meridianB = circlePts("yz")
    const lats = [-0.9, -0.45, 0.45, 0.9].map((l) => latitudePts(l))
    const longs = [0, 1, 2, 3, 4, 5].map((k) => {
      // meridian rotated around Y by k*30deg
      const ang = (k * Math.PI) / 6
      const base = circlePts("yz")
      return base.map((p) => ({
        x: p.x * Math.cos(ang) + p.z * Math.sin(ang),
        y: p.y,
        z: -p.x * Math.sin(ang) + p.z * Math.cos(ang),
      }))
    })

    const drawArrow = (tip: V3, r: number, cx: number, cy: number, color: string) => {
      const o = project({ x: 0, y: 0, z: 0 }, r, cx, cy)
      const p = project(tip, r, cx, cy)
      const front = p.depth >= 0
      const alpha = front ? 0.95 : 0.4

      // shaft
      ctx.strokeStyle = `rgba(${color}, ${alpha})`
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(o.sx, o.sy)
      ctx.lineTo(p.sx, p.sy)
      ctx.stroke()

      // tip glow
      const glow = ctx.createRadialGradient(p.sx, p.sy, 0, p.sx, p.sy, 14)
      glow.addColorStop(0, `rgba(${color}, ${0.9 * alpha})`)
      glow.addColorStop(1, `rgba(${color}, 0)`)
      ctx.fillStyle = glow
      ctx.beginPath()
      ctx.arc(p.sx, p.sy, 14, 0, Math.PI * 2)
      ctx.fill()

      // tip dot
      ctx.fillStyle = `rgba(235, 220, 255, ${alpha})`
      ctx.beginPath()
      ctx.arc(p.sx, p.sy, 3.2, 0, Math.PI * 2)
      ctx.fill()

      // projection onto equatorial plane (the classic Bloch dashed drop-line)
      const floor = project({ x: tip.x, y: 0, z: tip.z }, r, cx, cy)
      ctx.strokeStyle = `rgba(${color}, ${alpha * 0.4})`
      ctx.lineWidth = 1
      ctx.setLineDash([3, 4])
      ctx.beginPath()
      ctx.moveTo(p.sx, p.sy)
      ctx.lineTo(floor.sx, floor.sy)
      ctx.moveTo(o.sx, o.sy)
      ctx.lineTo(floor.sx, floor.sy)
      ctx.stroke()
      ctx.setLineDash([])
    }

    const drawLabel = (p: V3, r: number, cx: number, cy: number, text: string) => {
      const s = project(p, r, cx, cy)
      const front = s.depth >= 0
      ctx.font = LABEL_FONT
      ctx.fillStyle = `rgba(${CYAN}, ${front ? 0.9 : 0.35})`
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(text, s.sx, s.sy)
    }

    const drawAxis = (dir: V3, r: number, cx: number, cy: number) => {
      const neg = project({ x: -dir.x, y: -dir.y, z: -dir.z }, r * 1.18, cx, cy)
      const pos = project({ x: dir.x, y: dir.y, z: dir.z }, r * 1.18, cx, cy)
      const grad = ctx.createLinearGradient(neg.sx, neg.sy, pos.sx, pos.sy)
      grad.addColorStop(0, `rgba(${CYAN}, 0.05)`)
      grad.addColorStop(0.5, `rgba(${CYAN}, 0.22)`)
      grad.addColorStop(1, `rgba(${CYAN}, 0.05)`)
      ctx.strokeStyle = grad
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(neg.sx, neg.sy)
      ctx.lineTo(pos.sx, pos.sy)
      ctx.stroke()
    }

    const draw = () => {
      t += prefersReduced ? 0 : 0.016
      // auto-spin when idle; ease toward the cursor-driven target
      if (!pointer.active && !prefersReduced) targetYaw -= 0.0015
      yaw += (targetYaw - yaw) * 0.06
      pitch += (targetPitch - pitch) * 0.06

      ctx.clearRect(0, 0, width, height)
      const { r, cx, cy } = layout()

      // soft ambient halo behind the sphere
      const halo = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 1.7)
      halo.addColorStop(0, `rgba(${CYAN}, 0.10)`)
      halo.addColorStop(0.6, `rgba(${CYAN}, 0.03)`)
      halo.addColorStop(1, "rgba(0,0,0,0)")
      ctx.fillStyle = halo
      ctx.beginPath()
      ctx.arc(cx, cy, r * 1.7, 0, Math.PI * 2)
      ctx.fill()

      // axes
      drawAxis({ x: 1, y: 0, z: 0 }, r, cx, cy)
      drawAxis({ x: 0, y: 0, z: 1 }, r, cx, cy)
      drawAxis({ x: 0, y: 1, z: 0 }, r, cx, cy)

      // wireframe globe (faint latitude/longitude)
      for (const lo of longs) {
        strokePath(lo, r, cx, cy, CYAN, { frontAlpha: 0.14, backAlpha: 0.05 })
      }
      for (const la of lats) {
        strokePath(la, r, cx, cy, CYAN, { frontAlpha: 0.14, backAlpha: 0.05 })
      }

      // principal circles brighter
      strokePath(equator, r, cx, cy, CYAN, { frontAlpha: 0.5, backAlpha: 0.14, lineWidth: 1.2 })
      strokePath(meridianA, r, cx, cy, CYAN, { frontAlpha: 0.35, backAlpha: 0.1 })
      strokePath(meridianB, r, cx, cy, CYAN, { frontAlpha: 0.35, backAlpha: 0.1 })

      // precessing state vector: polar angle gently nutates, azimuth precesses
      const theta = 0.62 + Math.sin(t * 0.35) * 0.16 // from +z pole
      const phi = t * 0.5
      const tip: V3 = {
        x: Math.sin(theta) * Math.cos(phi),
        z: Math.sin(theta) * Math.sin(phi),
        y: Math.cos(theta),
      }
      drawArrow(tip, r, cx, cy, VIOLET)

      // state equation, floating just off the vector tip (violet)
      const tp = project(tip, r, cx, cy)
      const eqAlpha = tp.depth >= 0 ? 0.98 : 0.55
      const offset = 26
      ctx.font = LABEL_FONT
      ctx.textAlign = "left"
      ctx.textBaseline = "middle"
      const eqText = "|\u03C8> = \u03B1|0> + \u03B2|1>"
      const ex = tp.sx + offset
      const ey = tp.sy - offset
      ctx.save()
      ctx.shadowColor = `rgba(${VIOLET}, 0.9)`
      ctx.shadowBlur = 18
      ctx.fillStyle = `rgba(${VIOLET}, ${eqAlpha})`
      ctx.fillText(eqText, ex, ey)
      ctx.restore()

      // pole states
      drawLabel({ x: 0, y: 1.24, z: 0 }, r, cx, cy, "|0>")
      drawLabel({ x: 0, y: -1.24, z: 0 }, r, cx, cy, "|1>")

      if (!prefersReduced) raf = requestAnimationFrame(draw)
    }

    draw()
    if (prefersReduced) draw()

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerleave", onLeave)
    }
  }, [])

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}