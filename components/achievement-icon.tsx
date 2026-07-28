"use client"

import {
  Award,
  Bike,
  CalendarCheck,
  Crown,
  Droplets,
  Flame,
  Footprints,
  Gift,
  Recycle,
  ShoppingBag,
  Sparkles,
  Sprout,
  Target,
  Trophy,
  Zap,
  type LucideIcon,
} from "lucide-react"

/**
 * The API stores a lucide icon name per achievement. Tree-shaking means we
 * cannot look icons up dynamically, so the badge icons are mapped explicitly.
 */
const iconMap: Record<string, LucideIcon> = {
  Award,
  Bike,
  CalendarCheck,
  Crown,
  Droplets,
  Flame,
  Footprints,
  Gift,
  Recycle,
  ShoppingBag,
  Sparkles,
  Sprout,
  Target,
  Trophy,
  Zap,
}

export function AchievementIcon({ name, className }: { name: string; className?: string }) {
  const Icon = iconMap[name] || Award
  return <Icon className={className} />
}

export const tierStyles: Record<string, string> = {
  bronze: "from-amber-500/20 to-amber-700/20 text-amber-600 dark:text-amber-400",
  silver: "from-slate-300/30 to-slate-500/30 text-slate-500 dark:text-slate-300",
  gold: "from-yellow-400/25 to-amber-500/25 text-yellow-600 dark:text-yellow-400",
}
