import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import Solutions from "@/components/solutions"
import ChatbotShowcase from "@/components/chatbot-showcase"
import HowItWorks from "@/components/how-it-works"
import UseCases from "@/components/use-cases"
// import Pricing from "@/components/pricing"

import FaqSection from "@/components/faq-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen relative z-10" data-variant="hero-A">
      <Header />
      <HeroSection />
      <section id="services">
        <Solutions />
      </section>
      <section id="chatbot">
        <ChatbotShowcase />
      </section>
      <section id="how-it-works">
        <HowItWorks />
      </section>
      <section id="use-cases">
        <UseCases />
      </section>
      {/* <section id="pricing">
        <Pricing />
      </section> */}

      <FaqSection />
      <section id="contact">
        <ContactSection />
      </section>
      <Footer />
    </main>
  )
}
