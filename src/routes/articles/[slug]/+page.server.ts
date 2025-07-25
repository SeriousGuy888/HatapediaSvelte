import type { Article } from "$lib/types"

import { error } from "@sveltejs/kit"
import slugMap from "../../../content/slugs.json"
import inlinksIndex from "../../../content/inlinks.json"
import { getArticleMetadata } from "$lib/articles"

import matter from "gray-matter"

import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkGfm from "remark-gfm"
import remarkWikiLinks from "$lib/plugins/remark-wikilink-syntax"
import remarkYamlComponents from "$lib/plugins/remark-yaml-components"
import remarkGroupImages from "$lib/plugins/remark-group-images"
import remarkHeadingTree, { type TocNode } from "$lib/plugins/remark-heading-tree"
import remarkCallouts from "remark-callouts"
import remarkRehype from "remark-rehype"

import rehypeExternalLinks from "rehype-external-links"
import rehypeStringify from "rehype-stringify"
import rehypeWrap from "rehype-wrap-all"
import rehypeSlug from "rehype-slug"

export const prerender = true

export function entries() {
  return Object.keys(slugMap).map((slug) => ({ slug }))
}

export async function load({ params }) {
  const slug = params.slug
  const fileName: string | undefined = (slugMap as Record<string, string>)[slug]

  if (!fileName) {
    error(404, `No article found for "${slug}".`)
  }

  try {
    const article = await import(`../../../content/articles/${fileName}.md?raw`)

    const { data: metadata, content } = matter(article.default)

    const file = await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkWikiLinks, {
        existingPageNames: Object.keys(slugMap),
      })
      .use(remarkYamlComponents, {
        conversionMap: {
          /*
            This map specifies the code block languages that indicate that the
            code block should be replaced with a custom Svelte component.
            eg: ```infobox-nation``` -> <NationInfobox> </NationInfobox>
          */
          "infobox-nation": "NationInfobox",
          "infobox-character": "CharacterInfobox",
          "infobox-timeline": "TimelineInfobox",
          youtube: "YouTubeVideo",
          "book-and-quill": "BookAndQuillViewer",
        },
      })
      .use(remarkGroupImages)
      .use(remarkHeadingTree)
      .use(remarkCallouts)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeSlug)
      .use(rehypeExternalLinks, { target: "_blank" })

      // so that css can make the table scrollable horizontally on small screens
      .use(rehypeWrap, { selector: "table", wrapper: "div.responsive-table" })

      .use(rehypeStringify, { allowDangerousHtml: true })
      .process(content)

    const inlinkSlugs = (inlinksIndex as Record<string, string[]>)[slug] ?? []
    const inlinks = await Promise.all(
      inlinkSlugs.map(async (slug) => await getArticleMetadata(slug)),
    )

    const parsedContent = file.value as string
    const headings: TocNode[] | undefined = (file.data as any).headings

    return {
      content: parsedContent,
      meta: {
        title: fileName, // Default to the file name if no title is provided
        ...metadata,
        headings,
        inlinks,
      } as Article,
    }
  } catch (e) {
    console.error(e)
    error(404, `Could not read ${fileName}`)
  }
}
