<script lang="ts">
  import { ChevronDown } from "lucide-svelte"
  import { createEventDispatcher } from "svelte";

  export let options: Record<string, string>
  export let value: string = Object.keys(options)[0]

  const dispatch = createEventDispatcher()
</script>

{#if !options}
  <p>No options provided for SelectDropdown!</p>
{:else}
  <div class="relative @container-normal/dropdown">
    <select
      class={`
          w-full h-full
          py-2 px-4 rounded-xl
          appearance-none
          focus:outline-none focus:ring-2 focus:border-blue-800
          
          bg-gray-200 dark:bg-gray-700
          border-2 border-gray-300 dark:border-gray-600

          overflow-x-hidden whitespace-nowrap text-ellipsis
        `}
      bind:value={value}
      on:change={() => dispatch("change", value)}
    >
      {#each Object.keys(options) as id}
        <option value={id}>{options[id]}</option>
      {/each}
    </select>
    <span class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
      <ChevronDown size="1.5rem" />
    </span>
  </div>
{/if}
