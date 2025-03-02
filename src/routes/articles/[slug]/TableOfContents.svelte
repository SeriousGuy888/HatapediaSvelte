<script lang="ts">
  import TableOfContents from './TableOfContents.svelte';
  import type { TocNode } from "$lib/plugins/remark-heading-tree"
  import { createEventDispatcher } from "svelte"

  interface Props {
    headings: TocNode[];
  }

  let { headings }: Props = $props();

  const dispatch = createEventDispatcher()
</script>

<ul class="text-left text-sm leading-none list-outside ml-6">
  {#each headings as heading}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
    <!--
       This event is fired to automatically close the table of contents on small screens
       when a link is clicked.
    -->
    <li class="w-full" onclick={() => dispatch("toc-click")}>
      <a
        href="#{heading.id}"
        class="w-full inline-block p-1 rounded-sm hover:bg-slate-200 dark:hover:bg-slate-700"
      >
        {heading.value}
      </a>
      {#if heading.children}
        <TableOfContents headings={heading.children} />
      {/if}
    </li>
  {/each}
</ul>
