import type { Article } from "$lib/types"

const slugMap: Record<string, string> = (await import("../content/slugs.json")).default

export async function getArticles() {
  const articleFiles = import.meta.glob("../content/articles/*.md", { eager: true })

  let articles: Article[] = []

  for (const path in articleFiles) {
    const fileName = path.split("/").pop()!.replace(".md", "")

    const file = articleFiles[path]
    const slug = Object.keys(slugMap).find((key) => slugMap[key] === fileName)

    if (!slug) {
      console.warn(`No slug found for ${fileName}`)
      continue
    }

    if (file && typeof file === "object" && "metadata" in file) {
      const metadata = file.metadata as any
      const article = preprocessMetadata(metadata, fileName, slug)
      articles.push(article)
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
