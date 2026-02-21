"use client"

import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

const faqs = [
    {
        q: "What is AI automation?",
        a: "AI automation uses artificial intelligence to perform repetitive or decision-based business tasks without manual intervention. Unlike traditional rule-based automation, AI automation handles unstructured data, adapts to changing inputs, and makes context-aware decisions — enabling businesses to automate complex workflows that were previously impossible to automate at scale.",
    },
    {
        q: "How does workflow automation work?",
        a: "Workflow automation connects your existing tools and data sources through triggered actions. When a defined event occurs — a new email, form submission, or database entry — the system processes the data, applies business logic or AI reasoning, and executes the next action automatically. Examples include routing support tickets, generating financial reports, or updating CRM records without human input.",
    },
    {
        q: "What businesses benefit from AI automation?",
        a: "Any business with repetitive manual processes benefits from AI automation. High-impact areas include operations teams processing invoices or reports, customer support teams managing ticket triage, sales teams qualifying leads, and HR teams handling onboarding documents. Startups and growing SMBs see particularly strong ROI since automation directly reduces the need to hire for operational capacity.",
    },
    {
        q: "How long does it take to implement AI automation?",
        a: "A focused single-workflow automation pilot typically takes 2–3 weeks from discovery to deployment. More complex production builds with multiple integrations take 4–8 weeks depending on scope. ARISE recommends starting with a focused pilot to validate real-world value before scaling into a full production automation system.",
    },
    {
        q: "How much does AI automation cost?",
        a: "ARISE's Founding Automation Pilot starts at ₹95,000 and delivers one production-ready automated workflow in 2–3 weeks. Full production builds with multiple integrations start at ₹3,50,000. Ongoing managed automation and optimization retainers start at ₹75,000 per month. All pricing is scope-dependent — book a free discovery call to get an accurate estimate.",
    },
    {
        q: "What AI automation tools does ARISE use?",
        a: "ARISE builds automation systems using large language models (LLMs), custom AI agents, workflow orchestration platforms, and API integrations — all tailored to each client's existing tech stack. We prioritize production-grade, maintainable solutions that your team can operate and scale over time.",
    },
]

const ease = [0.2, 0.9, 0.3, 1] as const

export default function FaqSection() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.1 })
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    return (
        <section
            ref={ref}
            id="faq"
            className="py-20 md:py-24 relative"
            aria-label="Frequently asked questions about AI automation"
        >
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-px"
                style={{
                    background:
                        "linear-gradient(90deg, transparent, rgba(165,180,252,0.08), transparent)",
                }}
                aria-hidden="true"
            />

            <div className="section-container max-w-3xl">
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease }}
                >
                    <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent-1)] font-semibold mb-4">
                        Common Questions
                    </p>
                    <h2
                        className="text-3xl md:text-4xl"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        AI Automation — Frequently Asked Questions
                    </h2>
                    <p className="text-[var(--muted-color)] text-sm mt-3">
                        Everything you need to know about AI automation services and how ARISE works.
                    </p>
                </motion.div>

                <div className="space-y-3" itemScope itemType="https://schema.org/FAQPage">
                    {faqs.map((faq, i) => (
                        <motion.div
                            key={faq.q}
                            className="glass-card rounded-2xl overflow-hidden transition-all duration-300"
                            style={{
                                borderLeft: openIndex === i ? "2px solid var(--accent-1)" : "2px solid transparent",
                                boxShadow: openIndex === i ? "inset 3px 0 12px rgba(165,180,252,0.06)" : "none",
                            }}
                            itemScope
                            itemProp="mainEntity"
                            itemType="https://schema.org/Question"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: i * 0.08, ease }}
                        >
                            <button
                                className="w-full flex items-center justify-between gap-4 p-6 text-left"
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                aria-expanded={openIndex === i}
                                aria-controls={`faq-answer-${i}`}
                            >
                                <span
                                    className="text-base font-semibold text-[var(--foreground)]"
                                    style={{ fontFamily: "var(--font-display)" }}
                                    itemProp="name"
                                >
                                    {faq.q}
                                </span>
                                <motion.div
                                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                                    transition={{ duration: 0.25 }}
                                    className="flex-shrink-0"
                                >
                                    <ChevronDown
                                        className="w-5 h-5 text-[var(--muted-color)]"
                                        aria-hidden="true"
                                    />
                                </motion.div>
                            </button>

                            <AnimatePresence initial={false}>
                                {openIndex === i && (
                                    <motion.div
                                        id={`faq-answer-${i}`}
                                        itemScope
                                        itemProp="acceptedAnswer"
                                        itemType="https://schema.org/Answer"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        style={{ overflow: "hidden" }}
                                    >
                                        <p
                                            className="px-6 pb-6 text-sm text-[var(--muted-color)] leading-relaxed"
                                            itemProp="text"
                                        >
                                            {faq.a}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {/* Inline CTA */}
            </div>
        </section>
    )
}
