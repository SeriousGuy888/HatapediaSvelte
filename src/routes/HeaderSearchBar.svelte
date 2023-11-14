<script>
  import { Search } from "lucide-svelte"

  let searchModalOpen = false
  function openSearchModal() {}
</script>

<button on:click={openSearchModal} aria-label="Open the search modal">
  <Search size="24" />
</button>

<!-- Search Modal -->
<div class={`${searchModalOpen ? "block" : "hidden"}`}>
  <div class="fixed inset-0 bg-black bg-opacity-50" />
  <div class="fixed inset-0 flex justify-center items-center">
    <div class="bg-white dark:bg-gray-800 rounded-lg p-8">
      <div class="relative w-full sm:max-w-3xl">
        <input
          type="text"
          class="appearance-none bg-transparent p-2 focus:outline-none border-b-2 border-blue-600 dark:border-blue-400 w-full sm:text-xl"
          placeholder="Search for an article..."
        />
        <Search class="absolute right-2 top-2 w-6 h-6 text-blue-600 dark:text-blue-400" />
      </div>
    </div>
  </div>
</div>
