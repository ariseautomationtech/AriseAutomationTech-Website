"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Clock, Zap, BarChart3, ExternalLink } from "lucide-react"
import { useEffect, useState } from "react"

/* ─── Static data ─────────────────────────────────────────────── */
const benefits = [
  { icon: Clock, label: "Reduce Manual Work", desc: "Automate repetitive tasks" },
  { icon: Zap, label: "Deploy AI Agents", desc: "Intelligent, autonomous workflows" },
  { icon: BarChart3, label: "Scale Faster", desc: "Automated pipelines, less overhead" },
]

const ease = [0.2, 0.9, 0.3, 1] as const

// Syntax-highlighted code that loops in the terminal
const CODE_LINES = [
  { code: "$ arise deploy --env production", type: "cmd" },
  { code: "", type: "blank" },
  { code: "import { AIAgent } from '@arise/core'", type: "import" },
  { code: "", type: "blank" },
  { code: "const agent = new AIAgent({", type: "keyword" },
  { code: "  model:    'gpt-4o',", type: "string" },
  { code: "  workflow: 'invoice-processing',", type: "string" },
  { code: "  triggers: ['email', 'webhook'],", type: "normal" },
  { code: "  autoRetry: true,", type: "normal" },
  { code: "})", type: "keyword" },
  { code: "", type: "blank" },
  { code: "await agent.run()", type: "accent" },
  { code: "", type: "blank" },
  { code: "// ✓  847 records processed", type: "success" },
  { code: "// ✓  12.4 hours saved", type: "success" },
  { code: "// ✓  0 errors detected", type: "success" },
]

const LINE_COLOR: Record<string, string> = {
  cmd: "#a5b4fc",
  import: "#c792ea",
  keyword: "#c792ea",
  string: "#c3e88d",
  normal: "#a6accd",
  accent: "#82aaff",
  success: "#73daca",
  blank: "transparent",
}

// Stat counters beneath the terminal
const STATS = [
  { label: "Tasks Automated", end: 12847, suffix: "+", isFloat: false },
  { label: "Hours Saved", end: 2400, suffix: "h", isFloat: false },
  { label: "Success Rate", end: 99.2, suffix: "%", isFloat: true },
]

// Floating toast notifications
const TOASTS = [
  { emoji: "✅", title: "Workflow complete", body: "847 invoices processed" },
  { emoji: "⚡", title: "Agent triggered", body: "Auto-replied 23 emails" },
  { emoji: "📊", title: "Report dispatched", body: "Sent to team dashboard" },
]

/* ─── Hooks ───────────────────────────────────────────────────── */

/** Typewriter that loops: shows one line every `lineDelay` ms, then resets. */
function useTypewriter(lineDelay = 370, restartPause = 3200) {
  const [visible, setVisible] = useState(0)

  useEffect(() => {
    let tid: ReturnType<typeof setTimeout>
    let line = 0

    const tick = () => {
      if (line < CODE_LINES.length) {
        line++
        setVisible(line)
        tid = setTimeout(tick, lineDelay)
      } else {
        tid = setTimeout(() => {
          line = 0
          setVisible(0)
          tid = setTimeout(tick, lineDelay)
        }, restartPause)
      }
    }

    tid = setTimeout(tick, 900) // initial pause
    return () => clearTimeout(tid)
  }, [lineDelay, restartPause])

  return visible
}

/** Smooth cubic-ease counter that starts after `startDelay` ms. */
function useCounter(end: number, duration = 2000, isFloat = false, startDelay = 900) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let raf: number
    let startTime: number

    const delay = setTimeout(() => {
      const step = (now: number) => {
        if (!startTime) startTime = now
        const p = Math.min((now - startTime) / duration, 1)
        const v = (1 - Math.pow(1 - p, 3)) * end
        setCount(isFloat ? parseFloat(v.toFixed(1)) : Math.floor(v))
        if (p < 1) raf = requestAnimationFrame(step)
      }
      raf = requestAnimationFrame(step)
    }, startDelay)

    return () => {
      clearTimeout(delay)
      cancelAnimationFrame(raf)
    }
  }, [end, duration, isFloat, startDelay])

  return count
}

/* ─── Sub-components ──────────────────────────────────────────── */

function StatCard({ stat, index }: { stat: (typeof STATS)[0]; index: number }) {
  const count = useCounter(stat.end, 2000, stat.isFloat, 1000 + index * 160)

  return (
    <motion.div
      className="glass-card flex flex-col items-center justify-center text-center px-3 py-3"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.85 + index * 0.12 }}
    >
      <p
        className="text-xl font-bold text-[var(--accent-1)] tabular-nums leading-none"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {stat.isFloat
          ? (count as number).toFixed(1)
          : (count as number).toLocaleString()}
        {stat.suffix}
      </p>
      <p className="text-[10px] text-[var(--muted-color)] mt-1 leading-tight">{stat.label}</p>
    </motion.div>
  )
}

/* ─── Main component ──────────────────────────────────────────── */

export default function HeroSection() {
  const visibleLines = useTypewriter()

  // Rotating toast
  const [toastIdx, setToastIdx] = useState(-1)
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    let counter = 0
    const show = () => {
      setToastIdx(counter % TOASTS.length)
      setShowToast(true)
      setTimeout(() => setShowToast(false), 2800)
      counter++
    }
    const init = setTimeout(show, 3500)
    const iv = setInterval(show, 4500)
    return () => {
      clearTimeout(init)
      clearInterval(iv)
    }
  }, [])

  const isRunning = visibleLines < CODE_LINES.length

  return (
    <section
      className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28"
      aria-labelledby="hero-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        {/* Subtle dot grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(165,180,252,0.08) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            opacity: 0.18,
          }}
        />
        <motion.div
          className="absolute -top-40 left-1/4 w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(165,180,252,0.05) 0%, transparent 70%)",
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(196,181,253,0.04) 0%, transparent 70%)",
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="section-container">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          {/* ── Left Content (3/5) ───────────────────────────────────── */}
          <div className="lg:col-span-3 space-y-6">
            {/* Eyebrow */}
            <motion.p
              className="text-xs uppercase tracking-[0.3em] text-[var(--accent-1)] font-semibold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
            >
              AI Automation Services&ensp;•&ensp;Workflow Automation&ensp;•&ensp;Web Development
            </motion.p>

            {/* H1 */}
            <motion.h1
              id="hero-heading"
              className="leading-[1.15]"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--fs-hero)",
                fontWeight: 700,
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease }}
            >
              AI Automation Services{" "}
              <br className="hidden sm:block" />
              for{" "}
              <span className="text-[var(--accent-1)]">Modern Businesses.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              className="text-lg text-[var(--muted-color)] max-w-xl leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease }}
            >
              We design custom AI automation solutions and intelligent workflow
              systems that eliminate manual work, reduce errors, and help
              businesses scale without scaling headcount.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap items-center gap-4 pt-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease }}
            >
              <a
                href="#pricing"
                className="btn-primary text-base"
                aria-label="Request an automation audit — view pricing plans"
              >
                Request Automation Audit
              </a>
              <a
                href="#use-cases"
                className="btn-secondary text-base"
                aria-label="Book a discovery call"
              >
                Book Discovery Call
              </a>
            </motion.div>

            {/* Benefit bullets */}
            <motion.div
              className="flex flex-wrap gap-6 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease }}
            >
              {benefits.map((b) => (
                <div key={b.label} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[var(--accent-1)]/10 flex items-center justify-center">
                    <b.icon className="w-4 h-4 text-[var(--accent-1)]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--foreground)]">{b.label}</p>
                    <p className="text-xs text-[var(--muted-color)]">{b.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Microtrust */}
            <motion.div
              className="flex items-center gap-4 pt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6, ease }}
            >
              <span className="text-xs text-[var(--muted-color)] uppercase tracking-wider">
                Trusted by
              </span>
              <div className="flex items-center gap-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-16 h-6 rounded bg-white/[0.06] border border-white/[0.08]"
                    aria-label={`Client logo ${i}`}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── Right Visual: AI Automation Console (2/5) ─────────────── */}
          <motion.div
            className="lg:col-span-2 relative"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.35, ease }}
          >
            {/* ── Terminal window ── */}
            <div
              className="glass-card overflow-hidden"
              style={{
                boxShadow:
                  "0 0 0 1px var(--glass-border), 0 0 50px rgba(165,180,252,0.05), 0 24px 48px rgba(0,0,0,0.4)",
              }}
            >
              {/* Title bar */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06] bg-white/[0.025]">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                </div>
                <span className="text-[11px] text-[var(--muted-color)] font-mono tracking-wide opacity-70">
                  arise-agent.ts
                </span>
                <ExternalLink className="w-3 h-3 text-[var(--muted-color)] opacity-30" />
              </div>

              {/* Code body */}
              <div className="px-5 py-4 font-mono text-[12px] leading-[1.65] min-h-[260px]">
                <div className="flex gap-4">
                  {/* Line numbers */}
                  <div
                    className="select-none flex flex-col text-right shrink-0"
                    style={{ color: "rgba(166,172,205,0.25)", minWidth: "1.5ch" }}
                  >
                    {CODE_LINES.slice(0, visibleLines).map((_, i) => (
                      <span key={i}>{_.type === "blank" ? "" : i + 1}</span>
                    ))}
                  </div>

                  {/* Code lines with slide-in animation */}
                  <div className="flex flex-col flex-1 overflow-hidden">
                    {CODE_LINES.slice(0, visibleLines).map((line, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.18 }}
                        style={{
                          color: LINE_COLOR[line.type] ?? LINE_COLOR.normal,
                          display: "block",
                        }}
                      >
                        {line.code || "\u00A0"}
                      </motion.span>
                    ))}

                    {/* Blinking cursor */}
                    <motion.span
                      className="inline-block w-[2px] h-[13px] align-middle ml-0.5"
                      style={{ background: "var(--accent-1)" }}
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.75, repeat: Infinity }}
                    />
                  </div>
                </div>
              </div>

              {/* Status bar */}
              <div className="flex items-center justify-between px-4 py-2 border-t border-white/[0.05] bg-white/[0.01]">
                <div className="flex items-center gap-2">
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{
                      background: isRunning ? "var(--accent-1)" : "#73daca",
                    }}
                    animate={{ opacity: isRunning ? [1, 0.3, 1] : 1 }}
                    transition={{ duration: 1.2, repeat: isRunning ? Infinity : 0 }}
                  />
                  <span className="text-[10px] text-[var(--muted-color)] font-mono">
                    {isRunning ? "Running…" : "Completed ✓"}
                  </span>
                </div>
                <span className="text-[10px] text-[var(--muted-color)] font-mono opacity-40">
                  Arise SDK · Node 20
                </span>
              </div>
            </div>

            {/* ── Stat counter cards ── */}
            <div className="grid grid-cols-3 gap-2.5 mt-3">
              {STATS.map((stat, i) => (
                <StatCard key={stat.label} stat={stat} index={i} />
              ))}
            </div>

            {/* ── Floating toast notification (top-left of the panel) ── */}
            <AnimatePresence>
              {showToast && toastIdx >= 0 && (
                <motion.div
                  key={toastIdx}
                  className="absolute -top-3 -left-4 glass-card flex items-start gap-3 px-4 py-3 z-20"
                  style={{
                    boxShadow:
                      "0 0 0 1px var(--glass-border), 0 0 24px rgba(165,180,252,0.08)",
                    maxWidth: 230,
                    backdropFilter: "blur(16px)",
                  }}
                  initial={{ opacity: 0, x: -16, scale: 0.92 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -8, scale: 0.95 }}
                  transition={{ duration: 0.32, ease: [0.34, 1.56, 0.64, 1] }}
                >
                  <span className="text-base leading-none mt-0.5" role="img">
                    {TOASTS[toastIdx].emoji}
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-[var(--foreground)] leading-tight">
                      {TOASTS[toastIdx].title}
                    </p>
                    <p className="text-[10px] text-[var(--muted-color)] mt-0.5">
                      {TOASTS[toastIdx].body}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
