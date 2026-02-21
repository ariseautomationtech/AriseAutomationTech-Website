import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "600", "700"],
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://www.arise.dev"),
  title: "ARISE – AI Automation Services & Custom Workflow Solutions",
  description:
    "ARISE helps businesses automate workflows using AI agents and intelligent automation systems. Reduce manual work, improve efficiency, and scale faster with custom AI automation solutions.",
  keywords: [
    "AI automation services",
    "workflow automation agency",
    "business process automation with AI",
    "custom AI automation solutions",
    "AI agents for business",
    "AI chatbot development",
    "automation consulting",
    "AI workflow integration",
    "AI automation company India",
    "custom AI tools development",
    "how to automate business workflows with AI",
    "AI automation for startups",
    "AI automation for customer support",
    "AI-powered business process optimization",
    "custom web development",
    "AI-integrated web apps",
  ],
  openGraph: {
    title: "AI Automation Services by ARISE",
    description:
      "Production-ready AI automation solutions for modern businesses. Custom AI agents, workflow automation, and intelligent process optimization.",
    type: "website",
    url: "https://www.arise.dev",
    siteName: "ARISE",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ARISE – AI Automation Services and Custom Workflow Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Automation Services by ARISE",
    description:
      "Production-ready AI automation solutions for modern businesses. Reduce manual work and scale faster.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "https://www.arise.dev",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.arise.dev/#organization",
        name: "ARISE",
        url: "https://www.arise.dev",
        logo: {
          "@type": "ImageObject",
          url: "https://www.arise.dev/logo.png",
          width: 200,
          height: 60,
        },
        description:
          "ARISE is an AI automation agency helping businesses automate workflows, reduce manual work, and deploy custom AI agents for measurable efficiency gains.",
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          email: "hello@arise.dev",
          availableLanguage: "English",
        },
        areaServed: "Worldwide",
        sameAs: [
          "https://www.linkedin.com/company/arise",
          "https://twitter.com/arise_dev",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://www.arise.dev/#website",
        name: "ARISE – AI Automation Services",
        url: "https://www.arise.dev",
        publisher: { "@id": "https://www.arise.dev/#organization" },
        inLanguage: "en-US",
      },
      {
        "@type": "Service",
        "@id": "https://www.arise.dev/#service-workflow",
        name: "AI Workflow Automation",
        alternateName: "Business Process Automation with AI",
        description:
          "End-to-end AI workflow automation services for businesses. We design and deploy production-ready automation systems that eliminate repetitive tasks, reduce errors, and free your team to focus on high-value work.",
        provider: { "@id": "https://www.arise.dev/#organization" },
        serviceType: "AI Automation Services",
        areaServed: "Worldwide",
        keywords: "AI automation services, workflow automation, business process automation",
        offers: {
          "@type": "Offer",
          price: "95000",
          priceCurrency: "INR",
          description: "Founding Automation Pilot — starting at ₹95,000",
        },
      },
      {
        "@type": "Service",
        "@id": "https://www.arise.dev/#service-agents",
        name: "Custom AI Agents for Business",
        description:
          "Purpose-built AI agents that handle complex decisions autonomously — from intelligent customer support triage to internal knowledge assistants and data processing pipelines.",
        provider: { "@id": "https://www.arise.dev/#organization" },
        serviceType: "AI Agents Development",
        areaServed: "Worldwide",
        keywords: "AI agents for business, custom AI agents, AI chatbot development",
      },
      {
        "@type": "Service",
        "@id": "https://www.arise.dev/#service-web",
        name: "AI-Integrated Web Development",
        description:
          "Custom web applications built with AI capabilities — from intelligent dashboards to automation-first SaaS tools and AI-integrated business platforms.",
        provider: { "@id": "https://www.arise.dev/#organization" },
        serviceType: "Custom Web Development",
        areaServed: "Worldwide",
        keywords: "custom web development, AI-integrated web apps, custom AI tools development",
      },
      {
        "@type": "Review",
        "@id": "https://www.arise.dev/#review-1",
        itemReviewed: { "@id": "https://www.arise.dev/#organization" },
        author: { "@type": "Person", name: "Sarah M.", jobTitle: "VP of Operations" },
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        reviewBody:
          "ARISE automated our invoice processing workflow in under 3 weeks. We went from 4 hours of manual work daily to a fully automated pipeline. The ROI was immediate.",
      },
      {
        "@type": "Review",
        "@id": "https://www.arise.dev/#review-2",
        itemReviewed: { "@id": "https://www.arise.dev/#organization" },
        author: { "@type": "Person", name: "Rahul K.", jobTitle: "Head of Customer Success" },
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        reviewBody:
          "Their AI support triage agent transformed how we handle tickets. First-response time dropped significantly and our team can now focus on complex cases.",
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.arise.dev/#faq",
        mainEntity: [
          {
            "@type": "Question",
            name: "What is AI automation?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "AI automation is the use of artificial intelligence to perform repetitive or decision-based business tasks without manual intervention. Unlike traditional automation, AI automation can handle unstructured data, adapt to changing inputs, and make context-aware decisions — enabling businesses to automate complex workflows that were previously impossible to automate.",
            },
          },
          {
            "@type": "Question",
            name: "How does workflow automation work?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Workflow automation connects your existing tools and data sources through a series of triggered actions. When a defined event occurs (e.g., a new email, form submission, or database entry), the automation system processes the data, applies business logic or AI reasoning, and performs the next action — such as routing a support ticket, generating a report, or updating a CRM record.",
            },
          },
          {
            "@type": "Question",
            name: "What businesses benefit from AI automation?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "AI automation benefits businesses of all sizes that have repetitive manual processes. High-impact areas include operations teams processing invoices or reports, customer support teams handling ticket triage, sales teams managing lead qualification, and HR teams processing onboarding documents. Startups and growing SMBs see particularly strong ROI since automation directly reduces the need to hire for operational capacity.",
            },
          },
          {
            "@type": "Question",
            name: "How long does it take to implement AI automation?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A focused, single-workflow automation pilot typically takes 2–3 weeks from discovery to deployment. More complex production builds with multiple integrations take 4–8 weeks depending on scope. ARISE recommends starting with a pilot automation to validate value before scaling into a full production system.",
            },
          },
          {
            "@type": "Question",
            name: "How much does AI automation cost?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "ARISE's Founding Automation Pilot starts at ₹95,000 and delivers one production-ready automated workflow in 2–3 weeks. Production builds with multiple integrations start at ₹3,50,000. Ongoing managed automation and optimization retainers start at ₹75,000 per month. All pricing depends on workflow complexity and integration requirements.",
            },
          },
          {
            "@type": "Question",
            name: "What AI automation tools does ARISE use?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "ARISE builds automation systems using a combination of large language models (LLMs), custom AI agents, workflow orchestration platforms, and API integrations — tailored to each client's existing tech stack. We prioritize production-grade, maintainable solutions over no-code hacks.",
            },
          },
        ],
      },
    ],
  }

  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
