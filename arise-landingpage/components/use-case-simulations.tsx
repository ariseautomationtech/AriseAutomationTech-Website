"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Headphones, Receipt, MessageSquareText } from "lucide-react"

/* ── Card data ── */
const simulations = [
    {
        icon: Headphones,
        title: "AI Support Triage & Resolution",
        problem:
            "Companies manually sort and respond to hundreds of support tickets daily, leading to long response times and overloaded teams.",
        solution: [
            "AI reads incoming emails",
            "Classifies ticket type (billing, technical, refund, etc.)",
            "Extracts key information",
            "Assigns to correct team automatically",
            "Sends instant acknowledgement",
        ],
        metrics: [
            { emoji: "⚡", value: "60–70%", label: "tickets auto-categorized" },
            { emoji: "⏱", value: "Minutes", label: "first response (from hours)" },
            { emoji: "📉", value: "50%", label: "reduction in manual triage" },
        ],
        /* SVG flow labels */
        flow: ["Customer Email", "AI Agent", "Auto Assignment", "Dashboard"],
        accent: "var(--accent-1)",
    },
    {
        icon: Receipt,
        title: "Invoice & Reporting Automation",
        problem:
            "Finance teams spend hours generating reports and manually processing invoices.",
        solution: [
            "AI extracts invoice data from PDFs",
            "Auto-validates against internal records",
            "Updates accounting system",
            "Generates real-time financial summary dashboard",
        ],
        metrics: [
            { emoji: "⏳", value: "3 h → 10 min", label: "report generation time" },
            { emoji: "📊", value: "Real-time", label: "financial dashboards" },
            { emoji: "🔁", value: "80–90%", label: "less repetitive data entry" },
        ],
        flow: ["PDF Upload", "AI Extract", "Validate", "Dashboard"],
        accent: "var(--accent-2)",
    },
    {
        icon: MessageSquareText,
        title: "Internal Knowledge & Ops Assistant",
        problem:
            "Employees waste time searching documents and asking repetitive internal questions.",
        solution: [
            "AI chatbot trained on company docs",
            "Instant answers to policy, HR, ops questions",
            "Connects with internal databases",
            "Role-based access control",
        ],
        metrics: [
            { emoji: "🔍", value: "Instant", label: "document retrieval" },
            { emoji: "🕒", value: "30–40%", label: "reduction in query time" },
            { emoji: "🚀", value: "Faster", label: "onboarding for new hires" },
        ],
        flow: ["Employee Query", "AI Search", "Knowledge Base", "Answer"],
        accent: "var(--accent-1)",
    },
]

const ease = [0.2, 0.9, 0.3, 1] as const

/* ── Inline animated SVG flow diagram ── */
function FlowDiagram({ steps, accent }: { steps: string[]; accent: string }) {
    return (
        <svg
            viewBox="0 0 440 54"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full mt-5"
            role="img"
            aria-label={`Automation flow: ${steps.join(" → ")}`}
        >
            {steps.map((step, i) => {
                const x = i * 115
                return (
                    <g key={step}>
                        {/* connector arrow */}
                        {i > 0 && (
                            <motion.line
                                x1={x - 12}
                                y1={27}
                                x2={x - 115 + 100 + 4}
                                y2={27}
                                stroke={accent}
                                strokeWidth="1"
                                strokeDasharray="4 3"
                                initial={{ pathLength: 0, opacity: 0 }}
                                whileInView={{ pathLength: 1, opacity: 0.5 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.2 }}
                            />
                        )}
                        <motion.rect
                            x={x}
                            y={6}
                            width={100}
                            height={42}
                            rx={8}
                            fill="var(--glass)"
                            stroke={accent}
                            strokeWidth="0.8"
                            initial={{ opacity: 0, y: 8 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.15 }}
                        />
                        <text
                            x={x + 50}
                            y={32}
                            textAnchor="middle"
                            fill={accent}
                            fontSize="9"
                            fontWeight="600"
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

/* ── Main Section ── */
export default function UseCaseSimulations() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.1 })

    return (
        <section
            ref={ref}
            id="use-case-simulations"
            className="py-20 md:py-28 relative"
            aria-label="AI Automation use case simulations"
        >
            {/* top divider */}
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-px"
                style={{
                    background:
                        "linear-gradient(90deg, transparent, rgba(138,124,255,0.2), transparent)",
                }}
                aria-hidden="true"
            />

            <div className="section-container">
                {/* ── Header ── */}
                <motion.div
                    className="text-center mb-16 max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease }}
                >
                    <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent-2)] font-semibold mb-4">
                        Example Automation Outcomes
                    </p>
                    <h2
                        className="text-3xl md:text-4xl mb-4"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        How AI Automations Transform Operations
                    </h2>
                    <p className="text-[var(--muted-color)] text-sm leading-relaxed">
                        Real-world automation scenarios based on internal builds and industry benchmarks.
                    </p>
                    <p className="text-[var(--muted-color)]/60 text-xs italic mt-3">
                        *These are simulation-based examples demonstrating potential impact.
                    </p>
                </motion.div>

                {/* ── Cards Grid ── */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {simulations.map((sim, i) => (
                        <motion.article
                            key={sim.title}
                            className="glass-card rounded-2xl p-7 flex flex-col group transition-all duration-[420ms]"
                            style={{ transitionTimingFunction: "cubic-bezier(0.2,0.9,0.3,1)" }}
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.7, delay: i * 0.14, ease }}
                            whileHover={{
                                y: -6,
                                scale: 1.015,
                                boxShadow:
                                    "0 8px 30px rgba(12,18,30,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
                            }}
                        >
                            {/* Icon + Title */}
                            <div className="flex items-start gap-4 mb-5">
                                <div
                                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300"
                                    style={{ background: `color-mix(in srgb, ${sim.accent} 12%, transparent)` }}
                                >
                                    <sim.icon
                                        className="w-5 h-5"
                                        style={{ color: sim.accent }}
                                        strokeWidth={1.8}
                                    />
                                </div>
                                <h3
                                    className="text-lg font-semibold text-[var(--foreground)] leading-snug"
                                    style={{ fontFamily: "var(--font-display)" }}
                                >
                                    {sim.title}
                                </h3>
                            </div>

                            {/* Problem */}
                            <div className="mb-4">
                                <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--danger)] font-semibold mb-1">
                                    Problem
                                </p>
                                <p className="text-sm text-[var(--muted-color)] leading-relaxed">
                                    {sim.problem}
                                </p>
                            </div>

                            {/* Solution */}
                            <div className="mb-5">
                                <p
                                    className="text-[10px] uppercase tracking-[0.2em] font-semibold mb-2"
                                    style={{ color: sim.accent }}
                                >
                                    Automation Solution
                                </p>
                                <ul className="space-y-1.5">
                                    {sim.solution.map((s) => (
                                        <li
                                            key={s}
                                            className="flex items-start gap-2 text-sm text-[var(--muted-color)]"
                                        >
                                            <span
                                                className="w-1 h-1 rounded-full mt-[7px] flex-shrink-0"
                                                style={{ background: sim.accent }}
                                            />
                                            {s}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Flow diagram */}
                            <FlowDiagram steps={sim.flow} accent={sim.accent} />

                            {/* Metrics */}
                            <div className="mt-auto pt-5 border-t border-[var(--glass-border)] mt-5">
                                <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--success)] font-semibold mb-3">
                                    Outcome Simulation
                                </p>
                                <div className="space-y-2">
                                    {sim.metrics.map((m) => (
                                        <div key={m.label} className="flex items-baseline gap-2">
                                            <span className="text-sm" aria-hidden="true">
                                                {m.emoji}
                                            </span>
                                            <span
                                                className="text-base font-bold"
                                                style={{ color: sim.accent, fontFamily: "var(--font-display)" }}
                                            >
                                                {m.value}
                                            </span>
                                            <span className="text-xs text-[var(--muted-color)]">{m.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>

                {/* ── CTA Block ── */}
                <motion.div
                    className="text-center mt-16 max-w-lg mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.5, ease }}
                >
                    <h3
                        className="text-2xl font-bold text-[var(--foreground)] mb-3"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        Ready to Automate Your Workflow?
                    </h3>
                    <p className="text-sm text-[var(--muted-color)] mb-6">
                        Let&apos;s identify automation opportunities in your business.
                    </p>
                    <a
                        href="#contact"
                        className="btn-primary text-base inline-block"
                        aria-label="Request an automation audit"
                    >
                        Request Automation Audit
                    </a>
                </motion.div>

                {/* ── Disclaimer ── */}
                <p className="text-center text-[10px] text-[var(--muted-color)]/50 mt-12 italic">
                    Examples shown are simulation-based demonstrations of potential automation outcomes.
                </p>
            </div>
        </section>
    )
}
