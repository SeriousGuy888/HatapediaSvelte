import type { TocNode } from "$lib/plugins/remark-heading-tree"

export type Article = {
  slug: string

  authors: string[]
  title: string
  subtitle: string
  aliases?: string[]

  tags: string[]
  image?: string

  date_created: Date
  date_modified: Date

  headings?: TocNode[]
  inlinks?: Article[]
}
