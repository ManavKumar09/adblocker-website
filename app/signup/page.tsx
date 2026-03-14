"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  Shield,
  Mail,
  Lock,
  User,
  ArrowRight,
  Server,
  Cloud,
  Eye,
  EyeOff,
  Github,
  Check,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type DeploymentMode = "self-hosted" | "cloud" | null

export default function SignUpPage() {
  const router = useRouter()
  const [step, setStep] = useState<1 | 2>(1)
  const [deploymentMode, setDeploymentMode] = useState<DeploymentMode>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (step === 1) {
      setStep(2)
      return
    }
    if (!deploymentMode) return
    setIsSubmitting(true)
    setTimeout(() => {
      router.push(`/onboarding?mode=${deploymentMode}`)
    }, 800)
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Left panel - form */}
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-20">
        <div className="mx-auto w-full max-w-md">
          {/* Logo */}
          <Link href="/" className="mb-12 flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Shield className="h-4.5 w-4.5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground font-mono">
              ShieldBlock
            </span>
          </Link>

          {/* Progress indicator */}
          <div className="mb-8 flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                  step >= 1
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {step > 1 ? <Check className="h-3.5 w-3.5" /> : "1"}
              </div>
              <span className={`text-sm ${step >= 1 ? "text-foreground" : "text-muted-foreground"}`}>
                Account
              </span>
            </div>
            <div className="h-px flex-1 bg-border" />
            <div className="flex items-center gap-2">
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                  step >= 2
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                2
              </div>
              <span className={`text-sm ${step >= 2 ? "text-foreground" : "text-muted-foreground"}`}>
                Deployment
              </span>
            </div>
          </div>

          {step === 1 ? (
            <>
              <h1 className="text-3xl font-bold tracking-tight text-foreground font-mono">
                Create your account
              </h1>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Start protecting your network in under 5 minutes.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
                {/* OAuth */}
                <div className="flex flex-col gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full gap-2 border-border text-foreground hover:bg-secondary"
                  >
                    <Github className="h-4 w-4" />
                    Continue with GitHub
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full gap-2 border-border text-foreground hover:bg-secondary"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Continue with Google
                  </Button>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      or continue with email
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="name" className="text-foreground">Full name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Manthan Deshpande"
                      className="pl-10 bg-card border-border text-foreground placeholder:text-muted-foreground"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="email" className="text-foreground">Email address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      className="pl-10 bg-card border-border text-foreground placeholder:text-muted-foreground"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="password" className="text-foreground">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Min. 8 characters"
                      className="pl-10 pr-10 bg-card border-border text-foreground placeholder:text-muted-foreground"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                      minLength={8}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <Button type="submit" className="mt-2 w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
            </>
          ) : (
            <>
              <button
                onClick={() => setStep(1)}
                className="mb-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {"<- Back to account details"}
              </button>
              <h1 className="text-3xl font-bold tracking-tight text-foreground font-mono">
                Choose deployment
              </h1>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                How would you like to run ShieldBlock? You can always switch later.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
                <button
                  type="button"
                  onClick={() => setDeploymentMode("self-hosted")}
                  className={`flex items-start gap-4 rounded-xl border p-5 text-left transition-all ${
                    deploymentMode === "self-hosted"
                      ? "border-primary bg-primary/5"
                      : "border-border bg-card hover:border-muted-foreground/30"
                  }`}
                >
                  <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                    deploymentMode === "self-hosted" ? "bg-primary/15" : "bg-secondary"
                  }`}>
                    <Server className={`h-5 w-5 ${deploymentMode === "self-hosted" ? "text-primary" : "text-muted-foreground"}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">Self-Hosted</span>
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                        Free
                      </span>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      Deploy on your Raspberry Pi for complete data sovereignty. Your DNS queries never leave your network.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="rounded-full border border-border bg-secondary px-2.5 py-0.5 text-[10px] text-muted-foreground">
                        Raspberry Pi 3/4/5
                      </span>
                      <span className="rounded-full border border-border bg-secondary px-2.5 py-0.5 text-[10px] text-muted-foreground">
                        Open Source
                      </span>
                      <span className="rounded-full border border-border bg-secondary px-2.5 py-0.5 text-[10px] text-muted-foreground">
                        Zero Cloud
                      </span>
                    </div>
                  </div>
                  {deploymentMode === "self-hosted" && (
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary">
                      <Check className="h-3 w-3 text-primary-foreground" />
                    </div>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setDeploymentMode("cloud")}
                  className={`flex items-start gap-4 rounded-xl border p-5 text-left transition-all ${
                    deploymentMode === "cloud"
                      ? "border-primary bg-primary/5"
                      : "border-border bg-card hover:border-muted-foreground/30"
                  }`}
                >
                  <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                    deploymentMode === "cloud" ? "bg-primary/15" : "bg-secondary"
                  }`}>
                    <Cloud className={`h-5 w-5 ${deploymentMode === "cloud" ? "text-primary" : "text-muted-foreground"}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">Cloud DNS</span>
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                        From $3/mo
                      </span>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      Use our managed cloud DNS infrastructure. Works everywhere including mobile networks and while traveling.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="rounded-full border border-border bg-secondary px-2.5 py-0.5 text-[10px] text-muted-foreground">
                        Global Anycast
                      </span>
                      <span className="rounded-full border border-border bg-secondary px-2.5 py-0.5 text-[10px] text-muted-foreground">
                        DoH / DoT
                      </span>
                      <span className="rounded-full border border-border bg-secondary px-2.5 py-0.5 text-[10px] text-muted-foreground">
                        Mobile Ready
                      </span>
                    </div>
                  </div>
                  {deploymentMode === "cloud" && (
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary">
                      <Check className="h-3 w-3 text-primary-foreground" />
                    </div>
                  )}
                </button>

                <Button
                  type="submit"
                  disabled={!deploymentMode || isSubmitting}
                  className="mt-4 w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {isSubmitting ? "Creating account..." : "Create Account"}
                  {!isSubmitting && <ArrowRight className="h-4 w-4" />}
                </Button>
              </form>
            </>
          )}

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/signup" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>

          <p className="mt-4 text-center text-xs text-muted-foreground/60">
            By creating an account, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>

      {/* Right panel - decorative */}
      <div className="hidden flex-col justify-between border-l border-border bg-card p-12 lg:flex lg:w-[480px] xl:w-[560px]">
        <div />
        <div>
          <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <blockquote className="text-2xl font-bold leading-snug tracking-tight text-foreground font-mono text-balance">
            {"\"Block ads at the DNS level. Protect every device on your network with a single deployment.\""}
          </blockquote>
          <div className="mt-8 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <Check className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">49% faster page loads on average</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <Check className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">~30% data savings on mobile networks</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <Check className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">DPDP Act 2023 compliant by design</span>
            </div>
          </div>
        </div>
        <p className="text-xs text-muted-foreground/50">
          ShieldBlock - Network-level DNS ad blocking
        </p>
      </div>
    </div>
  )
}
