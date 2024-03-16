import type { Article } from "$lib/types"
import matter from "gray-matter"

const slugMap: Record<string, string> = (await import("../content/slugs.json")).default

export async function getArticles() {
  const articleFiles = import.meta.glob("../content/articles/*.md", { as: "raw", eager: true })

  let articles: Article[] = []

  for (const path in articleFiles) {
    const fileContent: string = articleFiles[path]
    const fileName = path.split("/").pop()!.replace(/.md$/i, "")
    const slug = Object.keys(slugMap).find((key) => slugMap[key] === fileName)

    if (!slug) {
      console.warn(
        `No slug found for ${fileName}. This article will not be included in the list of all articles.`,
      )
      continue
    }

    // Separate the metadata from the content with gray-matter
    const { data: metadata } = matter(fileContent)

    if (metadata) {
      const article = await preprocessMetadata(metadata, fileName, slug)
      articles.push(article)
    }
  }

  return articles
}

async function preprocessMetadata(
  metadata: Record<string, unknown>,
  fileName: string,
  slug: string,
): Promise<Article> {
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

  // delete metadata.image
  delete metadata.outlinks
  delete metadata.headings

  return { ...metadata, slug } as Article

  // http://127.0.0.1:5173/api/articles
}

export async function getArticleMetadata(slug: string) {
  const fileName: string | undefined = slugMap[slug]

  if (!fileName) {
    throw new Error(`No article found for "${slug}".`)
  }

  try {
    const article = await import(`../content/articles/${fileName}.md?raw`)
    const { data: metadata } = matter(article.default)
    return preprocessMetadata(metadata, fileName, slug)
  } catch (e) {
    console.error(e)
    throw new Error(`Could not read file "${fileName}" for slug "${slug}".`)
  }
}
