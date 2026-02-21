import Link from "next/link"
import { Linkedin, Twitter, Instagram, Mail } from "lucide-react"

const footerLinks = [
  { label: "Solutions", href: "#services" },
  { label: "How it Works", href: "#how-it-works" },
  { label: "Use Cases", href: "#use-cases" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
]

const socialLinks = [
  {
    icon: Instagram,
    href: "https://www.instagram.com/arise.at/",
    label: "Instagram",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/ariseautomationtech/",
    label: "LinkedIn",
  },
  {
    icon: Twitter,
    href: "https://x.com/Arise278622",
    label: "X (Twitter)",
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-[var(--glass-border)] py-16">
      <div className="section-container">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4" aria-label="Arise Automation Tech — Home">
              <svg
                width="28"
                height="28"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <rect x="2" y="2" width="28" height="28" rx="6" stroke="var(--accent-1)" strokeWidth="1.5" fill="none" />
                <circle cx="10" cy="16" r="3" stroke="var(--accent-1)" strokeWidth="1.5" fill="none" />
                <circle cx="22" cy="10" r="3" stroke="var(--accent-2)" strokeWidth="1.5" fill="none" />
                <circle cx="22" cy="22" r="3" stroke="var(--accent-2)" strokeWidth="1.5" fill="none" />
                <line x1="13" y1="15" x2="19" y2="11" stroke="var(--accent-1)" strokeWidth="1" opacity="0.6" />
                <line x1="13" y1="17" x2="19" y2="21" stroke="var(--accent-1)" strokeWidth="1" opacity="0.6" />
              </svg>
              <span
                className="text-base font-bold tracking-wide text-[var(--foreground)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Arise Automation Tech
              </span>
            </Link>
            <p className="text-sm text-[var(--muted-color)] max-w-xs leading-relaxed">
              Production-ready AI automations and custom web apps that reduce
              manual work, increase accuracy, and deliver measurable ROI.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="text-sm font-semibold text-[var(--foreground)] mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--muted-color)] hover:text-[var(--accent-1)] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4
              className="text-sm font-semibold text-[var(--foreground)] mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Contact
            </h4>
            <ul className="space-y-2.5 text-sm text-[var(--muted-color)] mb-6">
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 flex-shrink-0 text-[var(--accent-1)]" strokeWidth={1.5} />
                <a
                  href="mailto:ariseautomationtech@gmail.com"
                  className="hover:text-[var(--accent-1)] transition-colors duration-200"
                >
                  ariseautomationtech@gmail.com
                </a>
              </li>
            </ul>

            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg border border-[var(--glass-border)] bg-[var(--glass)] flex items-center justify-center text-[var(--muted-color)] hover:text-[var(--accent-1)] hover:border-[var(--accent-1)]/30 transition-all duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[var(--glass-border)] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--muted-color)]">
            © {new Date().getFullYear()} Arise Automation Tech. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-[var(--muted-color)]">
            <Link href="#" className="hover:text-[var(--accent-1)] transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-[var(--accent-1)] transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
