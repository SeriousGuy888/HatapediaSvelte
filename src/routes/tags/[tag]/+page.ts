import type { Article } from "$lib/types"

export async function load({ fetch, params }) {
  const tag = params.tag

  const response = await fetch(`/api/articles/tags/${tag}`)
  const articles: Article[] = await response.json()

  return { articles }
}
