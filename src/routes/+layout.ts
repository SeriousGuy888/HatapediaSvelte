import { allArticleMeta } from "$lib/stores/article_store.js"
import type { Article } from "$lib/types"
import { dev } from "$app/environment"

import { inject } from "@vercel/analytics"
import { injectSpeedInsights } from "@vercel/speed-insights/sveltekit"

inject({ mode: dev ? "development" : "production" })
injectSpeedInsights()

export async function load({ fetch }) {
  const response = await fetch("/api/articles")

  const articles: Article[] = (await response.json()).sort((a: Article, b: Article) => {
    // Move more recently modified articles to the top
    if (a.date_modified > b.date_modified) return -1
    if (a.date_modified < b.date_modified) return 1
    return 0
  })

  allArticleMeta.set(articles)

  return {}
}
