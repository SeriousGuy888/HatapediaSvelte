<script lang="ts">
  import type { TocNode } from "$lib/plugins/remark-heading-tree"
  import { createEventDispatcher } from "svelte"

  export let headings: TocNode[]

  const dispatch = createEventDispatcher()
</script>

<ul class="text-left text-sm leading-none list-outside ml-3">
  {#each headings as heading}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <!--
       This event is fired to automatically close the table of contents on small screens
       when a link is clicked.
    -->
    <li class="w-full" on:click={() => dispatch("toc-click")}>
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
