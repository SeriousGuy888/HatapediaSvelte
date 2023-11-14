import type { Article } from "$lib/types"
import type { IFuseOptions } from "fuse.js"
import { writable } from "svelte/store"

export const allArticleMeta = writable<Article[]>([])

export const articleSearchConfig: IFuseOptions<Article> = {
  keys: [
    { name: "slug", weight: 1.2 },
    { name: "title", weight: 1 },
    { name: "aliases", weight: 1 },
    { name: "tags", weight: 0.4 },
    { name: "subtitle", weight: 0.2 },
  ],
}
