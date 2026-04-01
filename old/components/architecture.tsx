import {
  Smartphone,
  Laptop,
  Tv,
  Wifi,
  Server,
  Shield,
  Globe,
  Ban,
  ArrowRight,
} from "lucide-react"

const layers = [
  {
    title: "Your Devices",
    description: "All connected devices on your network",
    items: [
      { icon: Smartphone, label: "Phones" },
      { icon: Laptop, label: "Laptops" },
      { icon: Tv, label: "Smart TVs" },
      { icon: Wifi, label: "IoT" },
    ],
    color: "text-muted-foreground",
    bg: "bg-secondary/50",
  },
  {
    title: "ShieldBlock DNS",
    description: "Intercepts and filters DNS queries",
    items: [
      { icon: Shield, label: "DNS Filter" },
      { icon: Ban, label: "Blocklists" },
      { icon: Server, label: "Rule Engine" },
    ],
    color: "text-primary",
    bg: "bg-primary/5",
  },
  {
    title: "Internet",
    description: "Only clean traffic reaches the web",
    items: [{ icon: Globe, label: "Clean DNS" }],
    color: "text-muted-foreground",
    bg: "bg-secondary/50",
  },
]

export function Architecture() {
  return (
    <section className="py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-medium text-primary uppercase tracking-widest">
            Architecture
          </span>
          <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-5xl font-mono">
            How DNS filtering works
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground leading-relaxed">
            ShieldBlock sits between your devices and the internet, filtering DNS queries
            at the network level before any connection is established.
          </p>
        </div>

        <div className="mt-16 flex flex-col items-center gap-0">
          {layers.map((layer, i) => (
            <div key={layer.title} className="w-full max-w-3xl">
              <div className={`rounded-xl border border-border ${layer.bg} p-6 md:p-8`}>
                <div className="mb-4 text-center">
                  <h3 className={`text-lg font-semibold ${i === 1 ? "text-primary" : "text-foreground"}`}>
                    {layer.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{layer.description}</p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-6">
                  {layer.items.map((item) => (
                    <div
                      key={item.label}
                      className="flex flex-col items-center gap-2"
                    >
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-card ${layer.color}`}
                      >
                        <item.icon className="h-5 w-5" />
                      </div>
                      <span className="text-xs text-muted-foreground">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {i < layers.length - 1 && (
                <div className="flex justify-center py-3">
                  <div className="flex flex-col items-center gap-1">
                    <div className="h-4 w-px bg-border" />
                    <ArrowRight className="h-4 w-4 rotate-90 text-primary" />
                    <div className="h-4 w-px bg-border" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="mt-20 mx-auto max-w-4xl">
          <h3 className="mb-8 text-center text-2xl font-bold text-foreground font-mono">
            With vs Without ShieldBlock
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-6">
              <h4 className="mb-4 text-lg font-semibold text-destructive">Without ShieldBlock</h4>
              <ul className="flex flex-col gap-3">
                {[
                  "High third-party domain connections",
                  "18-79% of mobile data consumed by ads",
                  "Visual clutter and slow page rendering",
                  "Continuous behavioral profiling",
                  "Cross-site tracking via cookie matching",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Ban className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-6">
              <h4 className="mb-4 text-lg font-semibold text-primary">With ShieldBlock</h4>
              <ul className="flex flex-col gap-3">
                {[
                  "Reduced HTTP requests by 30-40%",
                  "Significant bandwidth savings",
                  "Clean interface, faster page loads",
                  "Tracking exposure eliminated",
                  "Complete DNS-level privacy control",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Shield className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
