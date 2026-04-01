"use client"

import { useEffect, useState } from "react"
import { Ban, Eye, Gauge, Database, Shield, Activity } from "lucide-react"

function useCounter(target: number, duration: number = 2000) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true)
        }
      },
      { threshold: 0.3 }
    )

    const el = document.getElementById("live-stats")
    if (el) observer.observe(el)

    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    let start = 0
    const increment = target / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [started, target, duration])

  return count
}

function QueryLog() {
  const [queries, setQueries] = useState<
    { domain: string; type: string; status: "blocked" | "allowed"; time: string }[]
  >([])

  useEffect(() => {
    const domains = [
      { domain: "doubleclick.net", type: "A", status: "blocked" as const },
      { domain: "google-analytics.com", type: "CNAME", status: "blocked" as const },
      { domain: "github.com", type: "A", status: "allowed" as const },
      { domain: "facebook-tracker.com", type: "A", status: "blocked" as const },
      { domain: "cdn.example.com", type: "AAAA", status: "allowed" as const },
      { domain: "ads.yahoo.com", type: "A", status: "blocked" as const },
      { domain: "tracker.moatads.com", type: "CNAME", status: "blocked" as const },
      { domain: "nextjs.org", type: "A", status: "allowed" as const },
      { domain: "pixel.facebook.com", type: "A", status: "blocked" as const },
      { domain: "fonts.googleapis.com", type: "A", status: "allowed" as const },
      { domain: "ad.criteo.com", type: "A", status: "blocked" as const },
      { domain: "amplitude.com", type: "CNAME", status: "blocked" as const },
    ]

    const initial = domains.slice(0, 6).map((d, i) => ({
      ...d,
      time: `${i * 2}ms ago`,
    }))
    setQueries(initial)

    let index = 6
    const interval = setInterval(() => {
      const next = domains[index % domains.length]
      setQueries((prev) => [
        { ...next, time: "just now" },
        ...prev.slice(0, 5),
      ])
      index++
    }, 2500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="flex items-center gap-2 border-b border-border bg-secondary/50 px-4 py-3">
        <Activity className="h-4 w-4 text-primary" />
        <span className="text-sm font-medium text-foreground">Live Query Log</span>
        <span className="ml-auto h-2 w-2 rounded-full bg-primary animate-pulse" />
      </div>
      <div className="divide-y divide-border">
        {queries.map((q, i) => (
          <div
            key={`${q.domain}-${i}`}
            className="flex items-center gap-3 px-4 py-2.5 text-xs transition-opacity"
          >
            <span
              className={`inline-flex h-5 w-14 items-center justify-center rounded text-[10px] font-bold uppercase ${
                q.status === "blocked"
                  ? "bg-destructive/10 text-destructive"
                  : "bg-primary/10 text-primary"
              }`}
            >
              {q.status === "blocked" ? "DENY" : "ALLOW"}
            </span>
            <span className="font-mono text-foreground truncate flex-1">{q.domain}</span>
            <span className="text-muted-foreground shrink-0">{q.type}</span>
            <span className="text-muted-foreground shrink-0 w-16 text-right">{q.time}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function LiveStats() {
  const adsBlocked = useCounter(14832)
  const trackersBlocked = useCounter(3247)
  const pageSpeed = useCounter(49)
  const dataSaved = useCounter(2847)

  return (
    <section id="stats" className="border-y border-border bg-secondary/30 py-20 md:py-32">
      <div id="live-stats" className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-medium text-primary uppercase tracking-widest">
            Dashboard Preview
          </span>
          <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-5xl font-mono">
            See the difference in real time
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground leading-relaxed">
            Average stats from a single ShieldBlock node over 30 days of filtering network traffic.
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center rounded-xl border border-border bg-card p-6 text-center">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <Ban className="h-5 w-5 text-primary" />
              </div>
              <span className="text-3xl font-bold text-foreground font-mono">
                {adsBlocked.toLocaleString()}
              </span>
              <span className="mt-1 text-xs text-muted-foreground">Ads Blocked</span>
            </div>

            <div className="flex flex-col items-center rounded-xl border border-border bg-card p-6 text-center">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <Eye className="h-5 w-5 text-primary" />
              </div>
              <span className="text-3xl font-bold text-foreground font-mono">
                {trackersBlocked.toLocaleString()}
              </span>
              <span className="mt-1 text-xs text-muted-foreground">Trackers Stopped</span>
            </div>

            <div className="flex flex-col items-center rounded-xl border border-border bg-card p-6 text-center">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <Gauge className="h-5 w-5 text-primary" />
              </div>
              <span className="text-3xl font-bold text-foreground font-mono">
                {pageSpeed}%
              </span>
              <span className="mt-1 text-xs text-muted-foreground">Faster Browsing</span>
            </div>

            <div className="flex flex-col items-center rounded-xl border border-border bg-card p-6 text-center">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <Database className="h-5 w-5 text-primary" />
              </div>
              <span className="text-3xl font-bold text-foreground font-mono">
                {dataSaved.toLocaleString()}
              </span>
              <span className="mt-1 text-xs text-muted-foreground">MB Data Saved</span>
            </div>
          </div>

          {/* Live Query Log */}
          <QueryLog />
        </div>
      </div>
    </section>
  )
}
