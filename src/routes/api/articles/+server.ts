import { getArticles } from "$lib/articles"
import { json } from "@sveltejs/kit"

export async function GET() {
  const articles = await getArticles()

  // articles = articles.sort(
  //   (a, b) => new Date(b.date_modified).getTime() - new Date(a.date_modified).getTime(),
  // )

  return json(articles)
}
