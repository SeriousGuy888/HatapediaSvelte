<script lang="ts">
  import { articleSearchConfig, allArticleMeta } from "$lib/stores/article_store"
  import { createSearchStore, handleSearch } from "$lib/stores/search"
  import { Search } from "lucide-svelte"
  import { onDestroy } from "svelte"
  import SearchBox from "./SearchBox.svelte"
  import ArticleLinkCard from "$lib/components/ArticleLinkCard.svelte"
  import { browser } from "$app/environment"
  import { fade, fly } from "svelte/transition"

  const searchStore = createSearchStore($allArticleMeta, articleSearchConfig)
  let unsubscribe = searchStore.subscribe((value) => handleSearch(value))
  onDestroy(() => unsubscribe())

  let searchBox: SearchBox | null = null
  let modalOpen = false

  function openModal() {
    modalOpen = true
    $searchStore.query = ""

    // Modal element doesn't exist yet, so we wait for the next tick
    setTimeout(() => {
      searchBox?.focus()
    }, 0)
  }

  function closeModal() {
    modalOpen = false
  }
</script>

<!-- Button to open search -->
<button on:click={openModal} aria-label="Open the search modal" class="flex gap-4 align-middle">
  <div class="hidden sm:flex gap-1 keyboard-shortcut-tooltip">
    <kbd>{browser && navigator.platform.match(/Mac/) ? "⌘" : "Ctrl"}</kbd>
    <kbd>K</kbd>
  </div>
  <Search size="24" color="white" />
</button>

<!-- Listen for keyboard shortcut globally while component is mounted -->
<svelte:window
  on:keydown={(e) => {
    if (e.key === "k" && e.ctrlKey) {
      // Prevents the browser from focusing the address bar
      e.preventDefault()

      // Toggle modal
      modalOpen ? closeModal() : openModal()
    }
  }}
/>

<!-- Search modal -->

{#if modalOpen}
  <div
    class={`
    grid place-items-center
    py-24 px-8
    fixed inset-0 z-10
    bg-black bg-opacity-75
    cursor-zoom-out
  `}
    on:click={closeModal}
    on:keydown={(e) => {
      if (e.key === "Escape") closeModal()
    }}
    aria-hidden={modalOpen ? "false" : "true"}
    in:fade={{ duration: 100 }}
    out:fade={{ duration: 100 }}
  >
    <aside
      class="cursor-default bg-slate-100 dark:bg-slate-800 rounded-lg w-full max-w-2xl @container"
      on:click={(e) => {
        e.stopPropagation()
      }}
      aria-hidden
      in:fly={{ duration: 100, y: 100 }}
      out:fly={{ duration: 100, y: 100 }}
    >
      <section class="p-8">
        <SearchBox {searchStore} bind:this={searchBox} placeholder="Search HATApedia..." />
      </section>
      <section
        class="p-8 rounded-b-lg bg-slate-200 dark:bg-slate-700 h-96 overflow-y-auto no-scrollbar"
      >
        <ul class="grid gap-4 grid-cols-1 @lg:grid-cols-2">
          {#each $searchStore.results as article}
            <ArticleLinkCard {article} />
          {/each}
        </ul>
      </section>
    </aside>
  </div>
{/if}

<style lang="postcss">
  kbd {
    @apply bg-gray-700;
    @apply rounded border border-gray-500;
    @apply px-1 text-sm;
    @apply text-white;
  }

  /* Detect mobile devices */
  @media (hover: none) {
    .keyboard-shortcut-tooltip {
      @apply hidden;
    }
  }
</style>
