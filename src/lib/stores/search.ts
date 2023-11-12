// Based on: https://www.youtube.com/watch?v=lrzHaTcpRh8

import { writable } from "svelte/store"

export interface SearchStoreModel<T extends Record<PropertyKey, any>> {
  data: T[]
  results: T[]
  query: string
}

export function createSearchStore<T extends Record<PropertyKey, any>>(data: T[]) {
  const { subscribe, set, update } = writable<SearchStoreModel<T>>({
    data,
    results: data,
    query: "",
  })

  return {
    subscribe,
    set,
    update,
  }
}

export function handleSearch<T extends Record<PropertyKey, any>>(store: SearchStoreModel<T>) {
  const query = store.query.toLowerCase() ?? ""
  store.results = store.data.filter((item: any) => {
    return item.searchTerms.includes(query)
  })
}
