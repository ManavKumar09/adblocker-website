"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "What hardware do I need to self-host ShieldBlock?",
    answer:
      "ShieldBlock runs on a Raspberry Pi 3, 4, or 5 with at least 1 GB of RAM. It acts as your local DNS resolver and filtering node. The Pi should be connected to your network via Ethernet for best performance, though Wi-Fi works for smaller setups.",
  },
  {
    question: "How does DNS-level filtering work?",
    answer:
      "When any device on your network tries to access a website, it first sends a DNS query to resolve the domain name. ShieldBlock intercepts these queries and checks them against curated blocklists. If the domain is associated with ads, trackers, or malware, ShieldBlock returns a null address, preventing the connection from ever being established.",
  },
  {
    question: "Is ad blocking legal in India?",
    answer:
      "Yes. The Information Technology Act, 2000 (Section 69A) pertains to government-directed content blocking, not user-controlled filtering. The Digital Personal Data Protection Act, 2023 reinforces a user's right to control how their browsing metadata is processed. Personal ad blocking for privacy is not prohibited under current Indian law.",
  },
  {
    question: "What is the difference between self-hosted and cloud DNS?",
    answer:
      "The self-hosted version runs entirely on your Raspberry Pi, meaning your DNS queries never leave your local network. The cloud DNS routes your queries through our global infrastructure, which is useful for mobile networks, traveling, or users who cannot deploy hardware. Both use the same filtering engine and blocklists.",
  },
  {
    question: "Will ShieldBlock break any websites?",
    answer:
      "ShieldBlock is designed to block only advertising and tracking domains without affecting core website functionality. If a site requires you to disable blocking, you can whitelist specific domains through the admin dashboard. The custom allow/deny list feature gives you granular control.",
  },
  {
    question: "How much data can ShieldBlock save?",
    answer:
      "Independent studies show that advertising resources can account for 18-79% of mobile data usage on certain pages. Network-level blocking typically reduces overall data transfer by approximately 30-40% on content-heavy websites. For users on limited data plans in India, this translates to significant monthly savings.",
  },
  {
    question: "Can ShieldBlock detect obfuscated ad scripts?",
    answer:
      "Our current filtering uses curated blocklists and DNS-level interception. Future versions will integrate machine learning techniques to detect obfuscated advertising scripts, identify unknown tracking domains, and automatically update filtering lists based on behavioral pattern classification.",
  },
  {
    question: "Does ShieldBlock work on mobile networks?",
    answer:
      "The self-hosted version protects all devices on your home or office LAN. For mobile (cellular) network protection, use the Cloud DNS mode which provides DNS-over-HTTPS and DNS-over-TLS support that works across any network your device connects to.",
  },
]

export function Faq() {
  return (
    <section id="faq" className="py-20 md:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-medium text-primary uppercase tracking-widest">
            FAQ
          </span>
          <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-5xl font-mono">
            Frequently asked questions
          </h2>
        </div>

        <Accordion type="single" collapsible className="mt-12">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border-border">
              <AccordionTrigger className="text-left text-foreground hover:text-primary hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
