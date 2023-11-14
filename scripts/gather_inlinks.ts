import { unified } from "unified"
import fs from "fs"

import remarkParse from "remark-parse"
import remarkWikiLinks from "../src/lib/plugins/remark-wikilink-syntax/index.ts"
import remarkStringify from "remark-stringify"

const slugMapPath = "./src/content/slugs.json"
const inlinkIndexPath = "./src/content/inlinks.json"

main()

async function main() {
  const slugMap = JSON.parse(fs.readFileSync(slugMapPath, "utf8"))

  const outlinks = await getOutlinks(slugMap)
  const inlinks = invertOutlinks(outlinks)

  fs.writeFile(inlinkIndexPath, JSON.stringify(inlinks), () => {
    console.log("Wrote inlinks to", inlinkIndexPath)
  })
}

async function getOutlinks(slugMap: Record<string, any>) {
  const slugs = Object.keys(slugMap)

  const outlinks: Record<string, string[]> = {}

  for (const slug of slugs) {
    const content = fs.readFileSync(`./src/content/articles/${slugMap[slug]}.md`)

    const vFile = await unified()
      .use(remarkParse)
      .use(remarkWikiLinks)
      .use(remarkStringify)
      .process(content)

    outlinks[slug] = (vFile.data.outlinks as string[]).filter((slug) => slug in slugMap)
  }

  return outlinks
}

function invertOutlinks(outlinks: Record<string, string[]>) {
  const inlinks: Record<string, Set<string>> = {}

  for (const slug of Object.keys(outlinks)) {
    for (const outlink of outlinks[slug]) {
      if (!inlinks[outlink]) {
        inlinks[outlink] = new Set()
      }

      inlinks[outlink].add(slug)
    }
  }

  const inlinksWithArrayValues: Record<string, string[]> = {}

  Object.keys(inlinks).forEach((slug) => {
    inlinksWithArrayValues[slug] = Array.from(inlinks[slug])
  })

  return inlinksWithArrayValues
}
