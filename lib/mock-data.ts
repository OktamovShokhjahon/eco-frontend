/**
 * The app used to render hardcoded arrays from this file. All of that data now
 * lives in MongoDB and is served by the Express API (see lib/api.ts).
 *
 * This module is kept as a re-export so any lingering import of the domain
 * types keeps resolving; the canonical definitions are in lib/types.ts.
 */
export type {
  User,
  Task,
  LeaderboardUser,
  StoreProduct,
  Achievement,
  Order,
  HistoryEntry,
  UserStats,
  PlatformStats,
} from "./types"
