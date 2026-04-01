"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Server,
  Cloud,
  Check,
  HardDrive,
  Globe,
  Lock,
  Zap,
  Users,
  Smartphone,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const modes = [
  {
    id: "self-hosted",
    icon: Server,
    title: "Self-Hosted",
    subtitle: "Raspberry Pi Deployment",
    description:
      "Deploy on your own hardware for complete data sovereignty. Your DNS queries never leave your local network. Ideal for privacy enthusiasts and home labs.",
    features: [
      { icon: HardDrive, text: "Runs on Raspberry Pi 3/4/5" },
      { icon: Lock, text: "Complete data sovereignty" },
      { icon: Zap, text: "Sub-millisecond DNS resolution" },
      { icon: Users, text: "Covers all LAN devices" },
    ],
    cta: "Download Image",
    ctaVariant: "default" as const,
    badges: ["Open Source", "Self-Hosted", "Zero Cloud"],
  },
  {
    id: "cloud",
    icon: Cloud,
    title: "Cloud DNS",
    subtitle: "Managed Filtering Service",
    description:
      "For users who cannot deploy hardware. Use our global DNS infrastructure with the same filtering rules. Works on mobile networks and while traveling.",
    features: [
      { icon: Globe, text: "Global Anycast DNS network" },
      { icon: Smartphone, text: "Works on cellular networks" },
      { icon: Zap, text: "DNS-over-HTTPS and TLS" },
      { icon: Users, text: "Per-device profiles" },
    ],
    cta: "Try Cloud Free",
    ctaVariant: "outline" as const,
    badges: ["Managed", "Global", "Mobile Ready"],
  },
]

export function DeploymentModes() {
  const [activeMode, setActiveMode] = useState("self-hosted")

  return (
    <section id="deployment" className="py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-medium text-primary uppercase tracking-widest">
            Deployment
          </span>
          <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-5xl font-mono">
            Choose your deployment
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground leading-relaxed">
            Self-host on a Raspberry Pi for maximum privacy, or use our cloud DNS for
            convenience. Both use the same powerful filtering engine.
          </p>
        </div>

        {/* Toggle */}
        <div className="mt-12 flex items-center justify-center">
          <div className="inline-flex rounded-xl border border-border bg-card p-1">
            {modes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => setActiveMode(mode.id)}
                className={`flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium transition-all ${
                  activeMode === mode.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <mode.icon className="h-4 w-4" />
                {mode.title}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {modes.map((mode) => (
            <div
              key={mode.id}
              className={`rounded-2xl border p-8 transition-all ${
                activeMode === mode.id
                  ? "border-primary bg-card"
                  : "border-border bg-card/50 opacity-60"
              }`}
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <mode.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">{mode.title}</h3>
                  <p className="text-sm text-muted-foreground">{mode.subtitle}</p>
                </div>
              </div>

              <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                {mode.description}
              </p>

              <div className="mb-6 flex flex-wrap gap-2">
                {mode.badges.map((badge) => (
                  <span
                    key={badge}
                    className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              <div className="mb-8 flex flex-col gap-4">
                {mode.features.map((feature) => (
                  <div key={feature.text} className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <feature.icon className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm text-foreground">{feature.text}</span>
                  </div>
                ))}
              </div>

              <Button
                variant={mode.ctaVariant}
                className={`w-full gap-2 ${
                  mode.ctaVariant === "default"
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border-border text-foreground hover:bg-secondary"
                }`}
                asChild
              >
                <Link href="/signup">
                  {mode.cta}
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
