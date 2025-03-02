<script lang="ts">
  import { createEventDispatcher } from "svelte"

  interface Props {
    currPage: number;
    maxPage: number;
  }

  let { currPage, maxPage }: Props = $props();

  const IMAGES = {
    PAGE: "/book_and_quill/page.png",
    COVER: "/book_and_quill/cover.png",
    PREV: "/book_and_quill/prev.png",
    PREV_HOVER: "/book_and_quill/prev_hover.png",
    NEXT: "/book_and_quill/next.png",
    NEXT_HOVER: "/book_and_quill/next_hover.png",
  }

  let isPrevHovered = $state(false)
  let isNextHovered = $state(false)

  const dispatch = createEventDispatcher()
</script>

<div class="aspect-146/180 w-full relative select-none">
  <img
    src={currPage === 0 ? IMAGES.COVER : IMAGES.PAGE}
    aria-hidden
    alt=""
    width="146"
    height="180"
    class="absolute m-0 w-full top-0 left-0 z-10 book-bg"
    draggable="false"
  />
  <button
    class="left-[17.8%] top-[87.8%] {currPage === 0 ? 'hidden' : 'block'}"
    onmouseenter={() => (isPrevHovered = true)}
    onmouseleave={() => (isPrevHovered = false)}
    onclick={() => dispatch("click_prev")}
  >
    <img
      src={isPrevHovered ? IMAGES.PREV_HOVER : IMAGES.PREV}
      alt="Previous Page"
      draggable="false"
    />
  </button>
  <button
    class="left-[67.9%] top-[87.8%] {currPage === maxPage ? 'hidden' : 'block'}"
    onmouseenter={() => (isNextHovered = true)}
    onmouseleave={() => (isNextHovered = false)}
    onclick={() => dispatch("click_next")}
  >
    <img src={isNextHovered ? IMAGES.NEXT_HOVER : IMAGES.NEXT} alt="Next Page" draggable="false" />
  </button>
</div>

<style>
  button {
    width: 10%;
    aspect-ratio: 9/5; /* Dimensions of the images are 18x10 */

    position: absolute;
    z-index: 20;

    & > img {
      margin: 0;
      width: 100%;
      height: 100%;
    }
  }
</style>
