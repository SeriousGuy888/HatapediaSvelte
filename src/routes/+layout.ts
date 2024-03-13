import { allArticleMeta } from "$lib/stores/article_store.js"
import type { Article } from "$lib/types"
import { dev } from "$app/environment"

import { inject } from "@vercel/analytics"
import { injectSpeedInsights } from "@vercel/speed-insights/sveltekit"

inject({ mode: dev ? "development" : "production" })
injectSpeedInsights()

export async function load({ fetch }) {
  const response = await fetch("/api/articles")
  const articles: Article[] = await response.json()

  allArticleMeta.set(articles)

  return {}
}
