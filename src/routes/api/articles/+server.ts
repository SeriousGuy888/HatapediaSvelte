import type { Article } from "$lib/types"
import { json } from "@sveltejs/kit"

const slugMap: Record<string, string> = (await import("../../../content/slugs.json")).default

async function getArticles() {
  let articles: Article[] = []

  for (const slug in slugMap) {
    const fileName = slugMap[slug]

    try {
      const file = await import(/* @vite-ignore */ `/src/content/articles/${fileName}.md`)
      if (file && typeof file === "object" && "metadata" in file) {
        let metadata = file.metadata
        if (!("title" in metadata)) {
          metadata.title = fileName
        }

        const article = { ...metadata, slug } as Article
        articles.push(article)
      }
    } catch (error) {
      // Most likely a file in the slug map that doesn't exist
      
      console.error(error)
      continue
    }
  }

  // articles = articles.sort(
  //   (first, second) => new Date(second.date).getTime() - new Date(first.date).getTime()
  // )

  return articles
}

export async function GET() {
  const articles = await getArticles()
  return json(articles)
}
