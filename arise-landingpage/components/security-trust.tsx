"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ShieldCheck, Lock, Cloud, Globe } from "lucide-react"

const trustItems = [
    { icon: ShieldCheck, label: "GDPR-Ready" },
    { icon: Lock, label: "SOC 2 Aligned" },
    { icon: Globe, label: "TLS 1.3 Encrypted" },
    { icon: Cloud, label: "99.9% Uptime SLA" },
]

const ease = [0.2, 0.9, 0.3, 1] as const

export default function SecurityTrust() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.3 })

    return (
        <section ref={ref} className="py-10 md:py-14 relative" aria-label="Security and trust credentials">
            <div className="section-container">
                <motion.div
                    className="glass-card rounded-2xl px-6 py-5 md:px-10 md:py-6 flex flex-col md:flex-row items-center justify-between gap-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease }}
                >
                    {/* Left label */}
                    <div className="flex items-center gap-3 flex-shrink-0">
                        <ShieldCheck className="w-5 h-5 text-[var(--accent-1)]" strokeWidth={1.5} />
                        <span
                            className="text-sm font-semibold text-[var(--foreground)]"
                            style={{ fontFamily: "var(--font-display)" }}
                        >
                            Enterprise-Grade Security
                        </span>
                    </div>

                    {/* Trust items row */}
                    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
                        {trustItems.map((item, i) => (
                            <motion.div
                                key={item.label}
                                className="flex items-center gap-2"
                                initial={{ opacity: 0, y: 10 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.4, delay: 0.1 + i * 0.08, ease }}
                            >
                                <item.icon className="w-4 h-4 text-[var(--accent-1)] opacity-70" strokeWidth={1.5} />
                                <span className="text-xs text-[var(--muted-color)] font-medium whitespace-nowrap">
                                    {item.label}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
