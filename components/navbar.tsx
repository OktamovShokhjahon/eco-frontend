"use client"

import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { useLanguage } from "@/components/language-context"
import { useAuth } from "@/components/auth-context"
import { UserMenu } from "@/components/user-menu"
import { Button } from "@/components/ui/button"
import { Leaf, Menu, X } from "lucide-react"
import { useState } from "react"
import { usePathname } from "next/navigation"

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { t } = useLanguage()
  const { user, loading } = useAuth()

  const isAuthPage = pathname === "/login" || pathname === "/register"
  const closeMenu = () => setMobileMenuOpen(false)

  // Signed out: the original Login / Get Started pair.
  // Signed in: balance + avatar menu, on every page including /store.
  const authControls = loading ? (
    <div className="h-9 w-9 animate-pulse rounded-full bg-muted" />
  ) : user ? (
    <UserMenu onNavigate={closeMenu} />
  ) : (
    <>
      <Link href="/login" onClick={closeMenu}>
        <Button variant="outline">{t.nav.login}</Button>
      </Link>
      <Link href="/register" onClick={closeMenu}>
        <Button>{t.nav.getStarted}</Button>
      </Link>
    </>
  )

  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-primary text-primary-foreground rounded-full p-2 group-hover:scale-110 transition-transform">
              <Leaf className="h-6 w-6" />
            </div>
            <span className="text-xl font-bold">EcoHabits</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {!isAuthPage && (
              <>
                <Link href="/#tasks" className="text-sm font-medium hover:text-primary transition-colors">
                  {t.nav.tasks}
                </Link>
                <Link href="/#leaderboard" className="text-sm font-medium hover:text-primary transition-colors">
                  {t.nav.leaderboard}
                </Link>
                <Link href="/store" className="text-sm font-medium hover:text-primary transition-colors">
                  {t.footer.rewards}
                </Link>
                <Link href="/#about" className="text-sm font-medium hover:text-primary transition-colors">
                  {t.nav.about}
                </Link>
              </>
            )}
            <LanguageToggle />
            <ThemeToggle />
            {isAuthPage && !user ? (
              <Link href="/">
                <Button variant="outline">{t.nav.home}</Button>
              </Link>
            ) : (
              authControls
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
            {!loading && user && <UserMenu onNavigate={closeMenu} />}
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3 animate-in slide-in-from-top-2">
            {!isAuthPage && (
              <>
                <Link
                  href="/#tasks"
                  className="block text-sm font-medium hover:text-primary transition-colors py-2"
                  onClick={closeMenu}
                >
                  {t.nav.tasks}
                </Link>
                <Link
                  href="/#leaderboard"
                  className="block text-sm font-medium hover:text-primary transition-colors py-2"
                  onClick={closeMenu}
                >
                  {t.nav.leaderboard}
                </Link>
                <Link
                  href="/store"
                  className="block text-sm font-medium hover:text-primary transition-colors py-2"
                  onClick={closeMenu}
                >
                  {t.footer.rewards}
                </Link>
                <Link
                  href="/#about"
                  className="block text-sm font-medium hover:text-primary transition-colors py-2"
                  onClick={closeMenu}
                >
                  {t.nav.about}
                </Link>
              </>
            )}
            {!user && (
              <div className="flex flex-col gap-2 pt-2">
                {isAuthPage ? (
                  <Link href="/" onClick={closeMenu}>
                    <Button variant="outline" className="w-full bg-transparent">
                      {t.nav.home}
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link href="/login" onClick={closeMenu}>
                      <Button variant="outline" className="w-full bg-transparent">
                        {t.nav.login}
                      </Button>
                    </Link>
                    <Link href="/register" onClick={closeMenu}>
                      <Button className="w-full">{t.nav.getStarted}</Button>
                    </Link>
                  </>
                )}
              </div>
            )}
            {user && (
              <Link href="/profile" onClick={closeMenu} className="block pt-2">
                <Button variant="outline" className="w-full bg-transparent">
                  {t.account.myProfile}
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
