import { Server, SlidersHorizontal, ShieldCheck, Wifi } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: Server,
    title: "Deploy ShieldBlock",
    description:
      "Flash ShieldBlock onto a Raspberry Pi or configure your router to use our cloud DNS servers. One-time setup that takes under 5 minutes.",
  },
  {
    number: "02",
    icon: Wifi,
    title: "Connect Your Network",
    description:
      "Point your router's DNS to ShieldBlock. Every device on the network is now protected automatically, with no per-device configuration.",
  },
  {
    number: "03",
    icon: SlidersHorizontal,
    title: "Customize Filters",
    description:
      "Choose from curated blocklists, add custom deny/allow rules, enable parental controls, or configure threat intelligence feeds.",
  },
  {
    number: "04",
    icon: ShieldCheck,
    title: "Browse Protected",
    description:
      "DNS queries to ad and tracking domains are silently blocked. Enjoy faster browsing, lower data usage, and complete privacy across all devices.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-y border-border bg-secondary/30 py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-medium text-primary uppercase tracking-widest">
            How It Works
          </span>
          <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-5xl font-mono">
            Up and running in minutes
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground leading-relaxed">
            Whether you self-host on a Raspberry Pi or use our cloud DNS, setup is straightforward and fast.
          </p>
        </div>

        <div className="mt-16 grid gap-px bg-border md:grid-cols-4 rounded-xl overflow-hidden border border-border">
          {steps.map((step) => (
            <div key={step.number} className="relative flex flex-col bg-card p-8">
              <span className="mb-6 text-5xl font-bold text-border/60 font-mono">
                {step.number}
              </span>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <step.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
