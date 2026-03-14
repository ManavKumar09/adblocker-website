"use client"

import { useState } from "react"
import { Search, ArrowUpDown, ShieldCheck, ShieldOff, Globe } from "lucide-react"
import { Input } from "@/components/ui/input"

const allDomains = Array.from({ length: 40 }, (_, i) => {
  const domainNames = [
    "google.com", "facebook.com", "youtube.com", "amazon.com", "twitter.com",
    "ads.google.com", "tracking.facebook.com", "analytics.tiktok.com",
    "cdn.jsdelivr.net", "fonts.googleapis.com", "api.github.com",
    "doubleclick.net", "pixel.adsafeprotected.com", "telemetry.microsoft.com",
    "cdn.cloudflare.com", "vercel.com", "stackoverflow.com", "npmjs.com",
    "pagead2.googlesyndication.com", "connect.facebook.net",
    "securepubads.g.doubleclick.net", "reddit.com", "wikipedia.org",
    "linkedin.com", "cloudfront.net", "s3.amazonaws.com",
    "firebase.googleapis.com", "sentry.io", "hotjar.com", "mixpanel.com",
    "segment.io", "intercom.io", "crisp.chat", "zendesk.com", "stripe.com",
    "paypal.com", "razorpay.com", "freshdesk.com", "hubspot.com", "mailchimp.com",
  ]
  const domain = domainNames[i % domainNames.length]
  const isBlocked = domain.includes("ads") || domain.includes("tracking") || domain.includes("pixel") || domain.includes("doubleclick") || domain.includes("analytics") || domain.includes("telemetry") || domain.includes("syndication") || domain.includes("hotjar") || domain.includes("mixpanel") || domain.includes("segment")
  return {
    id: i,
    domain,
    queries: Math.floor(Math.random() * 5000 + 50),
    blocked: isBlocked ? Math.floor(Math.random() * 3000 + 100) : 0,
    status: isBlocked ? "blocked" : "allowed",
    lastSeen: `${Math.floor(Math.random() * 59 + 1)}m ago`,
  }
})

export default function DomainsPage() {
  const [search, setSearch] = useState("")
  const [sortBy, setSortBy] = useState<"queries" | "blocked">("queries")
  const [statusFilter, setStatusFilter] = useState<"all" | "blocked" | "allowed">("all")

  const filtered = allDomains
    .filter((d) => {
      const matchesSearch = d.domain.toLowerCase().includes(search.toLowerCase())
      const matchesStatus = statusFilter === "all" || d.status === statusFilter
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => b[sortBy] - a[sortBy])

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground font-mono">Domains</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          All domains queried through your ShieldBlock instance, sorted by activity.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search domains..."
            className="pl-10 bg-card border-border text-foreground placeholder:text-muted-foreground"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          {(["all", "blocked", "allowed"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                statusFilter === status
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
          {(["queries", "blocked"] as const).map((sort) => (
            <button
              key={sort}
              onClick={() => setSortBy(sort)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                sortBy === sort
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {sort}
            </button>
          ))}
        </div>
      </div>

      {/* Domain cards */}
      <div className="flex flex-col gap-2">
        {filtered.map((d) => (
          <div
            key={d.id}
            className="flex items-center gap-4 rounded-xl border border-border bg-card px-5 py-4 hover:bg-secondary/20 transition-colors"
          >
            <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
              d.status === "blocked" ? "bg-destructive/10" : "bg-primary/10"
            }`}>
              {d.status === "blocked" ? (
                <ShieldCheck className="h-4 w-4 text-destructive" />
              ) : (
                <Globe className="h-4 w-4 text-primary" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <span className="font-mono text-sm text-foreground">{d.domain}</span>
              <div className="mt-0.5 flex items-center gap-3 text-xs text-muted-foreground">
                <span>Last seen {d.lastSeen}</span>
              </div>
            </div>
            <div className="hidden items-center gap-6 text-right sm:flex">
              <div>
                <p className="text-sm font-medium text-foreground font-mono">{d.queries.toLocaleString()}</p>
                <p className="text-[10px] text-muted-foreground">queries</p>
              </div>
              {d.blocked > 0 && (
                <div>
                  <p className="text-sm font-medium text-destructive font-mono">{d.blocked.toLocaleString()}</p>
                  <p className="text-[10px] text-muted-foreground">blocked</p>
                </div>
              )}
            </div>
            <span
              className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-medium ${
                d.status === "blocked"
                  ? "bg-destructive/10 text-destructive"
                  : "bg-primary/10 text-primary"
              }`}
            >
              {d.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
