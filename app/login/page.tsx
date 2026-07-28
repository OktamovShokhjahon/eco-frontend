"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { fill } from "@/lib/format"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { t } = useLanguage()
  const { login, user, loading } = useAuth()

  // Already signed in? There is nothing to do on this page.
  useEffect(() => {
    if (!loading && user) router.replace("/")
  }, [loading, user, router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      const loggedIn = await login(email, password)
      toast.success(fill(t.account.welcomeBack, { name: loggedIn.firstName }))
      router.push("/")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <Card className="border-2">
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto bg-primary text-primary-foreground rounded-full p-3 w-fit">
                <Leaf className="h-8 w-8" />
              </div>
              <div>
                <CardTitle className="text-2xl">{t.login.welcomeBack}</CardTitle>
                <CardDescription>{t.login.subtitle}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <div className="space-y-2">
                  <Label htmlFor="email">{t.login.email}</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t.login.emailPlaceholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">{t.login.password}</Label>
                    <Link href="#" className="text-sm text-primary hover:underline">
                      {t.login.forgotPassword}
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder={t.login.passwordPlaceholder}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" size="lg" disabled={submitting}>
                  {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {submitting ? t.account.signingIn : t.login.loginButton}
                </Button>

                {/* Judges and first-time visitors can sign in without registering. */}
                <button
                  type="button"
                  onClick={() => {
                    setEmail("sarah.johnson@example.com")
                    setPassword("Password123")
                  }}
                  className="w-full text-center text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  Use demo account: sarah.johnson@example.com / Password123
                </button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-center text-sm text-muted-foreground">
                {t.login.noAccount}
                <Link href="/register" className="text-primary hover:underline ml-1 font-medium">
                  {t.login.signUp}
                </Link>
              </div>
            </CardFooter>
          </Card>

          <p className="text-center text-sm text-muted-foreground mt-6">
            <Link href="#" className="text-primary hover:underline">
              {t.login.terms}
            </Link>{" "}
            {t.login.and}{" "}
            <Link href="#" className="text-primary hover:underline">
              {t.login.privacy}
            </Link>
          </p>
        </motion.div>
      </main>
    </div>
  )
}
