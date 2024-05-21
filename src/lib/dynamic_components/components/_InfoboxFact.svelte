<script lang="ts">
  export let title: string
  export let value: string | string[] | undefined
</script>

<dt class="uppercase font-normal text-gray-600 dark:text-gray-300 print:text-black text-xs m-0">
  {title}
</dt>

{#if value instanceof Array && value.length > 1}
  {#each value as item}
    <dd>{item}</dd>
  {/each}
{:else}
  <dd>{value ?? "Unknown"}</dd>
{/if}

<style lang="postcss">
  dd {
    @apply text-black dark:text-white print:text-black my-0 text-base;
  }
</style>
