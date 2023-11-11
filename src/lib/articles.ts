import type { Article } from "$lib/types"
const slugMap: Record<string, string> = (await import("../content/slugs.json")).default

export async function getArticles() {
  let articles: Article[] = []

  for (const slug in slugMap) {
    const fileName = slugMap[slug]

    try {
      const file = await import(/* @vite-ignore */ `/src/content/articles/${fileName}.md`)
      if (file && typeof file === "object" && "metadata" in file) {
        let metadata = file.metadata
        const article = preprocessMetadata(metadata, fileName, slug)
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

function preprocessMetadata(
  metadata: Record<string, unknown>,
  fileName: string,
  slug: string,
): Article {
  if (!("title" in metadata)) {
    metadata.title = fileName
  }
  if (!("subtitle" in metadata)) {
    metadata.subtitle = ""
  }

  if (!("date_created" in metadata)) {
    metadata.date_created = "1970-01-01"
  }
  if (!("date_modified" in metadata)) {
    metadata.date_modified = "1970-01-01"
  }

  if (!("tags" in metadata)) {
    metadata.tags = []
  }

  delete metadata.aliases
  delete metadata.image

  return { ...metadata, slug } as Article
}
