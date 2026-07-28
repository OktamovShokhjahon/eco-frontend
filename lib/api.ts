import type {
  Achievement,
  HistoryEntry,
  LeaderboardPeriod,
  LeaderboardUser,
  Order,
  PlatformStats,
  StoreProduct,
  Task,
  User,
  UserStats,
} from "./types"

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
const TOKEN_KEY = "ecohabits_token"

/** Error carrying the HTTP status and the API's own message. */
export class ApiError extends Error {
  status: number
  errors?: { field: string; message: string }[]

  constructor(status: number, message: string, errors?: { field: string; message: string }[]) {
    super(message)
    this.name = "ApiError"
    this.status = status
    this.errors = errors
  }
}

export const tokenStore = {
  get(): string | null {
    if (typeof window === "undefined") return null
    return window.localStorage.getItem(TOKEN_KEY)
  },
  set(token: string) {
    if (typeof window === "undefined") return
    window.localStorage.setItem(TOKEN_KEY, token)
  },
  clear() {
    if (typeof window === "undefined") return
    window.localStorage.removeItem(TOKEN_KEY)
  },
}

type RequestOptions = {
  method?: string
  body?: unknown
  query?: Record<string, string | number | undefined | null>
  auth?: boolean
}

/**
 * Single place where the response envelope ({ success, data }) is unwrapped
 * and the bearer token is attached, so callers only deal with plain data.
 */
async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = "GET", body, query, auth = true } = options

  const url = new URL(`${BASE_URL}${path}`)
  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.set(key, String(value))
      }
    })
  }

  const headers: Record<string, string> = {}
  if (body !== undefined) headers["Content-Type"] = "application/json"

  const token = auth ? tokenStore.get() : null
  if (token) headers.Authorization = `Bearer ${token}`

  let response: Response
  try {
    response = await fetch(url.toString(), {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
      cache: "no-store",
    })
  } catch {
    // Network-level failure: the API is not running or is unreachable.
    throw new ApiError(0, "Cannot reach the server. Is the API running?")
  }

  const payload = await response.json().catch(() => null)

  if (!response.ok) {
    throw new ApiError(
      response.status,
      payload?.message || `Request failed (${response.status})`,
      payload?.errors
    )
  }

  return payload?.data as T
}

export interface AuthResponse {
  token: string
  user: User
}

export interface RegisterPayload {
  firstName: string
  lastName: string
  email: string
  password: string
  address: string
  age: number
  status: "student" | "pupil"
}

export interface CompleteTaskResponse {
  task: Task
  pointsAwarded: number
  co2Saved: number
  currentStreak: number
  newAchievements: Achievement[]
  user: User
}

export interface PurchaseResponse {
  order: Order
  product: StoreProduct
  pricePaid: number
  newAchievements: Achievement[]
  user: User
}

export const api = {
  auth: {
    register: (payload: RegisterPayload) =>
      request<AuthResponse>("/auth/register", { method: "POST", body: payload, auth: false }),
    login: (email: string, password: string) =>
      request<AuthResponse>("/auth/login", {
        method: "POST",
        body: { email, password },
        auth: false,
      }),
    me: () => request<{ user: User }>("/auth/me"),
  },

  users: {
    update: (payload: Partial<RegisterPayload>) =>
      request<{ user: User }>("/users/me", { method: "PATCH", body: payload }),
    changePassword: (currentPassword: string, newPassword: string) =>
      request<{ message: string }>("/users/me/password", {
        method: "PATCH",
        body: { currentPassword, newPassword },
      }),
    stats: () => request<UserStats>("/users/me/stats"),
  },

  tasks: {
    list: (params?: { category?: string; difficulty?: string }) =>
      request<Task[]>("/tasks", { query: params }),
    complete: (taskId: string) =>
      request<CompleteTaskResponse>(`/tasks/${taskId}/complete`, { method: "POST" }),
    uncomplete: (taskId: string) =>
      request<{ pointsRemoved: number; user: User }>(`/tasks/${taskId}/complete`, {
        method: "DELETE",
      }),
    history: (limit = 20) => request<HistoryEntry[]>("/tasks/history", { query: { limit } }),
  },

  leaderboard: {
    list: (period: LeaderboardPeriod = "all", limit = 10) =>
      request<{ period: LeaderboardPeriod; entries: LeaderboardUser[] }>("/leaderboard", {
        query: { period, limit },
      }),
    me: () =>
      request<{ rank: number; totalUsers: number; neighbours: LeaderboardUser[] }>(
        "/leaderboard/me"
      ),
  },

  store: {
    products: (category?: string) =>
      request<StoreProduct[]>("/products", {
        query: { category: category === "all" ? undefined : category },
      }),
    buy: (productId: string) =>
      request<PurchaseResponse>("/orders", { method: "POST", body: { productId } }),
    orders: () =>
      request<{ orders: Order[]; totalSpent: number; count: number }>("/orders"),
  },

  achievements: {
    list: () =>
      request<{ achievements: Achievement[]; unlockedCount: number; total: number }>(
        "/achievements"
      ),
  },

  stats: () => request<PlatformStats>("/stats", { auth: false }),
}
