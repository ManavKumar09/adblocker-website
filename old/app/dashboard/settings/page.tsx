"use client"

import { useState } from "react"
import {
  Shield,
  Server,
  Globe,
  Bell,
  Key,
  RefreshCw,
  Download,
  Trash2,
  Copy,
  Check,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function SettingsPage() {
  const [copied, setCopied] = useState(false)
  const [settings, setSettings] = useState({
    enableFiltering: true,
    enableLogging: true,
    logRetention: "7",
    anonymizeLogs: false,
    blockingMode: "null",
    rateLimiting: true,
    dnssec: true,
    notifications: true,
    weeklyReport: true,
  })

  function handleCopy(text: string) {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground font-mono">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Configure your ShieldBlock instance and manage preferences.
        </p>
      </div>

      {/* General */}
      <section className="rounded-xl border border-border bg-card">
        <div className="border-b border-border px-6 py-4">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-semibold text-foreground">General</h2>
          </div>
        </div>
        <div className="flex flex-col divide-y divide-border">
          <SettingRow
            title="DNS Filtering"
            description="Enable or disable all DNS filtering. When off, all queries pass through."
          >
            <Switch
              checked={settings.enableFiltering}
              onCheckedChange={(v) => setSettings({ ...settings, enableFiltering: v })}
            />
          </SettingRow>
          <SettingRow
            title="DNSSEC Validation"
            description="Validate DNS responses using DNSSEC signatures."
          >
            <Switch
              checked={settings.dnssec}
              onCheckedChange={(v) => setSettings({ ...settings, dnssec: v })}
            />
          </SettingRow>
          <SettingRow
            title="Rate Limiting"
            description="Prevent DNS query flooding from misbehaving clients."
          >
            <Switch
              checked={settings.rateLimiting}
              onCheckedChange={(v) => setSettings({ ...settings, rateLimiting: v })}
            />
          </SettingRow>
          <SettingRow
            title="Blocking Mode"
            description="How ShieldBlock responds to blocked queries."
          >
            <select
              className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-foreground"
              value={settings.blockingMode}
              onChange={(e) => setSettings({ ...settings, blockingMode: e.target.value })}
            >
              <option value="null">Null response (0.0.0.0)</option>
              <option value="nxdomain">NXDOMAIN</option>
              <option value="refused">REFUSED</option>
            </select>
          </SettingRow>
        </div>
      </section>

      {/* Logging */}
      <section className="rounded-xl border border-border bg-card">
        <div className="border-b border-border px-6 py-4">
          <div className="flex items-center gap-2">
            <Server className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-semibold text-foreground">Logging</h2>
          </div>
        </div>
        <div className="flex flex-col divide-y divide-border">
          <SettingRow
            title="Query Logging"
            description="Log all DNS queries for analytics and debugging."
          >
            <Switch
              checked={settings.enableLogging}
              onCheckedChange={(v) => setSettings({ ...settings, enableLogging: v })}
            />
          </SettingRow>
          <SettingRow
            title="Anonymize Logs"
            description="Mask client IP addresses in logs for additional privacy."
          >
            <Switch
              checked={settings.anonymizeLogs}
              onCheckedChange={(v) => setSettings({ ...settings, anonymizeLogs: v })}
            />
          </SettingRow>
          <SettingRow
            title="Log Retention"
            description="How long to keep query logs before automatic deletion."
          >
            <select
              className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-foreground"
              value={settings.logRetention}
              onChange={(e) => setSettings({ ...settings, logRetention: e.target.value })}
            >
              <option value="1">1 day</option>
              <option value="7">7 days</option>
              <option value="30">30 days</option>
              <option value="90">90 days</option>
            </select>
          </SettingRow>
        </div>
      </section>

      {/* API / DNS Info */}
      <section className="rounded-xl border border-border bg-card">
        <div className="border-b border-border px-6 py-4">
          <div className="flex items-center gap-2">
            <Key className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-semibold text-foreground">API & DNS</h2>
          </div>
        </div>
        <div className="flex flex-col gap-4 p-6">
          <div>
            <Label className="text-foreground text-xs">API Token</Label>
            <div className="mt-1.5 flex items-center gap-2 rounded-lg border border-border bg-background p-3 font-mono text-xs text-foreground">
              <code className="flex-1">sb_live_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6</code>
              <button
                onClick={() => handleCopy("sb_live_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6")}
                className="shrink-0 text-muted-foreground hover:text-foreground"
                aria-label="Copy API token"
              >
                {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <div>
            <Label className="text-foreground text-xs">ShieldBlock DNS IP</Label>
            <div className="mt-1.5 flex items-center gap-2 rounded-lg border border-border bg-background p-3 font-mono text-xs text-foreground">
              <code className="flex-1">192.168.1.100</code>
              <button
                onClick={() => handleCopy("192.168.1.100")}
                className="shrink-0 text-muted-foreground hover:text-foreground"
                aria-label="Copy DNS IP"
              >
                {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Notifications */}
      <section className="rounded-xl border border-border bg-card">
        <div className="border-b border-border px-6 py-4">
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-semibold text-foreground">Notifications</h2>
          </div>
        </div>
        <div className="flex flex-col divide-y divide-border">
          <SettingRow
            title="Push Notifications"
            description="Get notified about blocking events and system alerts."
          >
            <Switch
              checked={settings.notifications}
              onCheckedChange={(v) => setSettings({ ...settings, notifications: v })}
            />
          </SettingRow>
          <SettingRow
            title="Weekly Report"
            description="Receive a weekly summary of your blocking activity via email."
          >
            <Switch
              checked={settings.weeklyReport}
              onCheckedChange={(v) => setSettings({ ...settings, weeklyReport: v })}
            />
          </SettingRow>
        </div>
      </section>

      {/* Danger zone */}
      <section className="rounded-xl border border-destructive/30 bg-card">
        <div className="border-b border-destructive/30 px-6 py-4">
          <h2 className="text-sm font-semibold text-destructive">Danger Zone</h2>
        </div>
        <div className="flex flex-col gap-4 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-foreground">Export Configuration</h3>
              <p className="text-xs text-muted-foreground">Download your settings and blocklists as a backup file.</p>
            </div>
            <Button variant="outline" size="sm" className="gap-2 border-border text-foreground hover:bg-secondary">
              <Download className="h-3.5 w-3.5" />
              Export
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-foreground">Flush DNS Cache</h3>
              <p className="text-xs text-muted-foreground">Clear all cached DNS responses.</p>
            </div>
            <Button variant="outline" size="sm" className="gap-2 border-border text-foreground hover:bg-secondary">
              <RefreshCw className="h-3.5 w-3.5" />
              Flush
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-destructive">Delete All Data</h3>
              <p className="text-xs text-muted-foreground">Permanently delete all logs, settings, and blocklists.</p>
            </div>
            <Button variant="destructive" size="sm" className="gap-2">
              <Trash2 className="h-3.5 w-3.5" />
              Delete
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

function SettingRow({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-between gap-4 px-6 py-4">
      <div>
        <h3 className="text-sm font-medium text-foreground">{title}</h3>
        <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
      </div>
      {children}
    </div>
  )
}
