"use client"

import { useState } from "react"
import { Plus, ExternalLink, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"

const blocklists = [
  { id: 1, name: "EasyList", url: "easylist.to", domains: 78453, enabled: true, category: "Ads", updated: "2 hours ago" },
  { id: 2, name: "EasyPrivacy", url: "easylist.to", domains: 45231, enabled: true, category: "Trackers", updated: "2 hours ago" },
  { id: 3, name: "AdGuard DNS filter", url: "adguard.com", domains: 62890, enabled: true, category: "Ads", updated: "4 hours ago" },
  { id: 4, name: "URLhaus Malware", url: "urlhaus.abuse.ch", domains: 12340, enabled: true, category: "Malware", updated: "1 hour ago" },
  { id: 5, name: "PhishTank", url: "phishtank.org", domains: 8920, enabled: true, category: "Phishing", updated: "3 hours ago" },
  { id: 6, name: "Fanboy Tracking", url: "fanboy.co.nz", domains: 34560, enabled: false, category: "Trackers", updated: "6 hours ago" },
  { id: 7, name: "Fanboy Social", url: "fanboy.co.nz", domains: 21340, enabled: false, category: "Social", updated: "6 hours ago" },
  { id: 8, name: "OISD Full", url: "oisd.nl", domains: 189000, enabled: false, category: "Multi", updated: "1 hour ago" },
  { id: 9, name: "Steven Black Hosts", url: "github.com", domains: 95230, enabled: false, category: "Ads", updated: "12 hours ago" },
  { id: 10, name: "Dan Pollock hosts", url: "someonewhocares.org", domains: 14210, enabled: false, category: "Ads", updated: "1 day ago" },
]

const categories = ["All", "Ads", "Trackers", "Malware", "Phishing", "Social", "Multi"]

export default function BlocklistsPage() {
  const [lists, setLists] = useState(blocklists)
  const [activeCategory, setActiveCategory] = useState("All")
  const [showAddForm, setShowAddForm] = useState(false)

  const filtered = activeCategory === "All" ? lists : lists.filter((l) => l.category === activeCategory)
  const totalDomains = lists.filter((l) => l.enabled).reduce((sum, l) => sum + l.domains, 0)
  const activeCount = lists.filter((l) => l.enabled).length

  function toggleList(id: number) {
    setLists((prev) =>
      prev.map((l) => (l.id === id ? { ...l, enabled: !l.enabled } : l))
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground font-mono">Blocklists</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your DNS blocklist subscriptions. {activeCount} active, {totalDomains.toLocaleString()} domains.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2 border-border text-foreground hover:bg-secondary">
            <RefreshCw className="h-3.5 w-3.5" />
            Update All
          </Button>
          <Button size="sm" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => setShowAddForm(!showAddForm)}>
            <Plus className="h-3.5 w-3.5" />
            Add List
          </Button>
        </div>
      </div>

      {/* Add form */}
      {showAddForm && (
        <div className="rounded-xl border border-primary bg-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-3">Add custom blocklist</h3>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Input placeholder="List name" className="bg-background border-border text-foreground placeholder:text-muted-foreground sm:w-48" />
            <Input placeholder="https://raw.githubusercontent.com/..." className="flex-1 bg-background border-border text-foreground placeholder:text-muted-foreground" />
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">Add</Button>
          </div>
        </div>
      )}

      {/* Category filters */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              activeCategory === cat
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="flex flex-col gap-3">
        {filtered.map((list) => (
          <div
            key={list.id}
            className={`flex items-center gap-4 rounded-xl border p-5 transition-all ${
              list.enabled ? "border-primary/30 bg-card" : "border-border bg-card/50"
            }`}
          >
            <Switch checked={list.enabled} onCheckedChange={() => toggleList(list.id)} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className={`font-semibold ${list.enabled ? "text-foreground" : "text-muted-foreground"}`}>
                  {list.name}
                </h3>
                <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] text-muted-foreground">
                  {list.category}
                </span>
              </div>
              <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                <span>{list.domains.toLocaleString()} domains</span>
                <span>Updated {list.updated}</span>
              </div>
            </div>
            <a
              href={`https://${list.url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 text-muted-foreground hover:text-foreground"
              aria-label={`Visit ${list.name}`}
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
