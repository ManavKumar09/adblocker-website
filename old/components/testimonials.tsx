const testimonials = [
  {
    quote:
      "ShieldBlock cut my monthly data usage by almost 35%. On a limited data plan in India, that translates to real savings every month.",
    name: "Arjun Mehta",
    role: "Engineering Student, Vidisha",
    initials: "AM",
  },
  {
    quote:
      "Deployed it on a Raspberry Pi 4 at home and forgot about it. My parents' phones load pages noticeably faster and they don't see a single ad anymore.",
    name: "Priya Sharma",
    role: "Software Developer, Bangalore",
    initials: "PS",
  },
  {
    quote:
      "The cloud DNS mode is perfect for when I'm traveling. Same protection as my home Pi-hole but accessible from any network.",
    name: "Rohit Patel",
    role: "Cybersecurity Analyst, Mumbai",
    initials: "RP",
  },
  {
    quote:
      "We deployed ShieldBlock across our small office network. The centralized analytics dashboard helps us understand traffic patterns and block threats proactively.",
    name: "Deepika Iyer",
    role: "IT Administrator, Chennai",
    initials: "DI",
  },
  {
    quote:
      "As a privacy advocate, I love that ShieldBlock is fully self-hosted. My DNS data never leaves my network. The DPDP Act compliance is a great bonus.",
    name: "Karan Singh",
    role: "Privacy Researcher, Delhi",
    initials: "KS",
  },
  {
    quote:
      "The live query log is addictive. Seeing exactly which domains are being blocked in real time really opens your eyes to how much tracking happens.",
    name: "Anita Deshmukh",
    role: "Data Scientist, Pune",
    initials: "AD",
  },
]

export function Testimonials() {
  return (
    <section className="py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-medium text-primary uppercase tracking-widest">
            Testimonials
          </span>
          <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-5xl font-mono">
            Trusted by privacy-first users
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground leading-relaxed">
            From home labs to enterprise networks, ShieldBlock protects thousands of
            devices across India.
          </p>
        </div>

        <div className="mt-16 columns-1 gap-6 md:columns-2 lg:columns-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="mb-6 break-inside-avoid rounded-xl border border-border bg-card p-6"
            >
              <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                {`"${t.quote}"`}
              </p>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold font-mono">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
