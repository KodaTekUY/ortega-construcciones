import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { TrustBadges } from "@/components/trust-badges"
import { Services } from "@/components/services"
import { Process } from "@/components/process"
import { Projects } from "@/components/projects"
import { Testimonials } from "@/components/testimonials"
import { CtaSection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <TrustBadges />
      <Services />
      <Process />
      <Projects />
      <Testimonials />
      <CtaSection />
      <Footer />
    </main>
  )
}
