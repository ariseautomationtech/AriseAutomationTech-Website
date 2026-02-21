"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"

const navLinks = [
  { label: "Solutions", href: "#services" },
  { label: "How it Works", href: "#how-it-works" },
  { label: "Use Cases", href: "#use-cases" },
  // { label: "Pricing", href: "#pricing" },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [mobileMenuOpen])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300 ${scrolled || mobileMenuOpen
            ? "bg-[var(--bg-900)] border-b border-[var(--glass-border)] shadow-[0_4px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
            : "bg-transparent"
          }`}
      >
        <div className="section-container h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group" aria-label="Arise Automation Tech — Home">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transition-transform duration-300 group-hover:scale-110"
                aria-hidden="true"
              >
                <rect x="2" y="2" width="28" height="28" rx="6" stroke="var(--accent-1)" strokeWidth="1.5" fill="none" />
                <circle cx="10" cy="16" r="3" stroke="var(--accent-1)" strokeWidth="1.5" fill="none" />
                <circle cx="22" cy="10" r="3" stroke="var(--accent-2)" strokeWidth="1.5" fill="none" />
                <circle cx="22" cy="22" r="3" stroke="var(--accent-2)" strokeWidth="1.5" fill="none" />
                <line x1="13" y1="15" x2="19" y2="11" stroke="var(--accent-1)" strokeWidth="1" opacity="0.6" />
                <line x1="13" y1="17" x2="19" y2="21" stroke="var(--accent-1)" strokeWidth="1" opacity="0.6" />
                <line x1="22" y1="13" x2="22" y2="19" stroke="var(--accent-2)" strokeWidth="1" opacity="0.6" />
              </svg>
              <span
                className="text-lg font-bold tracking-wide"
                style={{ fontFamily: "var(--font-display)", color: "var(--foreground)" }}
              >
                <span className="md:hidden">Arise</span>
                <span className="hidden md:inline">Arise Automation Tech</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-[var(--muted-color)] hover:text-[var(--foreground)] transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
              {/* <ThemeToggle /> */}
              <a
                href="https://calendly.com/ariseautomationtech/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm px-6 py-2.5"
                aria-label="Request a demo — book a call on Calendly"
              >
                Request Demo
              </a>
            </nav>

            {/* Mobile: Theme toggle + Menu button */}
            <div className="lg:hidden flex items-center gap-2">
              {/* <ThemeToggle /> */}
              <button
                className="p-2 text-[var(--muted-color)] hover:text-[var(--foreground)] transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-expanded={mobileMenuOpen}
                aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu — rendered outside header so it's a true full-screen takeover */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-[49] flex flex-col pt-16"
          style={{ background: "var(--bg-900)" }}
          aria-modal="true"
          role="dialog"
        >
          <div className="h-px bg-[var(--glass-border)]" />
          <nav
            className="flex flex-col items-center justify-center flex-1 gap-7 px-6 overflow-hidden"
            aria-label="Mobile navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-semibold text-[var(--foreground)] hover:text-[var(--accent-1)] transition-colors duration-200"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {link.label}
              </Link>
            ))}
            <div className="h-px w-16 bg-[var(--glass-border)] my-1" />
            <a
              href="https://calendly.com/ariseautomationtech/30min"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-primary text-base px-8 py-3"
              aria-label="Request a demo — book a call on Calendly"
            >
              Request Demo
            </a>
          </nav>
        </div>
      )}
    </>
  )
}
