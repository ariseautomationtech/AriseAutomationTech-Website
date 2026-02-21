"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Check, Clock, CalendarDays } from "lucide-react"

const calendlyLink = "https://calendly.com/kurmaritish777/30min"

const tiers = [
  {
    id: "founding",
    badge: "Limited Founding Offer",
    name: "Founding Automation Pilot",
    price: "Starting at ₹95,000",
    period: "",
    description: "For early adopters ready to implement their first AI automation.",
    highlights: [
      "Workflow discovery & bottleneck analysis",
      "Process mapping document",
      "1 production-ready automation workflow",
      "Basic integration (up to 1 external tool)",
      "Deployment support",
      "Handover documentation",
      "Case study collaboration (optional)",
    ],
    timeline: "2–3 weeks",
    cta: "Apply as Founding Partner",
    ctaHref: calendlyLink,
    note: "Limited to 3 founding clients. Pricing increases after founding phase.",
    featured: true,
  },
  {
    id: "production",
    badge: null,
    name: "Production Automation Build",
    price: "Starting at ₹3,50,000",
    period: "",
    description: "End-to-end AI automation built for production workloads.",
    highlights: [
      "System architecture design",
      "Custom AI agents & workflow pipelines",
      "Integration with up to 3 tools",
      "Testing & deployment",
      "Monitoring setup",
      "30-day post-launch support",
      "Documentation & admin overview",
    ],
    timeline: "4–8 weeks depending on complexity",
    cta: "Book Strategy Call",
    ctaHref: calendlyLink,
    note: "Final pricing depends on complexity and integrations.",
    featured: false,
  },
  {
    id: "managed",
    badge: null,
    name: "Managed Automation & Optimization",
    price: "Starting at ₹75,000",
    period: "/ month",
    description: "Ongoing monitoring, optimization, and workflow improvements.",
    highlights: [
      "System monitoring & maintenance",
      "Up to 15 support hours / month",
      "Performance optimization",
      "Monthly strategy call",
      "Priority support (business hours)",
      "Minor workflow enhancements",
    ],
    timeline: null,
    cta: "Discuss Support Plan",
    ctaHref: calendlyLink,
    note: "New automation builds are scoped separately.",
    featured: false,
  },
]

const ease = [0.2, 0.9, 0.3, 1] as const

export default function Pricing() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <section ref={ref} id="pricing" className="py-20 md:py-28 relative">
      {/* top divider */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(165,180,252,0.12), transparent)",
        }}
        aria-hidden="true"
      />

      <div className="section-container">
        {/* ── Section Header ── */}
        <motion.div
          className="text-center mb-16 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent-2)] font-semibold mb-4">
            Pricing &amp; Engagement Models
          </p>
          <h2
            className="text-3xl md:text-4xl mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Flexible Automation Plans for Growing Teams
          </h2>
          <p className="text-[var(--muted-color)] text-sm leading-relaxed">
            Start with a focused pilot. Scale into production when value is proven.
          </p>
        </motion.div>

        {/* ── Cards Grid ── */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto items-stretch">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.13, ease }}
              className={`relative ${tier.featured ? "p-[1.5px] rounded-2xl" : ""
                }`}
              style={
                tier.featured
                  ? {
                    background:
                      "linear-gradient(var(--angle, 0deg), var(--accent-1), var(--accent-2), var(--accent-1))",
                    animation: "rotateGradient 4s linear infinite",
                  }
                  : undefined
              }
            >
              <motion.div
                className={`rounded-2xl p-8 flex flex-col relative h-full ${tier.featured
                  ? "bg-[var(--bg-900)] shadow-[0_0_40px_rgba(165,180,252,0.06)]"
                  : "glass-card"
                  }`}
                whileHover={{
                  y: -5,
                  scale: 1.012,
                  boxShadow: "0 12px 36px rgba(12,18,30,0.55), inset 0 1px 0 rgba(255,255,255,0.06)",
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Badge */}
                {tier.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span
                      className="bg-[var(--accent-1)] text-[var(--cta-contrast)] px-4 py-1 rounded-full text-xs font-bold tracking-wide whitespace-nowrap"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {tier.badge}
                    </span>
                  </div>
                )}

                {/* Name + Description */}
                <div className="mb-5">
                  <h3
                    className="text-xl font-bold text-[var(--foreground)] mb-2"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {tier.name}
                  </h3>
                  <p className="text-xs text-[var(--muted-color)] leading-relaxed">
                    {tier.description}
                  </p>
                </div>

                {/* Price */}
                <div className="mb-6 flex items-baseline gap-1">
                  <span
                    className="text-2xl font-bold text-[var(--foreground)]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {tier.price}
                  </span>
                  {tier.period && (
                    <span className="text-sm text-[var(--muted-color)]">{tier.period}</span>
                  )}
                </div>

                {/* Includes */}
                <ul className="space-y-2.5 mb-6 flex-1">
                  {tier.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2.5">
                      <Check
                        className="w-4 h-4 text-[var(--accent-1)] flex-shrink-0 mt-0.5"
                        strokeWidth={2}
                      />
                      <span className="text-sm text-[var(--muted-color)]">{h}</span>
                    </li>
                  ))}
                </ul>

                {/* Timeline */}
                {tier.timeline && (
                  <div className="flex items-center gap-2 mb-6 text-xs text-[var(--muted-color)] border-t border-[var(--glass-border)] pt-5">
                    <Clock className="w-3.5 h-3.5 text-[var(--accent-2)] flex-shrink-0" />
                    <span>
                      <span className="font-semibold text-[var(--foreground)]">Delivery: </span>
                      {tier.timeline}
                    </span>
                  </div>
                )}

                {/* CTA */}
                <a
                  href={tier.ctaHref}
                  target="_blank"
                  rel="noreferrer"
                  className={`w-full text-center py-3.5 rounded-full font-semibold text-sm transition-all duration-300 hover:-translate-y-1 ${tier.featured ? "btn-primary" : "btn-secondary"
                    }`}
                  aria-label={tier.cta}
                >
                  {tier.cta}
                </a>

                {/* Note */}
                {tier.note && (
                  <p className="text-[10px] text-[var(--muted-color)]/60 text-center mt-3 leading-relaxed italic">
                    {tier.note}
                  </p>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>


      </div>
    </section>
  )
}