// Based on: https://www.youtube.com/watch?v=lrzHaTcpRh8

import { writable } from "svelte/store"
import Fuse from "fuse.js"
import type { IFuseOptions } from "fuse.js"

export interface SearchStoreModel<T extends Record<PropertyKey, any>> {
  data: T[]
  results: T[]
  query: string
  fuse: Fuse<T>
}

export function createSearchStore<T extends Record<PropertyKey, any>>(
  data: T[],
  options: IFuseOptions<T>,
) {
  const { subscribe, set, update } = writable<SearchStoreModel<T>>({
    data,
    results: data,
    query: "",
    fuse: new Fuse(data, options),
  })

  return {
    subscribe,
    set,
    update,
  }
}

export function handleSearch<T extends Record<PropertyKey, any>>(store: SearchStoreModel<T>) {
  const query = store.query.toLowerCase()
  
  if (!query) {
    store.results = store.data
    return
  }

  store.results = store.fuse.search(query).map((result) => result.item)
}
