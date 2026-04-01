"use client"

import { useState } from "react"
import {
  Search,
  Filter,
  Download,
  ShieldCheck,
  ShieldOff,
  Clock,
  RefreshCw,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const queries = Array.from({ length: 50 }, (_, i) => {
  const domains = [
    "api.github.com", "ads.google.com", "cdn.jsdelivr.net", "tracking.facebook.com",
    "fonts.googleapis.com", "pixel.adsafeprotected.com", "vercel.com",
    "analytics.tiktok.com", "cdn.cloudflare.com", "telemetry.microsoft.com",
    "connect.facebook.net", "www.google-analytics.com", "static.doubleclick.net",
    "securepubads.g.doubleclick.net", "pagead2.googlesyndication.com",
  ]
  const clients = ["192.168.1.8", "192.168.1.15", "192.168.1.22", "192.168.1.42", "192.168.1.100"]
  const types = ["A", "AAAA", "CNAME", "MX"]
  const domain = domains[Math.floor(Math.random() * domains.length)]
  const isBlocked = domain.includes("ads") || domain.includes("tracking") || domain.includes("pixel") || domain.includes("analytics") || domain.includes("telemetry") || domain.includes("doubleclick") || domain.includes("syndication")

  const h = 14 - Math.floor(i / 5)
  const m = 59 - (i * 7) % 60
  const s = 59 - (i * 13) % 60

  return {
    id: i,
    time: `${h.toString().padStart(2, "0")}:${Math.abs(m).toString().padStart(2, "0")}:${Math.abs(s).toString().padStart(2, "0")}`,
    domain,
    type: types[Math.floor(Math.random() * types.length)],
    status: isBlocked ? "blocked" : "allowed",
    client: clients[Math.floor(Math.random() * clients.length)],
    responseTime: `${(Math.random() * 15 + 1).toFixed(1)}ms`,
    list: isBlocked ? ["EasyList", "AdGuard DNS", "EasyPrivacy", "URLhaus"][Math.floor(Math.random() * 4)] : "-",
  }
})

export default function QueryLogPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "blocked" | "allowed">("all")

  const filtered = queries.filter((q) => {
    const matchesSearch = q.domain.toLowerCase().includes(search.toLowerCase()) || q.client.includes(search)
    const matchesStatus = statusFilter === "all" || q.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground font-mono">Query Log</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Complete DNS query history with filtering and search.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2 border-border text-foreground hover:bg-secondary">
            <Download className="h-3.5 w-3.5" />
            Export
          </Button>
          <Button variant="outline" size="sm" className="gap-2 border-border text-foreground hover:bg-secondary">
            <RefreshCw className="h-3.5 w-3.5" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search domains or IPs..."
            className="pl-10 bg-card border-border text-foreground placeholder:text-muted-foreground"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
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
      </div>

      {/* Summary */}
      <div className="grid gap-3 grid-cols-3">
        <div className="rounded-lg border border-border bg-card p-4">
          <span className="text-xs text-muted-foreground">Total Queries</span>
          <p className="mt-1 text-xl font-bold text-foreground font-mono">{filtered.length}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <span className="text-xs text-muted-foreground">Blocked</span>
          <p className="mt-1 text-xl font-bold text-primary font-mono">
            {filtered.filter((q) => q.status === "blocked").length}
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <span className="text-xs text-muted-foreground">Allowed</span>
          <p className="mt-1 text-xl font-bold text-foreground font-mono">
            {filtered.filter((q) => q.status === "allowed").length}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border bg-card overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="px-4 py-3 text-xs font-medium text-muted-foreground">Time</th>
              <th className="px-4 py-3 text-xs font-medium text-muted-foreground">Domain</th>
              <th className="px-4 py-3 text-xs font-medium text-muted-foreground">Type</th>
              <th className="px-4 py-3 text-xs font-medium text-muted-foreground">Client</th>
              <th className="px-4 py-3 text-xs font-medium text-muted-foreground">Response</th>
              <th className="px-4 py-3 text-xs font-medium text-muted-foreground">Status</th>
              <th className="px-4 py-3 text-xs font-medium text-muted-foreground">Blocklist</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((q) => (
              <tr key={q.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3 w-3" />
                    {q.time}
                  </div>
                </td>
                <td className="px-4 py-2.5 text-sm text-foreground">{q.domain}</td>
                <td className="px-4 py-2.5">
                  <span className="rounded bg-secondary px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">
                    {q.type}
                  </span>
                </td>
                <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">{q.client}</td>
                <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">{q.responseTime}</td>
                <td className="px-4 py-2.5">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${
                      q.status === "blocked"
                        ? "bg-destructive/10 text-destructive"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    {q.status === "blocked" ? (
                      <ShieldCheck className="h-2.5 w-2.5" />
                    ) : (
                      <ShieldOff className="h-2.5 w-2.5" />
                    )}
                    {q.status}
                  </span>
                </td>
                <td className="px-4 py-2.5 text-xs text-muted-foreground">{q.list}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
