"use client"

import {
  ShieldCheck,
  Zap,
  Eye,
  Lock,
  Globe,
  Fingerprint,
  Server,
  Activity,
} from "lucide-react"

const features = [
  {
    icon: ShieldCheck,
    title: "DNS Filtering",
    description:
      "Intercept domain resolution requests at the network level. Known advertising and tracking domains resolve to null, preventing connections before they start.",
    tag: "Core",
    span: "lg:col-span-2",
  },
  {
    icon: Zap,
    title: "Script Blocking",
    description:
      "Block injected JavaScript ad scripts, analytics libraries, and tracking beacons before they execute in the browser.",
    tag: "Protection",
    span: "",
  },
  {
    icon: Eye,
    title: "Anti-Tracking",
    description:
      "Stop cross-site tracking mechanisms including cookie matching, pixel tracking, and fingerprinting scripts that profile your behavior across the web.",
    tag: "Privacy",
    span: "",
  },
  {
    icon: Lock,
    title: "Malware Protection",
    description:
      "Use real-time threat intelligence feeds to block malicious domains, phishing attempts, and cryptojacking scripts before they reach your network.",
    tag: "Security",
    span: "lg:col-span-2",
  },
  {
    icon: Globe,
    title: "Network-Wide Coverage",
    description:
      "Protect every device on your network with a single deployment. No per-device installs needed for phones, tablets, IoT devices, and smart TVs.",
    tag: "Network",
    span: "",
  },
  {
    icon: Fingerprint,
    title: "Privacy Compliance",
    description:
      "Designed with India's DPDP Act 2023 and IT Act 2000 in mind. User-controlled filtering is legally defensible under current privacy regulations.",
    tag: "Legal",
    span: "",
  },
  {
    icon: Server,
    title: "Self-Hosted Control",
    description:
      "Deploy on your own Raspberry Pi for complete data sovereignty. Your DNS queries never leave your network.",
    tag: "Hardware",
    span: "",
  },
  {
    icon: Activity,
    title: "Real-Time Analytics",
    description:
      "Monitor blocked queries, top domains, and network performance with an in-depth analytics dashboard. See what is tracked and blocked in real time.",
    tag: "Insights",
    span: "",
  },
]

export function Features() {
  return (
    <section id="features" className="py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-medium text-primary uppercase tracking-widest">
            Features
          </span>
          <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-5xl font-mono">
            Complete network protection
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground leading-relaxed">
            ShieldBlock combines DNS-level filtering, script blocking, and real-time
            threat intelligence to protect your entire network from a single node.
          </p>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className={`group relative rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:bg-secondary/50 ${feature.span}`}
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <feature.icon className="h-5 w-5" />
                </div>
                <span className="rounded-full border border-border bg-secondary px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                  {feature.tag}
                </span>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
