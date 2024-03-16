import type { TocNode } from "$lib/plugins/remark-heading-tree"

export type Article = {
  slug: string
  title: string
  subtitle: string
  tags: string[]
  image?: string

  date_created: Date
  date_modified: Date
  aliases?: string[]

  headings?: TocNode[]
  inlinks?: Article[]
}
