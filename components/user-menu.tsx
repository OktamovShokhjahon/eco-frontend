"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Coins, Gift, LogOut, User as UserIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/components/auth-context"
import { useLanguage } from "@/components/language-context"

export function initialsOf(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("")
}

/** Avatar + live coin balance + account actions, shown once signed in. */
export function UserMenu({ onNavigate }: { onNavigate?: () => void }) {
  const { user, logout } = useAuth()
  const { t } = useLanguage()
  const router = useRouter()

  if (!user) return null

  const handleLogout = () => {
    logout()
    onNavigate?.()
    toast.success(t.account.loggedOut)
    router.push("/")
  }

  return (
    <div className="flex items-center gap-3">
      <Link
        href="/store"
        onClick={onNavigate}
        className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/20"
        title={t.store.yourBalance}
      >
        <Coins className="h-4 w-4" />
        {user.ecoPoints.toLocaleString()}
      </Link>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full" aria-label={t.account.myProfile}>
            <Avatar className="h-9 w-9 border border-border">
              <AvatarImage src={user.avatar || undefined} alt={user.name} />
              <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                {initialsOf(user.name)}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-60">
          <DropdownMenuLabel className="space-y-1">
            <p className="font-semibold leading-none">{user.name}</p>
            <p className="text-xs font-normal text-muted-foreground truncate">{user.email}</p>
            <p className="flex items-center gap-1.5 pt-1 text-xs font-normal text-primary sm:hidden">
              <Coins className="h-3.5 w-3.5" />
              {user.ecoPoints.toLocaleString()} {t.store.coins}
            </p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/profile" onClick={onNavigate} className="cursor-pointer">
              <UserIcon className="mr-2 h-4 w-4" />
              {t.account.myProfile}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/profile?tab=orders" onClick={onNavigate} className="cursor-pointer">
              <Gift className="mr-2 h-4 w-4" />
              {t.account.myRewards}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:text-destructive">
            <LogOut className="mr-2 h-4 w-4" />
            {t.account.logout}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
