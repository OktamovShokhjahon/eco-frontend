"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Award, Crown, Medal, Sparkles } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useCallback, useEffect, useRef, useState } from "react"
import { useLanguage } from "@/components/language-context"
import { useAuth } from "@/components/auth-context"
import { initialsOf } from "@/components/user-menu"
import { api } from "@/lib/api"
import type { LeaderboardPeriod, LeaderboardUser } from "@/lib/types"

export function LeaderboardSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { t } = useLanguage()
  const { user } = useAuth()

  const [period, setPeriod] = useState<LeaderboardPeriod>("all")
  const [entries, setEntries] = useState<LeaderboardUser[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const periods: { id: LeaderboardPeriod; label: string }[] = [
    { id: "all", label: t.leaderboardFilters.allTime },
    { id: "month", label: t.leaderboardFilters.thisMonth },
    { id: "week", label: t.leaderboardFilters.thisWeek },
  ]

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await api.leaderboard.list(period, 10)
      setEntries(result.entries)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load the leaderboard")
    } finally {
      setLoading(false)
    }
  }, [period])

  // Refetch when the period changes or the signed-in user's points move.
  useEffect(() => {
    load()
  }, [load, user?.totalPointsEarned])

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-accent" />
      case 2:
      case 3:
        return <Medal className="h-5 w-5 text-muted-foreground" />
      default:
        return <Award className="h-5 w-5 text-muted-foreground" />
    }
  }

  return (
    <section id="leaderboard" ref={ref} className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Award className="h-4 w-4" />
            <span>{t.leaderboard.badge}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">{t.leaderboard.title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t.leaderboard.description}</p>

          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {periods.map((option) => (
              <Button
                key={option.id}
                size="sm"
                variant={period === option.id ? "default" : "outline"}
                onClick={() => setPeriod(option.id)}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                {t.leaderboard.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading && (
                <div className="space-y-4">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="flex items-center gap-4 rounded-lg border p-4">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-20" />
                      </div>
                      <Skeleton className="h-6 w-16" />
                    </div>
                  ))}
                </div>
              )}

              {!loading && error && (
                <div className="py-8 text-center">
                  <p className="mb-4 text-muted-foreground">{error}</p>
                  <Button variant="outline" onClick={load}>
                    {t.common.retry}
                  </Button>
                </div>
              )}

              {!loading && !error && entries.length === 0 && (
                <p className="py-10 text-center text-muted-foreground">
                  {t.leaderboardFilters.empty}
                </p>
              )}

              {!loading && !error && entries.length > 0 && (
                <div className="space-y-4">
                  {entries.map((entry, index) => (
                    <motion.div
                      key={`${period}-${entry.id}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.05 * index }}
                      className={`flex items-center gap-4 p-4 rounded-lg border transition-colors ${
                        entry.isCurrentUser
                          ? "border-primary bg-primary/10 ring-1 ring-primary/30"
                          : entry.rank <= 3
                            ? "bg-primary/5 border-primary/20"
                            : "bg-card hover:bg-muted/50 border-border"
                      }`}
                    >
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted text-sm font-bold">
                        {getRankIcon(entry.rank)}
                      </div>
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={entry.avatar || undefined} alt={entry.name} />
                        <AvatarFallback>{initialsOf(entry.name)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold truncate">{entry.name}</span>
                          {entry.isCurrentUser && (
                            <Badge variant="secondary" className="shrink-0">
                              {t.leaderboardFilters.you}
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {t.leaderboard.rank} #{entry.rank}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg text-primary">
                          {entry.ecoPoints.toLocaleString()}
                        </div>
                        <div className="text-xs text-muted-foreground lowercase">
                          {t.leaderboard.ecoPoints}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
