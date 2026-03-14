import Link from "next/link"
import { Check, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const plans = [
  {
    name: "Self-Hosted",
    price: "Free",
    period: "forever",
    description:
      "Deploy on your own Raspberry Pi. Full DNS filtering with complete data sovereignty.",
    features: [
      "Unlimited DNS queries",
      "All blocklist subscriptions",
      "Real-time query logging",
      "Custom deny/allow lists",
      "Covers all LAN devices",
      "Community support",
    ],
    cta: "Download Image",
    highlighted: false,
  },
  {
    name: "Cloud Pro",
    price: "$3",
    period: "per month",
    description:
      "Managed cloud DNS for users who cannot self-host. Same powerful filtering engine.",
    features: [
      "Everything in Self-Hosted",
      "Global Anycast DNS network",
      "DNS-over-HTTPS / TLS",
      "Up to 10 device profiles",
      "Mobile network protection",
      "Analytics dashboard",
      "Priority support",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "per org",
    description:
      "Network-wide deployment for offices and institutions with centralized management.",
    features: [
      "Everything in Cloud Pro",
      "Unlimited device profiles",
      "Centralized admin panel",
      "SIEM log streaming",
      "Custom threat feeds",
      "SSO integration",
      "Dedicated support",
      "SLA guarantee",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="border-y border-border bg-secondary/30 py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-medium text-primary uppercase tracking-widest">
            Pricing
          </span>
          <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-5xl font-mono">
            Self-host free. Cloud from $3/mo.
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground leading-relaxed">
            The self-hosted version is completely free and open source. Cloud DNS adds
            managed infrastructure with global reach.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-xl border p-6 ${
                plan.highlighted
                  ? "border-primary bg-card"
                  : "border-border bg-card"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-xs font-medium text-primary-foreground">
                  Recommended
                </div>
              )}
              <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-foreground font-mono">{plan.price}</span>
                <span className="text-sm text-muted-foreground">/{plan.period}</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {plan.description}
              </p>

              <ul className="mt-6 flex flex-1 flex-col gap-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-foreground">
                    <Check className="h-4 w-4 shrink-0 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                className={`mt-8 w-full gap-2 ${
                  plan.highlighted
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
                asChild
              >
                <Link href="/signup">
                  {plan.cta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
