"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import {
  Shield,
  ArrowRight,
  ArrowLeft,
  Check,
  Server,
  Cloud,
  Copy,
  Terminal,
  Wifi,
  Globe,
  Smartphone,
  Laptop,
  Router,
  Download,
  CheckCircle2,
  ExternalLink,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"

function OnboardingContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const mode = searchParams.get("mode") as "self-hosted" | "cloud" | null
  const [currentStep, setCurrentStep] = useState(0)
  const [copied, setCopied] = useState(false)
  const [settings, setSettings] = useState({
    blockAds: true,
    blockTrackers: true,
    blockMalware: true,
    blockAdult: false,
    blockSocial: false,
    customDns: "",
    deviceName: "",
  })

  const selfHostedSteps = [
    { title: "Flash SD Card", icon: Download },
    { title: "Connect Pi", icon: Router },
    { title: "Configure Filters", icon: Shield },
    { title: "Set DNS", icon: Wifi },
    { title: "Complete", icon: CheckCircle2 },
  ]

  const cloudSteps = [
    { title: "Name Your Profile", icon: Laptop },
    { title: "Configure Filters", icon: Shield },
    { title: "Setup DNS", icon: Globe },
    { title: "Connect Devices", icon: Smartphone },
    { title: "Complete", icon: CheckCircle2 },
  ]

  const steps = mode === "self-hosted" ? selfHostedSteps : cloudSteps
  const totalSteps = steps.length
  const progress = ((currentStep + 1) / totalSteps) * 100

  function handleCopy(text: string) {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function handleNext() {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      router.push("/dashboard")
    }
  }

  function handleBack() {
    if (currentStep > 0) setCurrentStep(currentStep - 1)
  }

  if (!mode) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-muted-foreground">No deployment mode selected.</p>
          <Link href="/signup" className="mt-4 inline-block text-primary hover:underline">
            Go back to sign up
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Top bar */}
      <header className="border-b border-border bg-card/50 backdrop-blur-xl">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Shield className="h-4.5 w-4.5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground font-mono">
              ShieldBlock
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-muted-foreground sm:inline">
              {mode === "self-hosted" ? "Self-Hosted Setup" : "Cloud DNS Setup"}
            </span>
            <div className="flex h-7 items-center gap-1.5 rounded-full border border-border bg-secondary px-3">
              {mode === "self-hosted" ? (
                <Server className="h-3.5 w-3.5 text-primary" />
              ) : (
                <Cloud className="h-3.5 w-3.5 text-primary" />
              )}
              <span className="text-xs font-medium text-foreground">
                {mode === "self-hosted" ? "Self-Hosted" : "Cloud"}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Progress */}
      <div className="mx-auto w-full max-w-4xl px-6 pt-6">
        <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
          <span>Step {currentStep + 1} of {totalSteps}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <Progress value={progress} className="h-1.5" />

        {/* Step indicators */}
        <div className="mt-6 flex items-center justify-between">
          {steps.map((step, i) => (
            <div key={step.title} className="flex flex-col items-center gap-1.5">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full transition-all ${
                  i < currentStep
                    ? "bg-primary text-primary-foreground"
                    : i === currentStep
                    ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {i < currentStep ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <step.icon className="h-4 w-4" />
                )}
              </div>
              <span
                className={`hidden text-[10px] sm:block ${
                  i <= currentStep ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {step.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-6 py-10">
        <div className="flex-1">
          {/* SELF-HOSTED STEPS */}
          {mode === "self-hosted" && currentStep === 0 && (
            <SelfHostedStep1 onCopy={handleCopy} copied={copied} />
          )}
          {mode === "self-hosted" && currentStep === 1 && <SelfHostedStep2 />}
          {mode === "self-hosted" && currentStep === 2 && (
            <FilterConfigStep settings={settings} setSettings={setSettings} />
          )}
          {mode === "self-hosted" && currentStep === 3 && (
            <SelfHostedStep4 onCopy={handleCopy} copied={copied} />
          )}
          {mode === "self-hosted" && currentStep === 4 && <CompleteStep mode="self-hosted" />}

          {/* CLOUD STEPS */}
          {mode === "cloud" && currentStep === 0 && (
            <CloudStep1 settings={settings} setSettings={setSettings} />
          )}
          {mode === "cloud" && currentStep === 1 && (
            <FilterConfigStep settings={settings} setSettings={setSettings} />
          )}
          {mode === "cloud" && currentStep === 2 && (
            <CloudStep3 onCopy={handleCopy} copied={copied} />
          )}
          {mode === "cloud" && currentStep === 3 && <CloudStep4 />}
          {mode === "cloud" && currentStep === 4 && <CompleteStep mode="cloud" />}
        </div>

        {/* Navigation */}
        <div className="mt-10 flex items-center justify-between border-t border-border pt-6">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={currentStep === 0}
            className="gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <Button
            onClick={handleNext}
            className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {currentStep === totalSteps - 1 ? "Go to Dashboard" : "Continue"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

/* ===== Self-Hosted Steps ===== */

function SelfHostedStep1({ onCopy, copied }: { onCopy: (t: string) => void; copied: boolean }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground font-mono">Flash the ShieldBlock image</h2>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        Download the ShieldBlock image and flash it to your Raspberry Pi SD card using Raspberry Pi Imager or Balena Etcher.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 mb-4">
            <Download className="h-5 w-5 text-primary" />
          </div>
          <h3 className="font-semibold text-foreground">Option A: Download Image</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Download the pre-built .img file and flash with your preferred tool.
          </p>
          <Button variant="outline" className="mt-4 w-full gap-2 border-border text-foreground hover:bg-secondary">
            <Download className="h-4 w-4" />
            Download .img (2.1 GB)
          </Button>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 mb-4">
            <Terminal className="h-5 w-5 text-primary" />
          </div>
          <h3 className="font-semibold text-foreground">Option B: Install Script</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Run a single command on an existing Raspberry Pi OS installation.
          </p>
          <div className="mt-4 flex items-center gap-2 rounded-lg border border-border bg-background p-3 font-mono text-xs text-foreground">
            <code className="flex-1 overflow-x-auto">curl -sSL https://get.shieldblock.io | bash</code>
            <button
              onClick={() => onCopy("curl -sSL https://get.shieldblock.io | bash")}
              className="shrink-0 text-muted-foreground hover:text-foreground"
              aria-label="Copy command"
            >
              {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-xl border border-border bg-secondary/30 p-5">
        <h4 className="text-sm font-semibold text-foreground">Requirements</h4>
        <ul className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
          <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-primary" /> Raspberry Pi 3B+, 4, or 5</li>
          <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-primary" /> MicroSD card (8 GB minimum)</li>
          <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-primary" /> Ethernet connection (recommended) or WiFi</li>
          <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-primary" /> Power supply (5V/3A for Pi 4/5)</li>
        </ul>
      </div>
    </div>
  )
}

function SelfHostedStep2() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground font-mono">Connect your Raspberry Pi</h2>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        Insert the flashed SD card, connect Ethernet and power. ShieldBlock will boot and configure automatically.
      </p>

      <div className="mt-8 flex flex-col gap-6">
        {[
          { step: "1", title: "Insert the SD card", desc: "Insert the flashed MicroSD card into your Raspberry Pi." },
          { step: "2", title: "Connect Ethernet", desc: "Plug an Ethernet cable from your router to the Raspberry Pi. WiFi setup is also available after boot." },
          { step: "3", title: "Power on", desc: "Connect the power supply. The green LED will blink during boot. Wait about 2 minutes for first-time setup." },
          { step: "4", title: "Find your Pi", desc: "ShieldBlock will be accessible at http://shieldblock.local or check your router's DHCP client list for the assigned IP." },
        ].map((item) => (
          <div key={item.step} className="flex items-start gap-4 rounded-xl border border-border bg-card p-5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
              {item.step}
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{item.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-primary/30 bg-primary/5 p-5">
        <div className="flex items-center gap-2 text-sm font-medium text-primary">
          <Wifi className="h-4 w-4" />
          Waiting for connection...
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Once your Pi is connected, ShieldBlock will detect it automatically. You can proceed while it boots.
        </p>
      </div>
    </div>
  )
}

function SelfHostedStep4({ onCopy, copied }: { onCopy: (t: string) => void; copied: boolean }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground font-mono">Set your DNS</h2>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        Point your router or individual devices to ShieldBlock as the DNS server.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-primary bg-card p-6">
          <div className="mb-3 flex items-center gap-2">
            <Router className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-foreground">Router (Recommended)</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Set the Pi IP as your DNS server in your router settings. This protects all devices automatically.
          </p>
          <div className="flex flex-col gap-2">
            <Label className="text-xs text-muted-foreground">Primary DNS</Label>
            <div className="flex items-center gap-2 rounded-lg border border-border bg-background p-3 font-mono text-sm text-foreground">
              <code className="flex-1">192.168.1.100</code>
              <button onClick={() => onCopy("192.168.1.100")} className="text-muted-foreground hover:text-foreground" aria-label="Copy DNS address">
                {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <div className="mb-3 flex items-center gap-2">
            <Laptop className="h-5 w-5 text-muted-foreground" />
            <h3 className="font-semibold text-foreground">Per Device</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Configure DNS on individual devices if you cannot change router settings.
          </p>
          <div className="flex flex-col gap-3">
            {["Windows", "macOS", "Linux", "Android", "iOS"].map((os) => (
              <button
                key={os}
                className="flex items-center justify-between rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground hover:bg-secondary transition-colors"
              >
                {os}
                <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ===== Cloud Steps ===== */

function CloudStep1({
  settings,
  setSettings,
}: {
  settings: { deviceName: string; [key: string]: string | boolean }
  setSettings: (s: typeof settings) => void
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground font-mono">Name your profile</h2>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        Create a filtering profile. You can create multiple profiles for different devices or use cases.
      </p>

      <div className="mt-8 rounded-xl border border-border bg-card p-6">
        <Label htmlFor="profile-name" className="text-foreground">Profile name</Label>
        <Input
          id="profile-name"
          placeholder="e.g., Home Network, Office, Mobile"
          className="mt-2 bg-background border-border text-foreground placeholder:text-muted-foreground"
          value={settings.deviceName}
          onChange={(e) => setSettings({ ...settings, deviceName: e.target.value })}
        />
        <p className="mt-2 text-xs text-muted-foreground">
          This helps you identify this profile in your dashboard.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {[
          { name: "Home Network", desc: "Block ads and trackers for the whole family", icon: Router },
          { name: "Work Profile", desc: "Focus mode with social media blocking", icon: Laptop },
          { name: "Mobile", desc: "Protect your phone on any network", icon: Smartphone },
        ].map((preset) => (
          <button
            key={preset.name}
            onClick={() => setSettings({ ...settings, deviceName: preset.name })}
            className={`rounded-xl border p-4 text-left transition-all ${
              settings.deviceName === preset.name
                ? "border-primary bg-primary/5"
                : "border-border bg-card hover:border-muted-foreground/30"
            }`}
          >
            <preset.icon className={`h-5 w-5 ${settings.deviceName === preset.name ? "text-primary" : "text-muted-foreground"}`} />
            <h4 className="mt-2 text-sm font-semibold text-foreground">{preset.name}</h4>
            <p className="mt-1 text-xs text-muted-foreground">{preset.desc}</p>
          </button>
        ))}
      </div>
    </div>
  )
}

function CloudStep3({ onCopy, copied }: { onCopy: (t: string) => void; copied: boolean }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground font-mono">Setup DNS</h2>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        Point your devices to ShieldBlock Cloud DNS using one of the methods below.
      </p>

      <div className="mt-8 flex flex-col gap-6">
        <div className="rounded-xl border border-primary bg-card p-6">
          <h3 className="font-semibold text-foreground mb-1">DNS-over-HTTPS (Recommended)</h3>
          <p className="text-sm text-muted-foreground mb-4">Most secure. Works in browsers and OS settings.</p>
          <div className="flex items-center gap-2 rounded-lg border border-border bg-background p-3 font-mono text-xs text-foreground">
            <code className="flex-1 overflow-x-auto">https://dns.shieldblock.io/dns-query/a1b2c3</code>
            <button onClick={() => onCopy("https://dns.shieldblock.io/dns-query/a1b2c3")} className="shrink-0 text-muted-foreground hover:text-foreground" aria-label="Copy URL">
              {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-semibold text-foreground mb-1">DNS-over-TLS</h3>
          <p className="text-sm text-muted-foreground mb-4">For Android Private DNS and advanced configurations.</p>
          <div className="flex items-center gap-2 rounded-lg border border-border bg-background p-3 font-mono text-xs text-foreground">
            <code className="flex-1 overflow-x-auto">a1b2c3.dns.shieldblock.io</code>
            <button onClick={() => onCopy("a1b2c3.dns.shieldblock.io")} className="shrink-0 text-muted-foreground hover:text-foreground" aria-label="Copy hostname">
              {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="font-semibold text-foreground mb-1">IPv4 Addresses</h3>
            <div className="mt-3 flex flex-col gap-2 font-mono text-sm text-foreground">
              <span>45.90.28.1</span>
              <span>45.90.30.1</span>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="font-semibold text-foreground mb-1">IPv6 Addresses</h3>
            <div className="mt-3 flex flex-col gap-2 font-mono text-sm text-foreground">
              <span>2a07:a8c0::a1:b2c3</span>
              <span>2a07:a8c1::a1:b2c3</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function CloudStep4() {
  const devices = [
    { name: "Android", desc: "Settings > Network > Private DNS" },
    { name: "iOS / iPadOS", desc: "Install DNS profile via Safari" },
    { name: "Windows", desc: "Settings > Network > DNS server" },
    { name: "macOS", desc: "System Settings > Network > DNS" },
    { name: "Linux", desc: "Use systemd-resolved or NetworkManager" },
    { name: "Router", desc: "Set as upstream DNS in router admin" },
  ]

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground font-mono">Connect your devices</h2>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        Follow the guide for each device or platform you want to protect.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {devices.map((device) => (
          <button
            key={device.name}
            className="flex items-center justify-between rounded-xl border border-border bg-card p-5 text-left hover:border-muted-foreground/30 transition-colors"
          >
            <div>
              <h3 className="font-semibold text-foreground">{device.name}</h3>
              <p className="mt-0.5 text-sm text-muted-foreground">{device.desc}</p>
            </div>
            <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground" />
          </button>
        ))}
      </div>
    </div>
  )
}

/* ===== Shared Steps ===== */

function FilterConfigStep({
  settings,
  setSettings,
}: {
  settings: { blockAds: boolean; blockTrackers: boolean; blockMalware: boolean; blockAdult: boolean; blockSocial: boolean; [key: string]: string | boolean }
  setSettings: (s: typeof settings) => void
}) {
  const filters = [
    { key: "blockAds" as const, title: "Ads & Banners", desc: "Block display ads, video ads, and pop-ups across all websites", recommended: true },
    { key: "blockTrackers" as const, title: "Trackers & Analytics", desc: "Prevent cross-site tracking, fingerprinting, and data collection scripts", recommended: true },
    { key: "blockMalware" as const, title: "Malware & Phishing", desc: "Block known malicious domains and phishing attempts", recommended: true },
    { key: "blockAdult" as const, title: "Adult Content", desc: "Filter adult and explicit content domains (parental controls)", recommended: false },
    { key: "blockSocial" as const, title: "Social Media Trackers", desc: "Block tracking pixels from Facebook, Twitter, LinkedIn, etc.", recommended: false },
  ]

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground font-mono">Configure filters</h2>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        Choose which categories to block. You can fine-tune these later from your dashboard.
      </p>

      <div className="mt-8 flex flex-col gap-4">
        {filters.map((filter) => (
          <div
            key={filter.key}
            className={`flex items-center justify-between rounded-xl border p-5 transition-all ${
              settings[filter.key] ? "border-primary bg-primary/5" : "border-border bg-card"
            }`}
          >
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-foreground">{filter.title}</h3>
                {filter.recommended && (
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                    Recommended
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{filter.desc}</p>
            </div>
            <Switch
              checked={settings[filter.key] as boolean}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, [filter.key]: checked })
              }
            />
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-border bg-secondary/30 p-5">
        <h4 className="text-sm font-semibold text-foreground">Active blocklists</h4>
        <p className="mt-1 text-xs text-muted-foreground">
          Based on your selection, ShieldBlock will use the following community-maintained blocklists:
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {settings.blockAds && <span className="rounded-full border border-border bg-card px-2.5 py-0.5 text-xs text-foreground">EasyList</span>}
          {settings.blockAds && <span className="rounded-full border border-border bg-card px-2.5 py-0.5 text-xs text-foreground">AdGuard DNS</span>}
          {settings.blockTrackers && <span className="rounded-full border border-border bg-card px-2.5 py-0.5 text-xs text-foreground">EasyPrivacy</span>}
          {settings.blockTrackers && <span className="rounded-full border border-border bg-card px-2.5 py-0.5 text-xs text-foreground">Fanboy Tracking</span>}
          {settings.blockMalware && <span className="rounded-full border border-border bg-card px-2.5 py-0.5 text-xs text-foreground">URLhaus</span>}
          {settings.blockMalware && <span className="rounded-full border border-border bg-card px-2.5 py-0.5 text-xs text-foreground">PhishTank</span>}
          {settings.blockAdult && <span className="rounded-full border border-border bg-card px-2.5 py-0.5 text-xs text-foreground">OISD NSFW</span>}
          {settings.blockSocial && <span className="rounded-full border border-border bg-card px-2.5 py-0.5 text-xs text-foreground">Fanboy Social</span>}
        </div>
      </div>
    </div>
  )
}

function CompleteStep({ mode }: { mode: "self-hosted" | "cloud" }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10">
        <CheckCircle2 className="h-10 w-10 text-primary" />
      </div>
      <h2 className="mt-6 text-3xl font-bold text-foreground font-mono">You are all set</h2>
      <p className="mt-3 max-w-lg text-sm text-muted-foreground leading-relaxed">
        {mode === "self-hosted"
          ? "Your ShieldBlock instance is configured and ready. DNS queries on your network will now be filtered through your Raspberry Pi."
          : "Your ShieldBlock Cloud DNS profile is active. Connect your devices to start filtering ads, trackers, and malware."}
      </p>

      <div className="mt-10 grid w-full max-w-lg gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-4 text-center">
          <span className="text-2xl font-bold text-primary font-mono">0</span>
          <p className="mt-1 text-xs text-muted-foreground">Queries blocked</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 text-center">
          <span className="text-2xl font-bold text-foreground font-mono">3</span>
          <p className="mt-1 text-xs text-muted-foreground">Blocklists active</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 text-center">
          <span className="text-2xl font-bold text-foreground font-mono">~150K</span>
          <p className="mt-1 text-xs text-muted-foreground">Domains filtered</p>
        </div>
      </div>

      <p className="mt-8 text-sm text-muted-foreground">
        Head to your dashboard to see real-time analytics and manage your filters.
      </p>
    </div>
  )
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    }>
      <OnboardingContent />
    </Suspense>
  )
}
