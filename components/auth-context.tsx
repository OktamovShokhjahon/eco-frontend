"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import type { ReactNode } from "react"
import { api, tokenStore, type RegisterPayload } from "@/lib/api"
import type { User } from "@/lib/types"

interface AuthContextValue {
  user: User | null
  /** True until the stored token has been checked against the API. */
  loading: boolean
  login: (email: string, password: string) => Promise<User>
  register: (payload: RegisterPayload) => Promise<User>
  logout: () => void
  /** Re-reads the profile from the API (after a purchase, task, edit...). */
  refreshUser: () => Promise<void>
  /** Applies a user object the API already returned, avoiding a round trip. */
  setUser: (user: User) => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Rehydrate the session on first mount: a stored token is only trusted once
  // the API confirms it still resolves to a real account.
  useEffect(() => {
    let cancelled = false

    async function hydrate() {
      if (!tokenStore.get()) {
        setLoading(false)
        return
      }
      try {
        const { user: me } = await api.auth.me()
        if (!cancelled) setUserState(me)
      } catch {
        tokenStore.clear()
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    hydrate()
    return () => {
      cancelled = true
    }
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    const { token, user: loggedIn } = await api.auth.login(email, password)
    tokenStore.set(token)
    setUserState(loggedIn)
    return loggedIn
  }, [])

  const register = useCallback(async (payload: RegisterPayload) => {
    const { token, user: created } = await api.auth.register(payload)
    tokenStore.set(token)
    setUserState(created)
    return created
  }, [])

  const logout = useCallback(() => {
    tokenStore.clear()
    setUserState(null)
  }, [])

  const refreshUser = useCallback(async () => {
    if (!tokenStore.get()) return
    try {
      const { user: fresh } = await api.auth.me()
      setUserState(fresh)
    } catch {
      // A failed refresh should never sign the user out mid-action.
    }
  }, [])

  const value = useMemo(
    () => ({ user, loading, login, register, logout, refreshUser, setUser: setUserState }),
    [user, loading, login, register, logout, refreshUser]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used inside an AuthProvider")
  return context
}
