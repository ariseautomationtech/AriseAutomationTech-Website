"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import {
    Database,
    Search,
    MessageCircle,
    Zap,
    Shield,
    BarChart3,
    ArrowRight,
    BookOpen,
    Brain,
    CheckCircle2,
} from "lucide-react"

const ease = [0.2, 0.9, 0.3, 1] as const

const ragSteps = [
    {
        icon: BookOpen,
        label: "Knowledge Base",
        sublabel: "Docs, FAQs, PDFs, Wikis",
        color: "var(--accent-2)",
    },
    {
        icon: Database,
        label: "Vector Store",
        sublabel: "Chunked & embedded",
        color: "var(--accent-1)",
    },
    {
        icon: Search,
        label: "Retrieval",
        sublabel: "Semantic search",
        color: "var(--accent-2)",
    },
    {
        icon: Brain,
        label: "LLM Reasoning",
        sublabel: "Context-grounded answer",
        color: "var(--accent-1)",
    },
    {
        icon: MessageCircle,
        label: "Chat Response",
        sublabel: "Accurate & cited",
        color: "var(--accent-2)",
    },
]

const features = [
    {
        icon: Database,
        title: "Custom Knowledge Ingestion",
        description:
            "Ingest your internal docs, Notion pages, PDFs, Confluence wikis, or any data source — automatically chunked, embedded, and indexed.",
    },
    {
        icon: Search,
        title: "Retrieval-Augmented Generation",
        description:
            "Every answer is grounded in your actual data. The chatbot retrieves the most relevant context before generating a response — no hallucinations.",
    },
    {
        icon: Shield,
        title: "Private & Secure",
        description:
            "Runs within your infrastructure. Your data never leaves your environment. GDPR-friendly, audit-logged, and role-aware access controls.",
    },
    {
        icon: Zap,
        title: "Instant Deployment",
        description:
            "From data ingestion to a live chat widget in days, not months. Plug into Slack, Teams, your web app, or any internal portal.",
    },
    {
        icon: BarChart3,
        title: "Analytics & Confidence Scores",
        description:
            "Track unresolved queries, top topics, confidence thresholds, and escalation rates to continuously improve your bot.",
    },
    {
        icon: CheckCircle2,
        title: "Human Escalation Built-in",
        description:
            "When confidence drops below threshold, the bot gracefully hands off to a human agent — keeping every customer experience smooth.",
    },
]

export default function ChatbotShowcase() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.15 })

    return (
        <section ref={ref} className="py-24 md:py-32 relative overflow-hidden">
            {/* Subtle radial gradient backdrop */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10"
                style={{
                    background:
                        "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(124,58,237,0.06) 0%, transparent 70%)",
                }}
            />

            <div className="section-container">
                {/* ── Header ── */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 24 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease }}
                >
                    <p className="text-xs uppercase tracking-[0.25em] text-[var(--accent-1)] font-medium mb-4">
                        End-to-End Chatbot Creation
                    </p>
                    <h2
                        className="text-3xl md:text-[2.75rem] leading-tight max-w-2xl mx-auto mb-5"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        Internal Support Chatbots,{" "}
                        <span
                            style={{
                                background: "linear-gradient(135deg, var(--accent-1), var(--accent-2))",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            Powered by RAG
                        </span>
                    </h2>
                    <p className="text-[var(--muted-color)] text-base max-w-xl mx-auto leading-relaxed">
                        We build and deploy production-ready AI support chatbots that answer
                        employee and customer queries using <em>your</em> knowledge base —
                        accurately, privately, and in real time.
                    </p>
                </motion.div>

                {/* ── RAG Pipeline Diagram ── */}
                <motion.div
                    className="mb-20"
                    initial={{ opacity: 0, y: 32 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.1, ease }}
                >
                    <div className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass)] p-6 sm:p-8 md:p-10 lg:p-12">
                        <p
                            className="text-xs uppercase tracking-widest text-[var(--muted-color)] text-center mb-8 md:mb-10"
                            style={{ fontFamily: "var(--font-display)" }}
                        >
                            How RAG Works
                        </p>

                        {/* Responsive two-row pipeline */}
                        <div className="flex flex-col items-center w-full">

                            {/* Row 1 — icons + animated arrow connectors */}
                            <div className="flex items-center justify-center w-full gap-1 sm:gap-2 md:gap-3 lg:gap-4">
                                {ragSteps.map((step, i) => (
                                    <div key={step.label} className="flex items-center gap-1 sm:gap-2 md:gap-3 lg:gap-4">
                                        {/* Icon box — responsive size */}
                                        <motion.div
                                            className="w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-xl md:rounded-2xl flex items-center justify-center border border-[var(--glass-border)] flex-shrink-0"
                                            style={{
                                                background: `color-mix(in srgb, ${step.color} 12%, transparent)`,
                                                boxShadow: `0 0 20px color-mix(in srgb, ${step.color} 12%, transparent)`,
                                            }}
                                            initial={{ opacity: 0, y: 16 }}
                                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                                            transition={{ duration: 0.5, delay: 0.2 + i * 0.1, ease }}
                                        >
                                            <step.icon
                                                className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                                                style={{ color: step.color }}
                                                strokeWidth={1.5}
                                            />
                                        </motion.div>

                                        {/* Animated connector — hidden on very small, scales up */}
                                        {i < ragSteps.length - 1 && (
                                            <motion.div
                                                className="flex items-center justify-center flex-shrink-0"
                                                initial={{ opacity: 0 }}
                                                animate={isInView ? { opacity: 1 } : {}}
                                                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                                            >
                                                <svg
                                                    viewBox="0 0 56 16"
                                                    fill="none"
                                                    className="overflow-visible w-6 sm:w-8 md:w-10 lg:w-14"
                                                    style={{ height: "16px" }}
                                                >
                                                    {/* Dashed track */}
                                                    <line
                                                        x1="0" y1="8" x2="44" y2="8"
                                                        stroke="rgba(129,140,248,0.22)"
                                                        strokeWidth="1.5"
                                                        strokeDasharray="4 3"
                                                    />
                                                    {/* Arrowhead */}
                                                    <path
                                                        d="M40 4 L50 8 L40 12"
                                                        stroke="rgba(129,140,248,0.5)"
                                                        strokeWidth="1.5"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        fill="none"
                                                    />
                                                    {/* Travelling glowing dot */}
                                                    <motion.circle
                                                        cx="0" cy="8" r="3"
                                                        fill="var(--accent-1)"
                                                        style={{ filter: "drop-shadow(0 0 5px var(--accent-1))" }}
                                                        animate={{ cx: [0, 44] }}
                                                        transition={{
                                                            duration: 1.1,
                                                            repeat: Infinity,
                                                            ease: "linear",
                                                            delay: i * 0.28,
                                                        }}
                                                    />
                                                </svg>
                                            </motion.div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Row 2 — labels below icons, same layout with matching gaps */}
                            <div className="flex items-start justify-center w-full gap-1 sm:gap-2 md:gap-3 lg:gap-4 mt-3 md:mt-4">
                                {ragSteps.map((step, i) => (
                                    <div key={step.label} className="flex items-center gap-1 sm:gap-2 md:gap-3 lg:gap-4">
                                        {/* Label — same width as icon */}
                                        <motion.div
                                            className="w-11 sm:w-12 md:w-14 lg:w-16 flex flex-col items-center text-center flex-shrink-0"
                                            initial={{ opacity: 0 }}
                                            animate={isInView ? { opacity: 1 } : {}}
                                            transition={{ duration: 0.4, delay: 0.35 + i * 0.1, ease }}
                                        >
                                            <p
                                                className="text-[9px] sm:text-[10px] md:text-[11px] font-semibold text-[var(--foreground)] leading-tight"
                                                style={{ fontFamily: "var(--font-display)" }}
                                            >
                                                {step.label}
                                            </p>
                                            <p className="text-[8px] sm:text-[9px] md:text-[10px] text-[var(--muted-color)] mt-0.5 leading-tight">
                                                {step.sublabel}
                                            </p>
                                        </motion.div>

                                        {/* Arrow-width spacer in label row */}
                                        {i < ragSteps.length - 1 && (
                                            <div className="w-6 sm:w-8 md:w-10 lg:w-14 flex-shrink-0" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* ── Feature Grid ── */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {features.map((feat, i) => (
                        <motion.article
                            key={feat.title}
                            className="group relative rounded-2xl border border-[var(--glass-border)] bg-[var(--glass)] p-7 flex flex-col gap-3"
                            initial={{ opacity: 0, y: 24 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.55, delay: 0.1 + i * 0.08, ease }}
                            whileHover={{ y: -4, borderColor: "rgba(129,140,248,0.2)", transition: { duration: 0.25 } }}
                        >
                            <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center border border-[var(--glass-border)]"
                                style={{ background: "color-mix(in srgb, var(--accent-1) 10%, transparent)" }}
                            >
                                <feat.icon
                                    className="w-4.5 h-4.5"
                                    style={{ color: "var(--accent-1)" }}
                                    strokeWidth={1.5}
                                />
                            </div>

                            <h3
                                className="text-base font-semibold text-[var(--foreground)]"
                                style={{ fontFamily: "var(--font-display)" }}
                            >
                                {feat.title}
                            </h3>

                            <p className="text-sm text-[var(--muted-color)] leading-relaxed">
                                {feat.description}
                            </p>
                        </motion.article>
                    ))}
                </div>

                {/* ── CTA strip ── */}
                <motion.div
                    className="mt-14 text-center"
                    initial={{ opacity: 0, y: 16 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.5, ease }}
                >
                    <a href="#contact" className="btn-primary inline-flex items-center gap-2">
                        Build My Support Chatbot
                        <ArrowRight className="w-4 h-4" strokeWidth={2} />
                    </a>
                </motion.div>
            </div>
        </section>
    )
}
