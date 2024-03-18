<script lang="ts">
  import MinecraftTextRenderer from "./MinecraftTextRenderer.svelte"
  import BookAndQuillUi from "./BookAndQuillUi.svelte"
  import type { MinecraftTextComponent } from "./book_and_quill_interfaces"

  // https://minecraft.wiki/w/Written_Book#Data_values
  export let pages: string[] = []
  export let title: string | null = null
  export let author: string | null = null
  export let generation: number | null = null

  let page = 1
  let maxPage = pages.length

  function gotoNextPage() {
    if (page < maxPage) {
      page += 1
    }
  }

  function gotoPrevPage() {
    if (page > 1) {
      page -= 1
    }
  }

  let currPageData: MinecraftTextComponent = {}
  $: {
    page
    try {
      currPageData = JSON.parse(pages[page - 1])
    } catch (e) {
      currPageData = { text: "Error parsing page data: " + e, color: "red" }
      console.error(e)
    }
  }

  let fontSize = 18
  let bookContainer: HTMLDivElement | null = null

  $: {
    if (bookContainer) {
      new ResizeObserver(() => {
        if (!bookContainer) return

        const containerHeight = bookContainer.clientHeight
        // 22.5 is some arbitrary constant that makes the font size look about
        // the same as it does in game
        fontSize = containerHeight / 22.5
      }).observe(bookContainer)
    }
  }
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
  <div class="absolute right-[13.7%] top-[8.3%] z-30 text-right">
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <p
      class="m-0"
      on:keypress={() => {
        /* makes a11y warning go away */
      }}
      on:click={(e) => {
        if (e.shiftKey || e.ctrlKey || e.altKey) {
          alert(`/give @p written_book${JSON.stringify({ pages, title, author, generation })} 1`)
        }
      }}
    >
      Page {page} of {maxPage}
    </p>
  </div>
  <div class="absolute left-[11%] top-[16.1%] z-20 w-[78.1%] [&>*]:m-0 leading-tight break-words">
    <MinecraftTextRenderer textData={currPageData} />
  </div>
</div>
