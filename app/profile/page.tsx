"use client"

import { Suspense, useCallback, useEffect, useState } from "react"
import type React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { toast } from "sonner"
import {
  Calendar,
  Coins,
  Flame,
  Gift,
  Leaf,
  Loader2,
  Lock,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/components/language-context"
import { useAuth } from "@/components/auth-context"
import { initialsOf } from "@/components/user-menu"
import { AchievementIcon, tierStyles } from "@/components/achievement-icon"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { api } from "@/lib/api"
import { fill, formatDate, taskText } from "@/lib/format"
import type { Achievement, HistoryEntry, Order, UserStats } from "@/lib/types"

const localeByLanguage: Record<string, string> = {
  en: "en-GB",
  ru: "ru-RU",
  uz: "uz-UZ",
}

function StatCard({
  icon: Icon,
  label,
  value,
  hint,
  accent = "text-primary",
}: {
  icon: typeof Coins
  label: string
  value: string
  hint?: string
  accent?: string
}) {
  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-5">
        <div className={`rounded-xl border border-border bg-card p-3 ${accent}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="truncate text-2xl font-bold tabular-nums">{value}</p>
          {hint && <p className="truncate text-xs text-muted-foreground">{hint}</p>}
        </div>
      </CardContent>
    </Card>
  )
}

function ProfileContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { t, language } = useLanguage()
  const { user, loading, setUser } = useAuth()

  const [tab, setTab] = useState(searchParams.get("tab") || "overview")
  const [stats, setStats] = useState<UserStats | null>(null)
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [totalSpent, setTotalSpent] = useState(0)
  const [dataLoading, setDataLoading] = useState(true)

  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ firstName: "", lastName: "", address: "", age: "", status: "" })

  const locale = localeByLanguage[language] || "en-GB"

  // Anyone not signed in has nothing to see here.
  useEffect(() => {
    if (!loading && !user) router.replace("/login")
  }, [loading, user, router])

  const loadAll = useCallback(async () => {
    setDataLoading(true)
    try {
      const [statsData, historyData, achievementsData, ordersData] = await Promise.all([
        api.users.stats(),
        api.tasks.history(10),
        api.achievements.list(),
        api.store.orders(),
      ])
      setStats(statsData)
      setHistory(historyData)
      setAchievements(achievementsData.achievements)
      setOrders(ordersData.orders)
      setTotalSpent(ordersData.totalSpent)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not load your profile")
    } finally {
      setDataLoading(false)
    }
  }, [])

  useEffect(() => {
    if (user) loadAll()
  }, [user?.id, loadAll])

  useEffect(() => {
    if (user) {
      setForm({
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
        age: String(user.age),
        status: user.status,
      })
    }
  }, [user?.id])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const result = await api.users.update({
        firstName: form.firstName,
        lastName: form.lastName,
        address: form.address,
        age: Number(form.age),
        status: form.status as "student" | "pupil",
      })
      setUser(result.user)
      setEditing(false)
      toast.success(t.profile.updated)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Update failed")
    } finally {
      setSaving(false)
    }
  }

  if (loading || !user) {
    return (
      <div className="container mx-auto flex-1 px-4 py-16">
        <div className="mx-auto max-w-5xl space-y-6">
          <Skeleton className="h-32 w-full rounded-xl" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-24 w-full rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  const unlockedCount = achievements.filter((a) => a.unlocked).length
  const todayPercent =
    stats && stats.todayTotal > 0 ? (stats.todayCompleted / stats.todayTotal) * 100 : 0

  return (
    <div className="container mx-auto flex-1 px-4 py-10 md:py-16">
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Identity header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <Card className="overflow-hidden border-2">
            <div className="h-20 bg-gradient-to-r from-primary/20 via-secondary/15 to-accent/20" />
            <CardContent className="-mt-10 flex flex-col gap-4 p-6 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-end gap-4">
                <Avatar className="h-20 w-20 border-4 border-card shadow-md">
                  <AvatarImage src={user.avatar || undefined} alt={user.name} />
                  <AvatarFallback className="bg-primary/10 text-lg font-semibold text-primary">
                    {initialsOf(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="pb-1">
                  <h1 className="text-2xl font-bold">{user.name}</h1>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                  {user.createdAt && (
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5" />
                      {t.profile.memberSince} {formatDate(user.createdAt, locale)}
                    </p>
                  )}
                </div>
              </div>
              <Badge variant="secondary" className="w-fit gap-1.5 px-3 py-1.5">
                <Trophy className="h-3.5 w-3.5" />
                {t.profile.globalRank} #{user.rank}
              </Badge>
            </CardContent>
          </Card>
        </motion.div>

        {/* Impact summary */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard
            icon={Coins}
            label={t.profile.balance}
            value={user.ecoPoints.toLocaleString()}
            hint={`${t.profile.totalEarned}: ${user.totalPointsEarned.toLocaleString()}`}
          />
          <StatCard
            icon={Target}
            label={t.profile.tasksDone}
            value={user.completedTasks.toLocaleString()}
            accent="text-secondary"
          />
          <StatCard
            icon={Flame}
            label={t.profile.currentStreak}
            value={`${user.currentStreak} ${t.common.days}`}
            hint={`${t.profile.longestStreak}: ${user.longestStreak}`}
            accent="text-accent"
          />
          <StatCard
            icon={Leaf}
            label={t.profile.co2Saved}
            value={`${user.co2Saved} ${t.common.kg}`}
            hint={fill(t.profile.treesEquivalent, { count: stats?.treesEquivalent ?? 0 })}
            accent="text-success"
          />
          <StatCard
            icon={Trophy}
            label={t.profile.globalRank}
            value={`#${user.rank}`}
            hint={stats ? `${t.common.of} ${stats.totalUsers}` : undefined}
          />
          <StatCard
            icon={Sparkles}
            label={t.achievements.title}
            value={`${unlockedCount}/${achievements.length}`}
            accent="text-accent"
          />
        </div>

        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">{t.profile.overview}</TabsTrigger>
            <TabsTrigger value="achievements">{t.profile.achievementsTab}</TabsTrigger>
            <TabsTrigger value="orders">{t.profile.ordersTab}</TabsTrigger>
          </TabsList>

          {/* ---------------- Overview ---------------- */}
          <TabsContent value="overview" className="mt-6 space-y-6">
            {stats && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{t.profile.todayProgress}</CardTitle>
                  <CardDescription>
                    {fill(t.taskActions.todayProgress, {
                      done: stats.todayCompleted,
                      total: stats.todayTotal,
                    })}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Progress value={todayPercent} className="h-2.5" />
                  {stats.todayCompleted < stats.todayTotal && (
                    <Button asChild variant="outline" size="sm">
                      <Link href="/#tasks">{t.nav.tasks}</Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader className="flex-row items-center justify-between space-y-0">
                <CardTitle className="text-lg">{t.profile.personalInfo}</CardTitle>
                {!editing && (
                  <Button variant="outline" size="sm" onClick={() => setEditing(true)}>
                    {t.profile.editProfile}
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                {editing ? (
                  <form onSubmit={handleSave} className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">{t.register.firstName}</Label>
                        <Input
                          id="firstName"
                          value={form.firstName}
                          onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">{t.register.lastName}</Label>
                        <Input
                          id="lastName"
                          value={form.lastName}
                          onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">{t.register.address}</Label>
                      <Input
                        id="address"
                        value={form.address}
                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                        required
                      />
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="age">{t.register.age}</Label>
                        <Input
                          id="age"
                          type="number"
                          min="1"
                          max="120"
                          value={form.age}
                          onChange={(e) => setForm({ ...form, age: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="status">{t.register.status}</Label>
                        <Select
                          value={form.status}
                          onValueChange={(value) => setForm({ ...form, status: value })}
                        >
                          <SelectTrigger id="status">
                            <SelectValue placeholder={t.register.statusPlaceholder} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="student">{t.register.student}</SelectItem>
                            <SelectItem value="pupil">{t.register.pupil}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button type="submit" disabled={saving}>
                        {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {saving ? t.common.saving : t.common.save}
                      </Button>
                      <Button type="button" variant="ghost" onClick={() => setEditing(false)}>
                        {t.common.cancel}
                      </Button>
                    </div>
                  </form>
                ) : (
                  <dl className="grid gap-4 sm:grid-cols-2">
                    {[
                      [t.register.firstName, user.firstName],
                      [t.register.lastName, user.lastName],
                      [t.register.email, user.email],
                      [t.register.address, user.address],
                      [t.register.age, String(user.age)],
                      [
                        t.register.status,
                        user.status === "student" ? t.register.student : t.register.pupil,
                      ],
                    ].map(([label, value]) => (
                      <div key={label}>
                        <dt className="text-xs text-muted-foreground">{label}</dt>
                        <dd className="font-medium">{value}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t.profile.recentActivity}</CardTitle>
              </CardHeader>
              <CardContent>
                {dataLoading ? (
                  <div className="space-y-3">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <Skeleton key={i} className="h-14 w-full" />
                    ))}
                  </div>
                ) : history.length === 0 ? (
                  <p className="py-6 text-center text-sm text-muted-foreground">
                    {t.profile.noActivity}
                  </p>
                ) : (
                  <ul className="divide-y divide-border">
                    {history.map((entry) => (
                      <li key={entry.id} className="flex items-center gap-4 py-3">
                        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-muted">
                          <Image
                            src={entry.task.imageUrl || "/placeholder.svg"}
                            alt={entry.task.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-medium">{taskText(t, entry.task).title}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatDate(entry.completedAt, locale)}
                          </p>
                        </div>
                        <span className="shrink-0 font-semibold text-primary">
                          +{entry.pointsAwarded}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ---------------- Achievements ---------------- */}
          <TabsContent value="achievements" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t.achievements.title}</CardTitle>
                <CardDescription>
                  {fill(t.achievements.subtitle, {
                    unlocked: unlockedCount,
                    total: achievements.length,
                  })}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {dataLoading ? (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <Skeleton key={i} className="h-28 w-full rounded-xl" />
                    ))}
                  </div>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {achievements.map((achievement, index) => (
                      <motion.div
                        key={achievement.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.03 }}
                        className={`rounded-xl border p-4 transition-colors ${
                          achievement.unlocked
                            ? "border-primary/30 bg-gradient-to-br " +
                              (tierStyles[achievement.tier] || tierStyles.bronze)
                            : "border-border bg-muted/30"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`rounded-lg p-2 ${
                              achievement.unlocked
                                ? "bg-card/70"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {achievement.unlocked ? (
                              <AchievementIcon name={achievement.icon} className="h-5 w-5" />
                            ) : (
                              <Lock className="h-5 w-5" />
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-semibold text-foreground">{achievement.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {achievement.description}
                            </p>
                          </div>
                        </div>

                        <div className="mt-3 space-y-1.5">
                          <Progress
                            value={(achievement.progress / achievement.criteria.threshold) * 100}
                            className="h-1.5"
                          />
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>
                              {achievement.progress} {t.common.of} {achievement.criteria.threshold}
                            </span>
                            {achievement.unlocked && achievement.unlockedAt ? (
                              <span className="font-medium text-foreground">
                                {formatDate(achievement.unlockedAt, locale)}
                              </span>
                            ) : (
                              <span>
                                {fill(t.achievements.reward, {
                                  points: achievement.rewardPoints,
                                })}
                              </span>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ---------------- Orders ---------------- */}
          <TabsContent value="orders" className="mt-6">
            <Card>
              <CardHeader className="flex-row items-start justify-between space-y-0">
                <div>
                  <CardTitle className="text-lg">{t.orders.title}</CardTitle>
                  <CardDescription>{t.orders.subtitle}</CardDescription>
                </div>
                {orders.length > 0 && (
                  <Badge variant="secondary" className="gap-1.5">
                    <Coins className="h-3.5 w-3.5" />
                    {t.orders.totalSpent}: {totalSpent.toLocaleString()}
                  </Badge>
                )}
              </CardHeader>
              <CardContent>
                {dataLoading ? (
                  <div className="space-y-3">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <Skeleton key={i} className="h-16 w-full" />
                    ))}
                  </div>
                ) : orders.length === 0 ? (
                  <div className="py-10 text-center">
                    <Gift className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />
                    <p className="mb-4 text-sm text-muted-foreground">{t.orders.empty}</p>
                    <Button asChild variant="outline">
                      <Link href="/store">{t.orders.emptyAction}</Link>
                    </Button>
                  </div>
                ) : (
                  <ul className="divide-y divide-border">
                    {orders.map((order) => (
                      <li key={order.id} className="flex items-center gap-4 py-4">
                        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-muted">
                          <Image
                            src={order.productSnapshot.imageUrl || "/placeholder.svg"}
                            alt={order.productSnapshot.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-medium">{order.productSnapshot.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {t.orders.purchasedOn} {formatDate(order.createdAt, locale)}
                          </p>
                        </div>
                        <div className="shrink-0 text-right">
                          <p className="flex items-center gap-1 font-semibold text-primary">
                            <Coins className="h-4 w-4" />
                            {order.pricePaid}
                          </p>
                          {order.discount > 0 && (
                            <p className="text-xs text-muted-foreground line-through">
                              {order.unitPrice}
                            </p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default function ProfilePage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background to-muted/20">
      <Navbar />
      <Suspense
        fallback={
          <div className="container mx-auto flex-1 px-4 py-16">
            <Skeleton className="mx-auto h-64 max-w-5xl rounded-xl" />
          </div>
        }
      >
        <ProfileContent />
      </Suspense>
      <Footer />
    </div>
  )
}
