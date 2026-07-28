"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Navbar } from "@/components/navbar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Leaf, Loader2 } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { useLanguage } from "@/components/language-context"
import { useAuth } from "@/components/auth-context"
import { ApiError } from "@/lib/api"
import { fill } from "@/lib/format"

export default function RegisterPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const { register, user, loading } = useAuth()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
    age: "",
    status: "",
  })

  useEffect(() => {
    if (!loading && user) router.replace("/")
  }, [loading, user, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setFieldErrors({})
    setSubmitting(true)
    try {
      const created = await register({
        ...formData,
        age: Number(formData.age),
        status: formData.status as "student" | "pupil",
      })
      toast.success(fill(t.account.accountCreated, { name: created.firstName }))
      router.push("/")
    } catch (err) {
      if (err instanceof ApiError && err.errors?.length) {
        setFieldErrors(Object.fromEntries(err.errors.map((e) => [e.field, e.message])))
      }
      setError(err instanceof Error ? err.message : "Registration failed")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-2xl"
        >
          <Card className="border-2">
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto bg-primary text-primary-foreground rounded-full p-3 w-fit">
                <Leaf className="h-8 w-8" />
              </div>
              <div>
                <CardTitle className="text-2xl">{t.register.title}</CardTitle>
                <CardDescription>{t.register.subtitle}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">{t.register.firstName}</Label>
                    <Input
                      id="firstName"
                      placeholder={t.register.firstNamePlaceholder}
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">{t.register.lastName}</Label>
                    <Input
                      id="lastName"
                      placeholder={t.register.lastNamePlaceholder}
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">{t.register.email}</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t.register.emailPlaceholder}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                  {fieldErrors.email && (
                    <p className="text-xs text-destructive">{fieldErrors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">{t.register.password}</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder={t.register.passwordPlaceholder}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    minLength={6}
                    required
                  />
                  {fieldErrors.password && (
                    <p className="text-xs text-destructive">{fieldErrors.password}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">{t.register.address}</Label>
                  <Input
                    id="address"
                    placeholder={t.register.addressPlaceholder}
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">{t.register.age}</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder={t.register.agePlaceholder}
                      min="1"
                      max="120"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">{t.register.status}</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) => setFormData({ ...formData, status: value })}
                      required
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

                <Button type="submit" className="w-full" size="lg" disabled={submitting}>
                  {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {submitting ? t.account.creatingAccount : t.register.createAccount}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-center text-sm text-muted-foreground">
                {t.register.haveAccount}
                <Link href="/login" className="text-primary hover:underline ml-1 font-medium">
                  {t.register.login}
                </Link>
              </div>
            </CardFooter>
          </Card>

          <p className="text-center text-sm text-muted-foreground mt-6">
            <Link href="#" className="text-primary hover:underline">
              {t.register.terms}
            </Link>{" "}
            {t.register.and}{" "}
            <Link href="#" className="text-primary hover:underline">
              {t.register.privacy}
            </Link>
          </p>
        </motion.div>
      </main>
    </div>
  )
}
