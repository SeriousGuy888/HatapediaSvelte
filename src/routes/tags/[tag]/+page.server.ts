import { getArticles } from "$lib/articles"
import type { Article } from "$lib/types"

export async function load({ fetch, params }) {
  const tag = params.tag

  // const response = await fetch(`/api/articles/tags/${tag}`)
  // const articles: Article[] = await response.json()

  const articles = await getArticles()
  const filteredArticles = articles.filter((article) => article.tags?.includes(tag))

  return { articles: filteredArticles }
}
