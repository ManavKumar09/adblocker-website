"use client"

import { useState, useEffect } from "react"
import {
  ShieldCheck,
  ShieldOff,
  Activity,
  Zap,
  TrendingUp,
  TrendingDown,
  Clock,
} from "lucide-react"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

/* ===== Mock Data ===== */

function generateHourlyData() {
  const data = []
  for (let i = 0; i < 24; i++) {
    const blocked = Math.floor(Math.random() * 800 + 200)
    const allowed = Math.floor(Math.random() * 2000 + 500)
    data.push({
      hour: `${i.toString().padStart(2, "0")}:00`,
      blocked,
      allowed,
      total: blocked + allowed,
    })
  }
  return data
}

const topBlockedDomains = [
  { domain: "ads.google.com", count: 2847 },
  { domain: "tracking.facebook.com", count: 1923 },
  { domain: "analytics.tiktok.com", count: 1456 },
  { domain: "pixel.adsafeprotected.com", count: 1102 },
  { domain: "cdn.doubleclick.net", count: 987 },
  { domain: "telemetry.microsoft.com", count: 843 },
  { domain: "ads.yahoo.com", count: 756 },
  { domain: "track.hubspot.com", count: 634 },
]

const queryTypes = [
  { name: "A (IPv4)", value: 58, color: "oklch(0.72 0.19 155)" },
  { name: "AAAA (IPv6)", value: 24, color: "oklch(0.6 0.118 184.704)" },
  { name: "CNAME", value: 12, color: "oklch(0.828 0.189 84.429)" },
  { name: "Other", value: 6, color: "oklch(0.398 0.07 227.392)" },
]

const recentQueries = [
  { time: "14:23:05", domain: "api.github.com", type: "A", status: "allowed", client: "192.168.1.42" },
  { time: "14:23:04", domain: "ads.google.com", type: "A", status: "blocked", client: "192.168.1.15" },
  { time: "14:23:03", domain: "cdn.jsdelivr.net", type: "AAAA", status: "allowed", client: "192.168.1.42" },
  { time: "14:23:02", domain: "tracking.facebook.com", type: "A", status: "blocked", client: "192.168.1.8" },
  { time: "14:23:01", domain: "fonts.googleapis.com", type: "A", status: "allowed", client: "192.168.1.15" },
  { time: "14:23:00", domain: "pixel.adsafeprotected.com", type: "CNAME", status: "blocked", client: "192.168.1.22" },
  { time: "14:22:59", domain: "vercel.com", type: "A", status: "allowed", client: "192.168.1.42" },
  { time: "14:22:58", domain: "analytics.tiktok.com", type: "A", status: "blocked", client: "192.168.1.8" },
]

/* ===== Component ===== */

export default function DashboardOverview() {
  const [hourlyData, setHourlyData] = useState(generateHourlyData)
  const [totalQueries, setTotalQueries] = useState(34892)
  const [blockedQueries, setBlockedQueries] = useState(12467)

  useEffect(() => {
    const interval = setInterval(() => {
      setTotalQueries((prev) => prev + Math.floor(Math.random() * 5 + 1))
      setBlockedQueries((prev) => prev + Math.floor(Math.random() * 3))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const blockPercentage = ((blockedQueries / totalQueries) * 100).toFixed(1)

  return (
    <div className="flex flex-col gap-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground font-mono">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Real-time overview of your network filtering activity.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Queries"
          value={totalQueries.toLocaleString()}
          change="+12.5%"
          trend="up"
          icon={Activity}
        />
        <StatCard
          title="Blocked"
          value={blockedQueries.toLocaleString()}
          change={`${blockPercentage}%`}
          trend="up"
          icon={ShieldCheck}
          accent
        />
        <StatCard
          title="Allowed"
          value={(totalQueries - blockedQueries).toLocaleString()}
          change="-3.2%"
          trend="down"
          icon={ShieldOff}
        />
        <StatCard
          title="Avg Response"
          value="4.2ms"
          change="-18%"
          trend="down"
          icon={Zap}
        />
      </div>

      {/* Charts row */}
      <div className="grid gap-6 xl:grid-cols-3">
        {/* Area chart - queries over time */}
        <div className="rounded-xl border border-border bg-card p-6 xl:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Queries over time</h3>
              <p className="text-xs text-muted-foreground">Last 24 hours</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                <span className="text-muted-foreground">Blocked</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full" style={{ background: "oklch(0.6 0.118 184.704)" }} />
                <span className="text-muted-foreground">Allowed</span>
              </div>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hourlyData}>
                <defs>
                  <linearGradient id="blockedGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.72 0.19 155)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="oklch(0.72 0.19 155)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="allowedGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.6 0.118 184.704)" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="oklch(0.6 0.118 184.704)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.20 0.01 160)" />
                <XAxis
                  dataKey="hour"
                  tick={{ fontSize: 10, fill: "oklch(0.56 0.01 160)" }}
                  tickLine={false}
                  axisLine={false}
                  interval={3}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: "oklch(0.56 0.01 160)" }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    background: "oklch(0.11 0.005 160)",
                    border: "1px solid oklch(0.20 0.01 160)",
                    borderRadius: "8px",
                    color: "oklch(0.96 0 0)",
                    fontSize: "12px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="allowed"
                  stroke="oklch(0.6 0.118 184.704)"
                  fill="url(#allowedGrad)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="blocked"
                  stroke="oklch(0.72 0.19 155)"
                  fill="url(#blockedGrad)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie chart - query types */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="text-sm font-semibold text-foreground">Query Types</h3>
          <p className="text-xs text-muted-foreground">Distribution by record type</p>
          <div className="mt-4 flex h-48 items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={queryTypes}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {queryTypes.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "oklch(0.11 0.005 160)",
                    border: "1px solid oklch(0.20 0.01 160)",
                    borderRadius: "8px",
                    color: "oklch(0.96 0 0)",
                    fontSize: "12px",
                  }}
                  formatter={(value: number) => [`${value}%`, ""]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            {queryTypes.map((type) => (
              <div key={type.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full" style={{ background: type.color }} />
                  <span className="text-xs text-muted-foreground">{type.name}</span>
                </div>
                <span className="text-xs font-medium text-foreground">{type.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid gap-6 xl:grid-cols-2">
        {/* Top blocked domains */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Top Blocked Domains</h3>
              <p className="text-xs text-muted-foreground">Most frequently blocked today</p>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topBlockedDomains} layout="vertical" margin={{ left: 0 }}>
                <CartesianGrid horizontal={false} stroke="oklch(0.20 0.01 160)" strokeDasharray="3 3" />
                <XAxis
                  type="number"
                  tick={{ fontSize: 10, fill: "oklch(0.56 0.01 160)" }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="domain"
                  tick={{ fontSize: 10, fill: "oklch(0.56 0.01 160)" }}
                  tickLine={false}
                  axisLine={false}
                  width={160}
                />
                <Tooltip
                  contentStyle={{
                    background: "oklch(0.11 0.005 160)",
                    border: "1px solid oklch(0.20 0.01 160)",
                    borderRadius: "8px",
                    color: "oklch(0.96 0 0)",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="count" fill="oklch(0.72 0.19 155)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent query log */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Recent Queries</h3>
              <p className="text-xs text-muted-foreground">Live DNS query log</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              Live
            </div>
          </div>

          <div className="flex flex-col gap-2">
            {recentQueries.map((q, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-lg bg-secondary/50 px-3 py-2"
              >
                <div
                  className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                    q.status === "blocked" ? "bg-destructive" : "bg-primary"
                  }`}
                />
                <span className="w-16 shrink-0 font-mono text-[10px] text-muted-foreground">
                  {q.time}
                </span>
                <span className="flex-1 truncate text-xs text-foreground">
                  {q.domain}
                </span>
                <span className="hidden shrink-0 text-[10px] text-muted-foreground sm:inline">
                  {q.client}
                </span>
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${
                    q.status === "blocked"
                      ? "bg-destructive/10 text-destructive"
                      : "bg-primary/10 text-primary"
                  }`}
                >
                  {q.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ===== Sub-Components ===== */

function StatCard({
  title,
  value,
  change,
  trend,
  icon: Icon,
  accent,
}: {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  icon: React.ElementType
  accent?: boolean
}) {
  return (
    <div className={`rounded-xl border p-5 ${accent ? "border-primary bg-primary/5" : "border-border bg-card"}`}>
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{title}</span>
        <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${accent ? "bg-primary/15" : "bg-secondary"}`}>
          <Icon className={`h-4 w-4 ${accent ? "text-primary" : "text-muted-foreground"}`} />
        </div>
      </div>
      <div className="mt-3 flex items-end gap-2">
        <span className="text-2xl font-bold text-foreground font-mono">{value}</span>
        <span
          className={`flex items-center gap-0.5 text-xs font-medium ${
            trend === "up" ? "text-primary" : "text-muted-foreground"
          }`}
        >
          {trend === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
          {change}
        </span>
      </div>
    </div>
  )
}
