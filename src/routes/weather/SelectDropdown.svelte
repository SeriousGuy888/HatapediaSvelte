<script lang="ts">
  import { ChevronDown } from "lucide-svelte"
  import { createEventDispatcher } from "svelte"

  interface Props {
    options: Record<string, Record<string, string>>;
    value: string;
  }

  let { options, value = $bindable() }: Props = $props();

  const dispatch = createEventDispatcher()
</script>

{#if !options}
  <p>No options provided for SelectDropdown!</p>
{:else}
  <div class="relative">
    <select
      class={`
          w-full h-full
          py-2 px-4 rounded-xl
          appearance-none
          focus:outline-hidden focus:ring-2 focus:border-blue-800
          
          bg-gray-200 dark:bg-gray-700
          border-2 border-gray-300 dark:border-gray-600

          overflow-x-hidden whitespace-nowrap text-ellipsis

          cursor-pointer
        `}
      bind:value
      onchange={() => dispatch("change", value)}
    >
      {#each Object.entries(options) as [optgroupName, subOptions]}
        <optgroup label={optgroupName}>
          {#each Object.keys(subOptions) as subOptionId}
            <option value={subOptionId}>{subOptions[subOptionId]}</option>
          {/each}
        </optgroup>
      {/each}
    </select>
    <span class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
      <ChevronDown size="1.5rem" />
    </span>
  </div>
{/if}
