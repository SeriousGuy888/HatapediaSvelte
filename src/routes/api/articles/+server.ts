import { getArticles } from "$lib/articles"
import { json } from "@sveltejs/kit"

export async function GET() {
  const articles = await getArticles()
  return json(articles)
}
