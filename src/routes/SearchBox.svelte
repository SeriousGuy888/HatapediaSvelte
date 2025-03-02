<script lang="ts">
  import type { createSearchStore } from "$lib/stores/search"
  import { Search } from "lucide-svelte"

  interface Props {
    placeholder?: string;
    searchStore: ReturnType<typeof createSearchStore>;
  }

  let { placeholder = "Search...", searchStore }: Props = $props();
  export function focus() {
    // Focus the input after the modal opens
    // Delay of 0 required because the modal is not yet in the DOM
    setTimeout(() => {
      inputRef?.focus()
    }, 0)
  }

  let inputRef: HTMLInputElement | null = $state(null)
</script>

<div class="relative w-full">
  <input
    type="text"
    class="appearance-none bg-transparent p-2 focus:outline-hidden border-b-2 border-secondary w-full sm:text-xl text-foreground"
    {placeholder}
    bind:value={$searchStore.query}
    bind:this={inputRef}
  />
  <Search class="absolute right-2 top-2 w-6 h-6 text-secondary" />
</div>
