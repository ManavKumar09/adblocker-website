import Link from "next/link"
import { ArrowRight, Shield, Server, Cloud } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CtaSection() {
  return (
    <section className="border-y border-border bg-secondary/30 py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary mb-8">
          <Shield className="h-8 w-8 text-primary-foreground" />
        </div>
        <h2 className="mx-auto max-w-3xl text-balance text-3xl font-bold tracking-tight text-foreground md:text-5xl font-mono">
          Take back control of your network
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-pretty text-muted-foreground leading-relaxed">
          Privacy and performance can coexist. Deploy ShieldBlock on your Raspberry Pi
          or use our cloud DNS to protect every device on your network.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 px-8 text-base" asChild>
            <Link href="/signup">
              <Server className="h-4 w-4" />
              Deploy Self-Hosted
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-secondary gap-2 px-8 text-base" asChild>
            <Link href="/signup">
              <Cloud className="h-4 w-4" />
              Try Cloud DNS Free
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
