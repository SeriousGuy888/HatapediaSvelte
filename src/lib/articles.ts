import remarkHeadingTree from "$lib/plugins/remark-heading-tree"
import type { Article } from "$lib/types"
import matter from "gray-matter"
import remarkParse from "remark-parse"
import { unified } from "unified"

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
    const { data: metadata, content: markdownContent } = matter(fileContent)

    if (metadata) {
      const article = await preprocessMetadata(metadata, markdownContent, fileName, slug)
      articles.push(article)
    }
  }

  return articles
}

async function preprocessMetadata(
  metadata: Record<string, unknown>,
  markdownContent: string,
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

  // if (!("headings" in metadata)) {
  //   const vfile = await unified().use(remarkParse).use(remarkHeadingTree).process(markdownContent)
  //   metadata.headings = (vfile.data as any).headings
  // }

  delete metadata.image

  return { ...metadata, slug } as Article
}
