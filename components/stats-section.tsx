"use client"

import { Award, Leaf, Target, Users } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { useLanguage } from "@/components/language-context"
import { api } from "@/lib/api"
import { formatCompact, formatWeight } from "@/lib/format"
import type { PlatformStats } from "@/lib/types"

/** Counts from 0 up to `value` once the section scrolls into view. */
function useCountUp(value: number, active: boolean, duration = 1200) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!active || value <= 0) {
      setDisplay(value > 0 && active ? value : 0)
      return
    }

    let frame = 0
    const start = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      // Ease-out so the numbers decelerate into their final value.
      setDisplay(Math.round(value * (1 - Math.pow(1 - progress, 3))))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [value, active, duration])

  return display
}

export function StatsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { t } = useLanguage()
  const [data, setData] = useState<PlatformStats | null>(null)

  useEffect(() => {
    api
      .stats()
      .then(setData)
      .catch(() => setData(null))
  }, [])

  const ready = isInView && data !== null
  const activeUsers = useCountUp(data?.activeUsers ?? 0, ready)
  const tasksCompleted = useCountUp(data?.tasksCompleted ?? 0, ready)
  const co2Saved = useCountUp(Math.round(data?.co2Saved ?? 0), ready)
  const treesPlanted = useCountUp(data?.treesPlanted ?? 0, ready)

  const stats = [
    {
      icon: Users,
      value: formatCompact(activeUsers),
      label: t.stats.activeUsers,
      color: "text-primary",
    },
    {
      icon: Target,
      value: formatCompact(tasksCompleted),
      label: t.stats.tasksCompleted,
      color: "text-secondary",
    },
    {
      icon: Leaf,
      value: formatWeight(co2Saved),
      label: t.stats.co2Saved,
      color: "text-success",
    },
    {
      icon: Award,
      value: formatCompact(treesPlanted),
      label: t.stats.treesPlanted,
      color: "text-accent",
    },
  ]

  return (
    <section ref={ref} className="py-16 md:py-24 border-y border-border bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div
                className={`inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-card border border-border mb-4 ${stat.color}`}
              >
                <stat.icon className="w-6 h-6 md:w-8 md:h-8" />
              </div>
              <div className="text-2xl md:text-4xl font-bold mb-2 tabular-nums">
                {data === null ? "—" : stat.value}
              </div>
              <div className="text-sm md:text-base text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
