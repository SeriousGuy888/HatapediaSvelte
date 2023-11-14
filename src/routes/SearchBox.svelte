<script lang="ts">
  import type { createSearchStore } from "$lib/stores/search"
  import { Search } from "lucide-svelte"

  export let placeholder = "Search..."
  export let searchStore: ReturnType<typeof createSearchStore>
  export function focus() {
    // Focus the input after the modal opens
    // Delay of 0 required because the modal is not yet in the DOM
    setTimeout(() => {
      inputRef?.focus()
    }, 0)
  }

  let inputRef: HTMLInputElement | null = null
</script>

<div class="relative w-full">
  <input
    type="text"
    class="appearance-none bg-transparent p-2 focus:outline-none border-b-2 border-blue-600 dark:border-blue-400 w-full sm:text-xl"
    {placeholder}
    bind:value={$searchStore.query}
    bind:this={inputRef}
  />
  <Search class="absolute right-2 top-2 w-6 h-6 text-blue-600 dark:text-blue-400" />
</div>
