export type TaskCategory = "energy" | "waste" | "water" | "transport" | "food"
export type TaskDifficulty = "easy" | "medium" | "hard"
export type ProductCategory = "electronics" | "home" | "outdoor" | "accessories"
export type UserStatus = "student" | "pupil"

export interface User {
  id: string
  firstName: string
  lastName: string
  name: string
  email: string
  address: string
  age: number
  status: UserStatus
  avatar?: string
  /** Spendable balance shown in the store. */
  ecoPoints: number
  /** Lifetime points - this is what the leaderboard ranks by. */
  totalPointsEarned: number
  completedTasks: number
  co2Saved: number
  currentStreak: number
  longestStreak: number
  rank: number
  createdAt?: string
}

export interface Task {
  id: string
  /** Stable key ("task1".."task6") used to look up the EN/RU/UZ translation. */
  key: string
  title: string
  description: string
  points: number
  category: TaskCategory
  difficulty: TaskDifficulty
  completed: boolean
  imageUrl?: string
  co2Impact: number
}

export interface LeaderboardUser {
  id: string
  name: string
  ecoPoints: number
  rank: number
  avatar?: string
  isCurrentUser?: boolean
}

export interface StoreProduct {
  id: string
  name: string
  description: string
  price: number
  category: ProductCategory
  imageUrl: string
  inStock: boolean
  stock: number
  discount?: number
}

export interface Achievement {
  id: string
  key: string
  title: string
  description: string
  icon: string
  tier: "bronze" | "silver" | "gold"
  criteria: { type: string; threshold: number; category?: string | null }
  rewardPoints: number
  unlocked: boolean
  unlockedAt: string | null
  progress: number
}

export interface Order {
  id: string
  product: string
  productSnapshot: { name: string; imageUrl: string; category: string }
  unitPrice: number
  discount: number
  pricePaid: number
  quantity: number
  status: "completed" | "refunded"
  createdAt: string
}

export interface HistoryEntry {
  id: string
  date: string
  pointsAwarded: number
  co2Saved: number
  completedAt: string
  task: {
    id: string
    key: string
    title: string
    category: TaskCategory
    difficulty: TaskDifficulty
    imageUrl?: string
    points: number
  }
}

export interface UserStats {
  ecoPoints: number
  totalPointsEarned: number
  completedTasks: number
  co2Saved: number
  treesEquivalent: number
  currentStreak: number
  longestStreak: number
  rank: number
  totalUsers: number
  todayCompleted: number
  todayTotal: number
  ordersMade: number
}

export interface PlatformStats {
  activeUsers: number
  tasksCompleted: number
  co2Saved: number
  treesPlanted: number
  availableTasks: number
  availableProducts: number
  rewardsClaimed: number
}

export type LeaderboardPeriod = "all" | "week" | "month"
