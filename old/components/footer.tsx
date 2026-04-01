import { Shield } from "lucide-react"

const footerLinks = {
  Product: ["Self-Hosted", "Cloud DNS", "Pricing", "Changelog", "Raspberry Pi Guide"],
  Resources: ["Documentation", "Blocklists", "API Reference", "Research Paper", "Community"],
  Legal: ["Privacy Policy", "Terms of Service", "DPDP Compliance", "IT Act Compliance", "Contact"],
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <a href="#" className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
                <Shield className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-foreground font-mono">
                ShieldBlock
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Self-hosted and cloud-based DNS filtering for privacy, performance,
              and security across every device on your network.
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="mb-4 text-sm font-semibold text-foreground">
                {category}
              </h4>
              <ul className="flex flex-col gap-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-xs text-muted-foreground">
            {"2026 ShieldBlock. Open source and privacy-first."}
          </p>
          <p className="text-xs text-muted-foreground">
            A project by Manthan Deshpande, Kaustubh Awasthi, and Aditi Agrawal
          </p>
        </div>
      </div>
    </footer>
  )
}
