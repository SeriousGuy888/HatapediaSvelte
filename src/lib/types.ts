import type { TocNode } from "$lib/plugins/remark-heading-tree"

export type Article = {
  slug: string
  title: string
  subtitle: string
  tags: string[]
  date_created: string
  date_modified: string
  aliases?: string[]
  headings?: TocNode[]
}
