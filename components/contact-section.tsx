"use client"

import type React from "react"
import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Clock, Video, Send } from "lucide-react"

const calendlyLink = "https://calendly.com/kurmaritish777/30min"

const useCaseOptions = [
  "Workflow Automation",
  "Customer Support AI",
  "Reporting & Analytics",
  "Invoice / Billing Automation",
  "Custom AI Agent",
  "Web Application",
  "Other",
]

const ease = [0.2, 0.9, 0.3, 1] as const

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    description: "",
    useCase: "",
    privacy: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Analytics event stub
    if (typeof window !== "undefined" && (window as any).gtag) {
      ; (window as any).gtag("event", "lead_form_submit", {
        name: formData.name,
        company: formData.company,
        use_case: formData.useCase,
      })
    }

    const subject = encodeURIComponent(
      `New demo request from ${formData.name || "website visitor"}`
    )
    const body = [
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      `Company: ${formData.company}`,
      `Use Case: ${formData.useCase}`,
      "",
      "--- Project Details ---",
      formData.description,
    ]
      .filter(Boolean)
      .join("%0D%0A")

    window.location.href = `mailto:kurmaritish777@gmail.com?subject=${subject}&body=${body}`
  }

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.15 })

  const inputClasses =
    "w-full rounded-xl py-3 px-4 text-sm bg-[var(--glass)] border border-[var(--glass-border)] text-[var(--foreground)] placeholder:text-[var(--muted-color)]/60 focus:outline-none focus:ring-2 focus:ring-[var(--accent-1)]/40 focus:border-[var(--accent-1)]/30 transition-all duration-200"

  return (
    <section ref={ref} className="py-20 md:py-28 relative overflow-hidden">
      {/* Dot-grid background */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(196,181,253,0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          opacity: 0.25,
        }}
        aria-hidden="true"
      />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(196,181,253,0.12), transparent)",
        }}
        aria-hidden="true"
      />

      <div className="section-container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
        >
          <h2
            className="text-3xl md:text-4xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Ready to Automate?{" "}
            <span className="text-[var(--accent-1)]">Let&apos;s Talk.</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Schedule Call */}
          <motion.div
            className="glass-card rounded-2xl p-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease }}
          >
            <h3
              className="text-xl font-bold text-[var(--foreground)] mb-2"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Schedule a Discovery Call
            </h3>
            <p className="text-sm text-[var(--muted-color)] mb-8">
              Pick a time that works for you. We&apos;ll discuss your goals and identify
              quick-win automations.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-[var(--glass-border)]">
                <div className="w-10 h-10 rounded-full bg-[var(--accent-1)]/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-[var(--accent-1)]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--foreground)]">30-min session</p>
                  <p className="text-xs text-[var(--muted-color)]">Focused discovery call</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-[var(--glass-border)]">
                <div className="w-10 h-10 rounded-full bg-[var(--accent-2)]/10 flex items-center justify-center">
                  <Video className="w-5 h-5 text-[var(--accent-2)]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--foreground)]">Video preferred</p>
                  <p className="text-xs text-[var(--muted-color)]">Google Meet or Zoom</p>
                </div>
              </div>
            </div>

            <a
              href={calendlyLink}
              target="_blank"
              rel="noreferrer"
              className="btn-primary w-full text-center block py-3.5"
              aria-label="Schedule a discovery call via Calendly"
            >
              Book Your Discovery Call
            </a>
          </motion.div>

          {/* Lead Form */}
          <motion.div
            className="glass-card rounded-2xl p-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease }}
          >
            <h3
              className="text-xl font-bold text-[var(--foreground)] mb-2"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Request a Demo
            </h3>
            <p className="text-sm text-[var(--muted-color)] mb-8">
              Share details about your needs. We&apos;ll follow up within one business day.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="sr-only">Your Name</label>
                  <input
                    id="contact-name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={inputClasses}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="sr-only">Email Address</label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={inputClasses}
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-company" className="sr-only">Company Name</label>
                <input
                  id="contact-company"
                  placeholder="Company Name"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className={inputClasses}
                />
              </div>

              <div>
                <label htmlFor="contact-usecase" className="sr-only">Use Case</label>
                <select
                  id="contact-usecase"
                  value={formData.useCase}
                  onChange={(e) => setFormData({ ...formData, useCase: e.target.value })}
                  className={inputClasses}
                  required
                >
                  <option value="">Select Use Case</option>
                  {useCaseOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="contact-description" className="sr-only">Brief Description</label>
                <textarea
                  id="contact-description"
                  placeholder="Briefly describe your automation goals..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className={`${inputClasses} min-h-[100px] resize-none`}
                />
              </div>

              {/* Privacy checkbox */}
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.privacy}
                  onChange={(e) =>
                    setFormData({ ...formData, privacy: e.target.checked })
                  }
                  className="mt-1 rounded border-[var(--glass-border)] bg-[var(--glass)] text-[var(--accent-1)] focus:ring-[var(--accent-1)]/40"
                  required
                />
                <span className="text-xs text-[var(--muted-color)]">
                  I agree to the Privacy Policy and consent to ARISE storing my
                  submitted data for follow-up purposes.
                </span>
              </label>

              <button
                type="submit"
                className="btn-primary w-full py-3.5 flex items-center justify-center gap-2"
                aria-label="Submit demo request"
              >
                <Send className="w-4 h-4" />
                Request Demo
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}