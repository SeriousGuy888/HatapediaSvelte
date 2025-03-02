<script lang="ts">
  import { createEventDispatcher } from "svelte"

  interface Props {
    options: Record<string, string>;
    value?: string;
  }

  let { options, value = $bindable(Object.keys(options)[0]) }: Props = $props();

  const dispatch = createEventDispatcher()
</script>

{#if !options}
  <p>No options provided for RadioSwitch!</p>
{:else}
  <ul
    class={`
        flex text-center
        rounded-xl
        text-black dark:text-white
        bg-gray-200 dark:bg-gray-700

        divide-x-2 divide-gray-300 dark:divide-gray-600
        border-2 border-gray-300 dark:border-gray-600

        overflow-clip
      `}
  >
    {#each Object.keys(options) as id}
      <li class={`w-full ${value === id ? "bg-blue-800 font-bold text-white" : ""}`}>
        <button
          class="w-full h-full p-2 cursor-pointer"
          onclick={() => {
            value = id
            dispatch("change", id)
          }}
        >
          {options[id]}
        </button>
      </li>
    {/each}
  </ul>
{/if}
