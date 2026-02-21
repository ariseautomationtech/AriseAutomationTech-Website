"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Workflow, BotMessageSquare, Plug, ArrowRight } from "lucide-react"

const services = [
  {
    icon: Workflow,
    title: "Workflow Automation",
    description:
      "Intelligent workflows that trigger, execute, and adapt — eliminating repetitive tasks without human intervention.",
    bullets: [
      "End-to-end process orchestration",
      "Event-driven automation chains",
      "Custom business logic pipelines",
    ],
  },
  {
    icon: BotMessageSquare,
    title: "Custom AI Agents",
    description:
      "Purpose-built AI agents that handle complex decisions and actions autonomously across your operations.",
    bullets: [
      "Natural language reasoning",
      "Context-aware decision engines",
      "Multi-step task execution",
    ],
  },
  {
    icon: Plug,
    title: "Integration & Deployment",
    description:
      "Connect your existing stack and ship production-ready automations with zero downtime.",
    bullets: [
      "API-first architecture",
      "Cloud-native CI/CD pipelines",
      "Real-time monitoring & alerts",
    ],
  },
]

const ease = [0.2, 0.9, 0.3, 1] as const

export default function Solutions() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section ref={ref} className="py-24 md:py-32 relative">
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
        >
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--accent-1)] font-medium mb-4">
            What We Do
          </p>
          <h2
            className="text-3xl md:text-[2.75rem] leading-tight max-w-xl mx-auto"
            style={{ fontFamily: "var(--font-display)" }}
          >
            AI-powered automation, built for production
          </h2>
        </motion.div>

        {/* 3 Equal Cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <motion.article
              key={service.title}
              className="group relative rounded-2xl border border-[var(--glass-border)] bg-[var(--glass)] p-8 flex flex-col"
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease }}
              whileHover={{
                borderColor: "rgba(255,255,255,0.12)",
                y: -4,
                transition: { duration: 0.3 },
              }}
            >
              {/* Icon */}
              <div className="w-11 h-11 rounded-xl bg-white/[0.06] border border-white/[0.06] flex items-center justify-center mb-5">
                <service.icon className="w-5 h-5 text-[var(--accent-1)]" strokeWidth={1.5} />
              </div>

              {/* Title */}
              <h3
                className="text-lg font-semibold text-[var(--foreground)] mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-[var(--muted-color)] leading-relaxed mb-5">
                {service.description}
              </p>

              {/* Bullets */}
              <ul className="space-y-2.5 mt-auto">
                {service.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-center gap-2.5 text-sm text-[var(--muted-color)]">
                    <ArrowRight className="w-3 h-3 text-[var(--accent-1)] opacity-50 flex-shrink-0" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
