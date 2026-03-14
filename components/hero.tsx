"use client"

import Link from "next/link"
import { ArrowRight, Server, Cloud } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

function NetworkGrid() {
  const [nodes, setNodes] = useState<{ x: number; y: number; active: boolean }[]>([])

  useEffect(() => {
    const grid = []
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 12; col++) {
        grid.push({
          x: col * 60 + 30,
          y: row * 60 + 30,
          active: Math.random() > 0.6,
        })
      }
    }
    setNodes(grid)

    const interval = setInterval(() => {
      setNodes((prev) =>
        prev.map((n) => ({
          ...n,
          active: Math.random() > 0.55,
        }))
      )
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.07]"
      viewBox="0 0 720 480"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {nodes.map((node, i) => (
        <circle
          key={i}
          cx={node.x}
          cy={node.y}
          r={node.active ? 3 : 1.5}
          className={`transition-all duration-1000 ${
            node.active ? "fill-primary" : "fill-foreground"
          }`}
        />
      ))}
    </svg>
  )
}

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-44 md:pb-32">
      <NetworkGrid />

      {/* Glow effect */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 text-center">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 mb-8">
          <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs text-muted-foreground">
            Network-level DNS filtering for every device
          </span>
        </div>

        <h1 className="mx-auto max-w-5xl text-balance text-5xl font-bold tracking-tight text-foreground md:text-7xl lg:text-8xl font-mono">
          Block ads at the
          <br />
          <span className="text-primary">DNS level.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
          ShieldBlock is a self-hosted and cloud-based DNS filtering system that blocks
          ads, trackers, and malware before they ever reach your devices. Protect
          your entire network with a single deployment.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 px-8 text-base" asChild>
            <Link href="/signup">
              <Server className="h-4 w-4" />
              Self-Host Setup
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-secondary gap-2 px-8 text-base" asChild>
            <Link href="/signup">
              <Cloud className="h-4 w-4" />
              Try Cloud DNS
            </Link>
          </Button>
        </div>

        <div className="mt-16 flex items-center justify-center gap-8 text-muted-foreground flex-wrap">
          <div className="flex items-center gap-2 text-sm">
            <div className="h-2 w-2 rounded-full bg-primary" />
            <span>DNS-over-HTTPS</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="h-2 w-2 rounded-full bg-primary" />
            <span>DNS-over-TLS</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="h-2 w-2 rounded-full bg-primary" />
            <span>Raspberry Pi Ready</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="h-2 w-2 rounded-full bg-primary" />
            <span>DPDP Act Compliant</span>
          </div>
        </div>
      </div>
    </section>
  )
}
