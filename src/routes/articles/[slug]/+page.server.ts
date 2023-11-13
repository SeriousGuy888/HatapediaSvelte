import type { Article } from "$lib/types"

import { error } from "@sveltejs/kit"
import slugMap from "../../../content/slugs.json"

import matter from "gray-matter"

import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkGfm from "remark-gfm"
import remarkWikiLinks from "$lib/plugins/remark-wikilink-syntax"
import remarkCallouts from "@portaljs/remark-callouts"
import remarkRehype from "remark-rehype"

import rehypeStringify from "rehype-stringify"
import rehypeSlug from "rehype-slug"

export async function load({ params }) {
  const slug = params.slug
  const fileName: string | undefined = (slugMap as Record<string, string>)[slug]

  if (!fileName) {
    throw error(404, `Could not read article for slug ${slug}`)
  }

  try {
    const article = await import(`../../../content/articles/${fileName}.md?raw`)

    const { data: metadata, content } = matter(article.default)

    const file = await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkWikiLinks)
      .use(remarkCallouts)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeSlug)
      .use(rehypeStringify, { allowDangerousHtml: true })
      .process(content)

    return {
      content: file.value as string,
      meta: {
        title: fileName, // Default to the file name if no title is provided
        ...metadata,
      } as Article,
    }
  } catch (e) {
    console.error(e)
    throw error(404, `Could not read ${fileName}`)
  }
}
