import { getArticles } from "$lib/articles"

export async function load({ fetch, params }) {
  const tag = params.tag

  const articles = await getArticles()
  const filteredArticles = articles.filter((article) => article.tags?.includes(tag))

  return { articles: filteredArticles }
}
