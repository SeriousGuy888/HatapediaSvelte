<script lang="ts">
  import type { TocNode } from "$lib/plugins/remark-heading-tree"

  export let headings: TocNode[]
</script>

<ul class="text-left text-sm leading-none list-outside ml-3">
  {#each headings as heading}
    <li class="w-full">
      <a
        href="#{heading.id}"
        class="w-full inline-block p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700"
      >
        {heading.value}
      </a>
      {#if heading.children}
        <svelte:self headings={heading.children} />
      {/if}
    </li>
  {/each}
</ul>
