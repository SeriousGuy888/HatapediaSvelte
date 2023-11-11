import { getArticles } from "$lib/articles"
import { json } from "@sveltejs/kit"

export async function GET({ params }) {
  const tag = params.tag
  const articles = await getArticles()
  const filteredArticles = articles.filter((article) => article.tags?.includes(tag))

  return json(filteredArticles)
}
