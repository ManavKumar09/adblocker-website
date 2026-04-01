"use client"

import { useState } from "react"
import { Plus, Trash2, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const initialAllowlist = [
  { id: 1, domain: "s.youtube.com", reason: "YouTube history sync", added: "2 days ago" },
  { id: 2, domain: "cdn.onesignal.com", reason: "Push notifications", added: "5 days ago" },
  { id: 3, domain: "graph.facebook.com", reason: "Facebook login", added: "1 week ago" },
  { id: 4, domain: "api.amplitude.com", reason: "App analytics", added: "1 week ago" },
  { id: 5, domain: "sentry.io", reason: "Error reporting", added: "2 weeks ago" },
]

export default function AllowlistPage() {
  const [allowlist, setAllowlist] = useState(initialAllowlist)
  const [newDomain, setNewDomain] = useState("")
  const [newReason, setNewReason] = useState("")
  const [search, setSearch] = useState("")

  function addDomain(e: React.FormEvent) {
    e.preventDefault()
    if (!newDomain.trim()) return
    setAllowlist([
      { id: Date.now(), domain: newDomain.trim(), reason: newReason.trim() || "Manual entry", added: "Just now" },
      ...allowlist,
    ])
    setNewDomain("")
    setNewReason("")
  }

  function removeDomain(id: number) {
    setAllowlist(allowlist.filter((d) => d.id !== id))
  }

  const filtered = allowlist.filter((d) =>
    d.domain.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground font-mono">Allowlist</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Domains on this list will never be blocked, even if they appear in a blocklist. {allowlist.length} entries.
        </p>
      </div>

      {/* Add form */}
      <form onSubmit={addDomain} className="rounded-xl border border-border bg-card p-5">
        <h3 className="text-sm font-semibold text-foreground mb-3">Add domain to allowlist</h3>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Input
            placeholder="domain.com"
            className="bg-background border-border text-foreground placeholder:text-muted-foreground sm:flex-1"
            value={newDomain}
            onChange={(e) => setNewDomain(e.target.value)}
          />
          <Input
            placeholder="Reason (optional)"
            className="bg-background border-border text-foreground placeholder:text-muted-foreground sm:w-48"
            value={newReason}
            onChange={(e) => setNewReason(e.target.value)}
          />
          <Button type="submit" size="sm" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus className="h-3.5 w-3.5" />
            Add
          </Button>
        </div>
      </form>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search allowlist..."
          className="pl-10 bg-card border-border text-foreground placeholder:text-muted-foreground"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* List */}
      <div className="flex flex-col gap-2">
        {filtered.length === 0 ? (
          <div className="rounded-xl border border-border bg-card py-12 text-center">
            <p className="text-sm text-muted-foreground">No domains found.</p>
          </div>
        ) : (
          filtered.map((entry) => (
            <div
              key={entry.id}
              className="flex items-center gap-4 rounded-xl border border-border bg-card px-5 py-4"
            >
              <div className="flex-1 min-w-0">
                <span className="font-mono text-sm text-foreground">{entry.domain}</span>
                <div className="mt-0.5 flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{entry.reason}</span>
                  <span>Added {entry.added}</span>
                </div>
              </div>
              <button
                onClick={() => removeDomain(entry.id)}
                className="shrink-0 text-muted-foreground hover:text-destructive transition-colors"
                aria-label={`Remove ${entry.domain}`}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
