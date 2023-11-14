import { allArticleMeta } from "$lib/stores/article_store.js"
import type { Article } from "$lib/types"

export async function load({ fetch }) {
  const response = await fetch("/api/articles")
  const articles: Article[] = await response.json()

  allArticleMeta.set(articles)

  return {}
}
