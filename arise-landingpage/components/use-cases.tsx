"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { FileText, Headphones, BarChart3, X } from "lucide-react"

/* ─── Counter hook (reused from hero pattern) ─── */
function useCounter(end: number, duration = 1600, startDelay = 0, trigger = false) {
    const [count, setCount] = useState(0)
    useEffect(() => {
        if (!trigger) return
        let raf: number
        let startTime: number
        const delay = setTimeout(() => {
            const step = (now: number) => {
                if (!startTime) startTime = now
                const p = Math.min((now - startTime) / duration, 1)
                const v = (1 - Math.pow(1 - p, 3)) * end
                setCount(Math.floor(v))
                if (p < 1) raf = requestAnimationFrame(step)
            }
            raf = requestAnimationFrame(step)
        }, startDelay)
        return () => { clearTimeout(delay); cancelAnimationFrame(raf) }
    }, [end, duration, startDelay, trigger])
    return count
}

/* ─── Inline animated flow diagram (absorbed from simulations) ─── */
function FlowDiagram({ steps, accent }: { steps: string[]; accent: string }) {
    return (
        <svg
            viewBox="0 0 440 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
            role="img"
            aria-label={`Automation flow: ${steps.join(" → ")}`}
        >
            {steps.map((step, i) => {
                const x = i * 112
                return (
                    <g key={step}>
                        {i > 0 && (
                            <motion.line
                                x1={x - 10} y1={25} x2={x - 112 + 98 + 4} y2={25}
                                stroke={accent} strokeWidth="1" strokeDasharray="4 3"
                                initial={{ pathLength: 0, opacity: 0 }}
                                whileInView={{ pathLength: 1, opacity: 0.5 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.18 }}
                            />
                        )}
                        <motion.rect
                            x={x} y={5} width={98} height={40} rx={8}
                            fill="var(--glass)" stroke={accent} strokeWidth="0.8"
                            initial={{ opacity: 0, y: 8 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.45, delay: i * 0.13 }}
                        />
                        <text
                            x={x + 49} y={30} textAnchor="middle"
                            fill={accent} fontSize="9" fontWeight="600"
                            fontFamily="var(--font-display)"
                        >
                            {step}
                        </text>
                    </g>
                )
            })}
        </svg>
    )
}

/* ─── Data ─── */
const useCases = [
    {
        icon: FileText,
        title: "Automated Invoicing",
        metric: 75,
        metricSuffix: "%",
        metricLabel: "faster processing",
        problem: "Manual invoice creation consumed 20+ hours per week and caused frequent billing errors.",
        solution: "AI-powered pipeline that auto-generates, validates, and sends invoices from CRM data.",
        outcome: "75% reduction in processing time, near-zero billing errors, and $40K annual savings.",
        flow: ["CRM Data", "AI Extract", "Validate", "Invoice Out"],
        solutionSteps: [
            "AI extracts invoice data from PDFs",
            "Auto-validates against internal records",
            "Updates accounting system automatically",
            "Generates real-time financial summary",
        ],
        simMetrics: [
            { emoji: "⏳", value: "3 h → 10 min", label: "report generation" },
            { emoji: "📊", value: "Real-time", label: "dashboards" },
            { emoji: "🔁", value: "80–90%", label: "less data entry" },
        ],
        accent: "var(--accent-1)",
    },
    {
        icon: Headphones,
        title: "Customer Support Triage",
        metric: 40,
        metricSuffix: "%",
        metricLabel: "cost reduction",
        problem: "Support teams overwhelmed by ticket volume with slow response times and inconsistent routing.",
        solution: "AI agent that categorizes, prioritizes, and routes tickets — resolving 60% automatically.",
        outcome: "40% cost reduction, average response time dropped from 4 hours to 12 minutes.",
        flow: ["Customer Email", "AI Agent", "Auto Assign", "Dashboard"],
        solutionSteps: [
            "AI reads incoming emails instantly",
            "Classifies ticket type (billing, technical, refund)",
            "Assigns to the correct team automatically",
            "Sends instant acknowledgement to customer",
        ],
        simMetrics: [
            { emoji: "⚡", value: "60–70%", label: "auto-categorized" },
            { emoji: "⏱", value: "Minutes", label: "first response" },
            { emoji: "📉", value: "50%", label: "less manual triage" },
        ],
        accent: "var(--accent-2)",
    },
    {
        icon: BarChart3,
        title: "Reporting Automation",
        metric: 90,
        metricSuffix: "%",
        metricLabel: "time saved",
        problem: "Weekly executive reports took 2 full days to compile from multiple data sources.",
        solution: "Automated pipeline that aggregates, analyzes, and generates polished reports on schedule.",
        outcome: "90% time saved, live dashboards replaced static reports, enabling faster decisions.",
        flow: ["Data Sources", "AI Aggregate", "Analyze", "Report Out"],
        solutionSteps: [
            "Connects to multiple data sources",
            "AI aggregates and cleans data",
            "Applies business logic and analysis",
            "Generates polished report on schedule",
        ],
        simMetrics: [
            { emoji: "🔍", value: "Instant", label: "document retrieval" },
            { emoji: "🕒", value: "30–40%", label: "less query time" },
            { emoji: "🚀", value: "Faster", label: "decision-making" },
        ],
        accent: "var(--accent-1)",
    },
]

const ease = [0.2, 0.9, 0.3, 1] as const

/* ─── Metric Counter Card ─── */
function MetricBadge({ uc, inView }: { uc: (typeof useCases)[0]; inView: boolean }) {
    const count = useCounter(uc.metric, 1400, 200, inView)
    return (
        <div className="border-t border-[var(--glass-border)] pt-5 flex items-baseline gap-2">
            <span
                className="text-3xl font-bold tabular-nums"
                style={{ color: uc.accent, fontFamily: "var(--font-display)" }}
            >
                {count}{uc.metricSuffix}
            </span>
            <span className="text-xs text-[var(--muted-color)]">{uc.metricLabel}</span>
        </div>
    )
}

/* ─── Main Component ─── */
export default function UseCases() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.15 })
    const [openCase, setOpenCase] = useState<number | null>(null)

    return (
        <section ref={ref} className="py-20 md:py-24 relative">
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-px"
                style={{
                    background: "linear-gradient(90deg, transparent, rgba(196,181,253,0.12), transparent)",
                }}
                aria-hidden="true"
            />

            <div className="section-container">
                <motion.div
                    className="text-center mb-14"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease }}
                >
                    <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent-1)] font-semibold mb-4">
                        Real Results
                    </p>
                    <h2
                        className="text-3xl md:text-4xl max-w-2xl mx-auto mb-3"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        Use Cases & Outcomes
                    </h2>
                    <p className="text-[var(--muted-color)] text-sm max-w-lg mx-auto">
                        Real-world automation scenarios with measurable impact.
                    </p>
                </motion.div>

                {/* Cards Grid */}
                <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
                    {useCases.map((uc, i) => (
                        <motion.article
                            key={uc.title}
                            className="glass-card p-7 rounded-2xl group cursor-pointer transition-all duration-[420ms]"
                            style={{ transitionTimingFunction: "cubic-bezier(0.2,0.9,0.3,1)" }}
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.7, delay: i * 0.12, ease }}
                            whileHover={{
                                y: -6,
                                scale: 1.02,
                                boxShadow: "0 8px 30px rgba(12,18,30,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
                            }}
                            onClick={() => setOpenCase(i)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => e.key === "Enter" && setOpenCase(i)}
                            aria-label={`View case study: ${uc.title}`}
                        >
                            <div
                                className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                                style={{ background: `color-mix(in srgb, ${uc.accent} 12%, transparent)` }}
                            >
                                <uc.icon className="w-5 h-5" style={{ color: uc.accent }} strokeWidth={1.5} />
                            </div>

                            <h3
                                className="text-lg font-semibold text-[var(--foreground)] mb-2"
                                style={{ fontFamily: "var(--font-display)" }}
                            >
                                {uc.title}
                            </h3>

                            <p className="text-sm text-[var(--muted-color)] mb-5 leading-relaxed">
                                {uc.problem.slice(0, 85)}…
                            </p>

                            {/* Animated metric */}
                            <MetricBadge uc={uc} inView={isInView} />

                            <p className="text-xs mt-4 font-medium group-hover:underline" style={{ color: uc.accent }}>
                                View full case →
                            </p>
                        </motion.article>
                    ))}
                </div>
            </div>

            {/* ── Detail Modal (enriched with simulation data) ── */}
            <AnimatePresence>
                {openCase !== null && (
                    <motion.div
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div
                            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                            onClick={() => setOpenCase(null)}
                            aria-hidden="true"
                        />

                        <motion.div
                            className="relative glass-card p-8 md:p-10 rounded-2xl max-w-xl w-full border border-[var(--glass-border)] overflow-y-auto max-h-[90vh]"
                            style={{ background: "var(--bg-800)" }}
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ duration: 0.3, ease }}
                            role="dialog"
                            aria-modal="true"
                            aria-label={`Case study: ${useCases[openCase].title}`}
                        >
                            <button
                                onClick={() => setOpenCase(null)}
                                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/[0.06] flex items-center justify-center text-[var(--muted-color)] hover:text-[var(--foreground)] transition-colors"
                                aria-label="Close modal"
                            >
                                <X className="w-4 h-4" />
                            </button>

                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                                style={{ background: `color-mix(in srgb, ${useCases[openCase].accent} 12%, transparent)` }}
                            >
                                {(() => {
                                    const IconComp = useCases[openCase].icon
                                    return <IconComp className="w-6 h-6" style={{ color: useCases[openCase].accent }} strokeWidth={1.5} />
                                })()}
                            </div>

                            <h3
                                className="text-2xl font-bold text-[var(--foreground)] mb-6"
                                style={{ fontFamily: "var(--font-display)" }}
                            >
                                {useCases[openCase].title}
                            </h3>

                            <div className="space-y-5">
                                <div>
                                    <p className="text-xs uppercase tracking-wider text-[var(--danger)] font-semibold mb-1">Problem</p>
                                    <p className="text-sm text-[var(--muted-color)] leading-relaxed">{useCases[openCase].problem}</p>
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-wider font-semibold mb-2" style={{ color: useCases[openCase].accent }}>
                                        Automation Solution
                                    </p>
                                    <ul className="space-y-1.5">
                                        {useCases[openCase].solutionSteps.map((s) => (
                                            <li key={s} className="flex items-start gap-2 text-sm text-[var(--muted-color)]">
                                                <span
                                                    className="w-1 h-1 rounded-full mt-[7px] flex-shrink-0"
                                                    style={{ background: useCases[openCase].accent }}
                                                />
                                                {s}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-wider text-[var(--success)] font-semibold mb-1">Outcome</p>
                                    <p className="text-sm text-[var(--muted-color)] leading-relaxed">{useCases[openCase].outcome}</p>
                                </div>
                            </div>

                            {/* Flow diagram */}
                            <div className="mt-6 pt-5 border-t border-[var(--glass-border)]">
                                <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted-color)] font-semibold mb-3">
                                    Automation Flow
                                </p>
                                <FlowDiagram steps={useCases[openCase].flow} accent={useCases[openCase].accent} />
                            </div>

                            {/* Simulation metrics */}
                            <div className="mt-5 pt-5 border-t border-[var(--glass-border)]">
                                <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--success)] font-semibold mb-3">
                                    Impact Metrics
                                </p>
                                <div className="grid grid-cols-3 gap-3">
                                    {useCases[openCase].simMetrics.map((m) => (
                                        <div key={m.label} className="text-center">
                                            <span className="text-sm" aria-hidden="true">{m.emoji}</span>
                                            <p
                                                className="text-sm font-bold leading-tight"
                                                style={{ color: useCases[openCase].accent, fontFamily: "var(--font-display)" }}
                                            >
                                                {m.value}
                                            </p>
                                            <p className="text-[10px] text-[var(--muted-color)] mt-0.5">{m.label}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Bottom metric */}
                            <div className="mt-5 pt-5 border-t border-[var(--glass-border)] flex items-baseline gap-2">
                                <span
                                    className="text-3xl font-bold"
                                    style={{ color: useCases[openCase].accent, fontFamily: "var(--font-display)" }}
                                >
                                    {useCases[openCase].metric}{useCases[openCase].metricSuffix}
                                </span>
                                <span className="text-sm text-[var(--muted-color)]">{useCases[openCase].metricLabel}</span>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}
