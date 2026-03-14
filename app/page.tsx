import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { StatsBar } from "@/components/stats-bar"
import { Features } from "@/components/features"
import { HowItWorks } from "@/components/how-it-works"
import { Architecture } from "@/components/architecture"
import { DeploymentModes } from "@/components/deployment-modes"
import { LiveStats } from "@/components/live-stats"
import { Testimonials } from "@/components/testimonials"
import { Pricing } from "@/components/pricing"
import { Faq } from "@/components/faq"
import { CtaSection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <StatsBar />
      <Features />
      <HowItWorks />
      <Architecture />
      <DeploymentModes />
      <LiveStats />
      <Testimonials />
      <Pricing />
      <Faq />
      <CtaSection />
      <Footer />
    </main>
  )
}
