"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Search, Hammer, Rocket, ChevronRight } from "lucide-react"

const steps = [
    {
        icon: Search,
        number: "01",
        title: "Discover",
        description:
            "We audit your workflows, identify bottlenecks, and map high-impact automation opportunities.",
    },
    {
        icon: Hammer,
        number: "02",
        title: "Build",
        description:
            "Custom AI agents and pipelines are developed, tested, and integrated with your existing stack.",
    },
    {
        icon: Rocket,
        number: "03",
        title: "Deliver",
        description:
            "Production deployment with monitoring, support, and continuous optimization for peak ROI.",
    },
]

const ease = [0.2, 0.9, 0.3, 1] as const

export default function HowItWorks() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.2 })

    return (
        <section ref={ref} className="py-24 md:py-32 relative">
            {/* Section divider */}
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-px"
                style={{
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
                }}
                aria-hidden="true"
            />

            <div className="section-container">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease }}
                >
                    <p className="text-xs uppercase tracking-[0.25em] text-[var(--accent-2)] font-medium mb-4">
                        Our Process
                    </p>
                    <h2
                        className="text-3xl md:text-[2.75rem] leading-tight max-w-lg mx-auto"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        How It Works
                    </h2>
                </motion.div>

                {/* Steps — row with arrows between */}
                <div className="max-w-4xl mx-auto">
                    <div className="grid md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-4 lg:gap-6 items-start">
                        {steps.map((step, i) => (
                            <>
                                {/* Step card */}
                                <motion.div
                                    key={step.title}
                                    className="flex flex-col items-center text-center"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.7, delay: 0.1 + i * 0.15, ease }}
                                >
                                    {/* Step indicator */}
                                    <div className="relative mb-6">
                                        <div className="w-20 h-20 rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                                            <step.icon className="w-7 h-7 text-[var(--accent-1)] opacity-80" strokeWidth={1.4} />
                                        </div>

                                        {/* Number badge */}
                                        <span
                                            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[var(--bg-900)] border border-white/[0.1] flex items-center justify-center text-[10px] font-semibold text-[var(--foreground)] tabular-nums"
                                            style={{ fontFamily: "var(--font-display)" }}
                                        >
                                            {step.number}
                                        </span>
                                    </div>

                                    <h3
                                        className="text-lg font-semibold text-[var(--foreground)] mb-2"
                                        style={{ fontFamily: "var(--font-display)" }}
                                    >
                                        {step.title}
                                    </h3>
                                    <p className="text-sm text-[var(--muted-color)] leading-relaxed max-w-[240px] mx-auto">
                                        {step.description}
                                    </p>
                                </motion.div>

                                {/* Arrow connector between steps (not after last) */}
                                {i < steps.length - 1 && (
                                    <motion.div
                                        key={`arrow-${i}`}
                                        className="hidden md:flex items-center justify-center pt-7"
                                        initial={{ opacity: 0, x: -8 }}
                                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                                        transition={{ duration: 0.5, delay: 0.3 + i * 0.2, ease }}
                                    >
                                        <div className="flex items-center gap-1">
                                            <div
                                                className="w-12 h-px"
                                                style={{
                                                    background: "linear-gradient(90deg, var(--accent-1), var(--accent-2))",
                                                    opacity: 0.3,
                                                }}
                                            />
                                            <ChevronRight className="w-4 h-4 text-[var(--accent-2)] opacity-40" strokeWidth={1.5} />
                                        </div>
                                    </motion.div>
                                )}
                            </>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
