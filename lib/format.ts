import type { Translations } from "./translations"
import type { Task } from "./types"

/** Fills {placeholders} in a translation string. */
export function fill(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (match, key) =>
    key in values ? String(values[key]) : match
  )
}

/** 12345 -> "12.3K", 2_500_000 -> "2.5M" - used for the landing-page counters. */
export function formatCompact(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`
  if (value >= 1_000) return `${(value / 1_000).toFixed(1).replace(/\.0$/, "")}K`
  return String(Math.round(value))
}

/** Kilograms of CO2 rendered as "820 kg" or "1.2 tons". */
export function formatWeight(kg: number): string {
  if (kg >= 1000) return `${(kg / 1000).toFixed(1).replace(/\.0$/, "")} tons`
  return `${Math.round(kg)} kg`
}

/**
 * Task titles and descriptions stay client-side translated: the API returns a
 * stable `key` ("task1".."task6") that maps into the translation file, and the
 * English text from the database is the fallback for anything not covered.
 */
export function taskText(
  t: Translations,
  // History entries carry a title but no description, hence the optional field.
  task: Pick<Task, "key" | "title"> & Partial<Pick<Task, "description">>
) {
  const mock = t.mockTasks as unknown as Record<string, string | undefined>
  return {
    title: mock[`${task.key}Title`] || task.title,
    description: mock[`${task.key}Description`] || task.description || "",
  }
}

export function formatDate(value: string | Date, locale = "en-GB") {
  return new Date(value).toLocaleDateString(locale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}
