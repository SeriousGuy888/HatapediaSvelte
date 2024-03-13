<script lang="ts">
  import { articleSearchConfig, allArticleMeta } from "$lib/stores/article_store"
  import { createSearchStore, handleSearch } from "$lib/stores/search"
  import { Search } from "lucide-svelte"
  import { onDestroy } from "svelte"
  import SearchBox from "./SearchBox.svelte"
  import ArticleLinkCard from "$lib/components/ArticleLinkCard.svelte"
  import { browser } from "$app/environment"
  import { fade, fly } from "svelte/transition"
  import { goto } from "$app/navigation"

  const searchStore = createSearchStore($allArticleMeta, articleSearchConfig)
  let unsubscribe = searchStore.subscribe((value) => handleSearch(value))
  onDestroy(() => unsubscribe())

  let selectedResultIndex = 0

  let searchBox: SearchBox | null = null
  let modalOpen = false

  function openModal() {
    modalOpen = true
    $searchStore.query = ""
    selectedResultIndex = 0

    focusSearchBox()
  }

  function closeModal() {
    modalOpen = false
  }

  function focusSearchBox() {
    // Modal element might not exist yet, so we wait for the next tick
    setTimeout(() => {
      searchBox?.focus()
    }, 0)
  }
</script>

<!-- Button to open search -->
<button on:click={openModal} aria-label="Open the search modal" class="flex gap-4 align-middle">
  <div class="hidden sm:flex gap-1 hide-on-touch">
    <kbd>{browser && navigator.platform.match(/Mac/) ? "⌘" : "Ctrl"}</kbd>
    <kbd>K</kbd>
  </div>
  <Search size="24" />
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
    select-none
  `}
    on:click={closeModal}
    on:keydown={(e) => {
      switch (e.key) {
        case "Escape":
          closeModal()
          break
        case "ArrowDown":
          e.preventDefault()
          selectedResultIndex = Math.min(selectedResultIndex + 1, $searchStore.results.length - 1)
          break
        case "ArrowUp":
          e.preventDefault()
          selectedResultIndex = Math.max(selectedResultIndex - 1, 0)
          break
        case "Enter":
          if ($searchStore.results.length > 0) {
            goto(`/articles/${$searchStore.results[selectedResultIndex].slug}`)
            closeModal()
          }
          break
        default:
          focusSearchBox()
          break
      }
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
          {#each $searchStore.results as article, i}
            <ArticleLinkCard
              {article}
              selected={selectedResultIndex === i}
              on:navigate={closeModal}
            />
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
</style>
