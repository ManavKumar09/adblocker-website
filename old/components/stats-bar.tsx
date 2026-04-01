"use client"

import { useEffect, useState, useRef } from "react"

const stats = [
  { target: 30, suffix: "%", label: "Less Data Usage", prefix: "~" },
  { target: 49, suffix: "%", label: "Faster Browsing", prefix: "" },
  { target: 10, suffix: "B+", label: "Queries Processed", prefix: "" },
  { target: 100, suffix: "%", label: "Open Source", prefix: "" },
]

function AnimatedStat({
  target,
  suffix,
  prefix,
  label,
}: {
  target: number
  suffix: string
  prefix: string
  label: string
}) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0
          const duration = 1500
          const increment = target / (duration / 16)
          const timer = setInterval(() => {
            start += increment
            if (start >= target) {
              setCount(target)
              clearInterval(timer)
            } else {
              setCount(Math.floor(start))
            }
          }, 16)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [target])

  return (
    <div ref={ref} className="flex flex-col items-center gap-1 px-6 py-6">
      <span className="text-3xl font-bold text-primary font-mono md:text-4xl">
        {prefix}{count}{suffix}
      </span>
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  )
}

export function StatsBar() {
  return (
    <section className="border-y border-border bg-secondary/50">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 divide-x divide-border md:grid-cols-4">
          {stats.map((stat) => (
            <AnimatedStat
              key={stat.label}
              target={stat.target}
              suffix={stat.suffix}
              prefix={stat.prefix}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
