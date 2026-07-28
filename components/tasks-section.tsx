"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Progress } from "@/components/ui/progress"
import {
  Check,
  Droplets,
  Flame,
  Leaf,
  Loader2,
  MapPin,
  RotateCcw,
  Sparkles,
  Utensils,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { useCallback, useEffect, useRef, useState } from "react"
import { toast } from "sonner"
import { useLanguage } from "@/components/language-context"
import { useAuth } from "@/components/auth-context"
import { api } from "@/lib/api"
import { fill, taskText } from "@/lib/format"
import type { Task } from "@/lib/types"

const categoryIcons = {
  energy: Flame,
  waste: Leaf,
  water: Droplets,
  transport: MapPin,
  food: Utensils,
}

export function TasksSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { t } = useLanguage()
  const { user, setUser } = useAuth()

  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pendingId, setPendingId] = useState<string | null>(null)

  const difficultyColors = {
    easy: "bg-success/10 text-success border-success/20",
    medium: "bg-accent/10 text-accent border-accent/20",
    hard: "bg-destructive/10 text-destructive border-destructive/20",
  }

  const loadTasks = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      setTasks(await api.tasks.list())
    } catch (err) {
      setError(err instanceof Error ? err.message : t.taskActions.loadError)
    } finally {
      setLoading(false)
    }
  }, [t.taskActions.loadError])

  // Reload whenever the signed-in identity changes, so the `completed` flags
  // always belong to the current user.
  useEffect(() => {
    loadTasks()
  }, [loadTasks, user?.id])

  const handleComplete = async (task: Task) => {
    if (!user) {
      toast.info(t.taskActions.signInToComplete)
      return
    }

    setPendingId(task.id)
    try {
      const result = await api.tasks.complete(task.id)
      setTasks((prev) => prev.map((x) => (x.id === task.id ? { ...x, completed: true } : x)))
      setUser(result.user)

      toast.success(fill(t.taskActions.earned, { points: result.pointsAwarded }))
      result.newAchievements.forEach((achievement) => {
        toast.success(fill(t.achievements.newBadge, { title: achievement.title }), {
          description: fill(t.achievements.reward, { points: achievement.rewardPoints }),
          duration: 6000,
        })
      })
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t.taskActions.loadError)
      // Our optimistic view may be stale (e.g. completed in another tab).
      loadTasks()
    } finally {
      setPendingId(null)
    }
  }

  const handleUndo = async (task: Task) => {
    setPendingId(task.id)
    try {
      const result = await api.tasks.uncomplete(task.id)
      setTasks((prev) => prev.map((x) => (x.id === task.id ? { ...x, completed: false } : x)))
      setUser(result.user)
      toast.info(t.taskActions.undone)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t.taskActions.loadError)
      loadTasks()
    } finally {
      setPendingId(null)
    }
  }

  const doneCount = tasks.filter((task) => task.completed).length
  const allDone = tasks.length > 0 && doneCount === tasks.length

  return (
    <section id="tasks" ref={ref} className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4" />
            <span>{t.tasks.badge}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">{t.tasks.title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t.tasks.description}</p>

          {/* Daily progress bar, only meaningful once signed in. */}
          {user && !loading && tasks.length > 0 && (
            <div className="mx-auto mt-8 max-w-md space-y-2">
              <div className="flex items-center justify-between text-sm font-medium">
                <span className="text-muted-foreground">
                  {fill(t.taskActions.todayProgress, { done: doneCount, total: tasks.length })}
                </span>
                <span className="text-primary">
                  {Math.round((doneCount / tasks.length) * 100)}%
                </span>
              </div>
              <Progress value={(doneCount / tasks.length) * 100} className="h-2" />
              {allDone && (
                <p className="pt-1 text-sm font-medium text-success">{t.taskActions.allDone}</p>
              )}
            </div>
          )}

          {!user && !loading && (
            <p className="mt-6 text-sm text-muted-foreground">
              <Link href="/login" className="font-medium text-primary hover:underline">
                {t.common.signIn}
              </Link>{" "}
              — {t.taskActions.signInToComplete}
            </p>
          )}
        </motion.div>

        {error && (
          <div className="mx-auto max-w-md text-center">
            <p className="mb-4 text-muted-foreground">{error}</p>
            <Button variant="outline" onClick={loadTasks}>
              {t.common.retry}
            </Button>
          </div>
        )}

        {loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="h-full overflow-hidden">
                <Skeleton className="h-48 w-full rounded-none" />
                <CardHeader className="space-y-3">
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                </CardHeader>
                <CardFooter>
                  <Skeleton className="h-10 w-full" />
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {!loading && !error && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task, index) => {
              const IconComponent = categoryIcons[task.category]
              const { title, description } = taskText(t, task)
              const isPending = pendingId === task.id

              return (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card
                    className={`h-full flex flex-col overflow-hidden hover:shadow-lg transition-all group ${
                      task.completed ? "border-success/40 bg-success/5" : ""
                    }`}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={task.imageUrl || "/placeholder.svg"}
                        alt={title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {task.completed && (
                        <div className="absolute right-3 top-3 rounded-full bg-success p-1.5 text-white shadow-lg">
                          <Check className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        {IconComponent && <IconComponent className="h-4 w-4 text-primary" />}
                        <Badge variant="outline" className={difficultyColors[task.difficulty]}>
                          {t.tasks[task.difficulty]}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl">{title}</CardTitle>
                      <CardDescription>{description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <Sparkles className="h-5 w-5 text-accent" />
                          <span className="font-semibold text-lg">
                            {task.points} {t.tasks.points}
                          </span>
                        </div>
                        {task.co2Impact > 0 && (
                          <span className="text-xs text-muted-foreground">
                            {task.co2Impact} {t.common.kg} CO₂
                          </span>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="gap-2">
                      <Button
                        className="flex-1"
                        variant={task.completed ? "outline" : "default"}
                        disabled={isPending || task.completed}
                        onClick={() => handleComplete(task)}
                      >
                        {isPending && !task.completed && (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        {task.completed && <Check className="mr-2 h-4 w-4 text-success" />}
                        {task.completed
                          ? t.tasks.completed
                          : isPending
                            ? t.taskActions.completing
                            : t.tasks.markComplete}
                      </Button>
                      {task.completed && (
                        <Button
                          variant="ghost"
                          size="icon"
                          title={t.taskActions.undo}
                          aria-label={t.taskActions.undo}
                          disabled={isPending}
                          onClick={() => handleUndo(task)}
                        >
                          {isPending ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <RotateCcw className="h-4 w-4" />
                          )}
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
