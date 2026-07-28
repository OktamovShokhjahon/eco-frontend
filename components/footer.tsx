"use client"
import { Leaf } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/components/language-context"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="bg-primary text-primary-foreground rounded-full p-2">
                <Leaf className="h-5 w-5" />
              </div>
              <span className="text-lg font-bold">EcoHabits</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-md">{t.footer.tagline}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{t.footer.product}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#tasks" className="text-muted-foreground hover:text-primary transition-colors">
                  {t.footer.tasks}
                </Link>
              </li>
              <li>
                <Link href="/#leaderboard" className="text-muted-foreground hover:text-primary transition-colors">
                  {t.footer.leaderboard}
                </Link>
              </li>
              <li>
                <Link href="/#about" className="text-muted-foreground hover:text-primary transition-colors">
                  {t.footer.about}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{t.footer.support}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  {t.footer.help}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  {t.footer.privacy}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  {t.footer.terms}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} EcoHabits. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  )
}
