<script lang="ts">
  import { run } from 'svelte/legacy';

  import MinecraftTextRenderer from "./MinecraftTextRenderer.svelte"
  import BookAndQuillUi from "./BookAndQuillUi.svelte"
  import type { MinecraftTextComponent } from "./book_and_quill_interfaces"

  
  interface Props {
    // https://minecraft.wiki/w/Written_Book#Data_values
    pages?: string[];
    title?: string | null;
    author?: string | null;
    generation?: number | null;
  }

  let {
    pages = [],
    title = null,
    author = null,
    generation = null
  }: Props = $props();

  let page = $state(0)
  let maxPage = pages.length

  function gotoNextPage() {
    if (page < maxPage) {
      page += 1
    }
  }

  function gotoPrevPage() {
    if (page > 0) {
      page -= 1
    }
  }

  let currPageData: MinecraftTextComponent = $state({})
  run(() => {
    page
    try {
      currPageData = JSON.parse(pages[page - 1])
    } catch (e) {
      currPageData = { text: "Error parsing page data: " + e, color: "red" }
      console.error(e)
    }
  });

  let fontSize = $state(18)
  let bookContainer: HTMLDivElement | null = $state(null)

  run(() => {
    if (bookContainer) {
      new ResizeObserver(() => {
        if (!bookContainer) return

        const containerHeight = bookContainer.clientHeight
        // 22.5 is some arbitrary constant that makes the font size look about
        // the same as it does in game
        fontSize = containerHeight / 22.5
      }).observe(bookContainer)
    }
  });
</script>

<div
  class="relative text-black font-minecraft isolate"
  style="font-size: {fontSize}px; image-rendering: pixelated;"
  bind:this={bookContainer}
>
  <BookAndQuillUi
    on:click_prev={gotoPrevPage}
    on:click_next={gotoNextPage}
    currPage={page}
    {maxPage}
  />
  {#if page !== 0}
    <div class="absolute right-[13.7%] top-[8.3%] z-30 text-right">
      <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
      <p
        class="m-0"
        onkeypress={() => {
          /* makes a11y warning go away */
        }}
        onclick={(e) => {
          if (e.shiftKey || e.ctrlKey || e.altKey) {
            alert(`/give @p written_book${JSON.stringify({ pages, title, author, generation })} 1`)
          }
        }}
      >
        Page {page} of {maxPage}
      </p>
    </div>
  {/if}
  <div class="leading-tight break-words [&>*]:z-20 [&>*]:m-0">
    {#if page !== 0}
      <div class="absolute left-[11%] top-[16.1%] w-[78.1%]">
        <MinecraftTextRenderer textData={currPageData} />
      </div>
    {:else}
      <div class="absolute left-[16.4%] right-[12%] top-[18%] bottom-[56%] grid items-center text-center">
        <MinecraftTextRenderer
          textData={{
            text: title ?? "Untitled",
            color: "white",
            bold: true,
          }}
        />
      </div>
      <div class="absolute left-[16.4%] right-[12%] top-[62%] text-center">
        <MinecraftTextRenderer
          textData={{
            text: "by " + (author ?? "Unknown Author"),
            color: "gray",
          }}
        />
      </div>
    {/if}
  </div>
</div>
