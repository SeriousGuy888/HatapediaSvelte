<script lang="ts">
  import type { MouseEventHandler } from "svelte/elements"
  import type { BannerColour } from "./map_marker_types"

  const BANNER_MARKER_URL_PATH = "/banner_markers/banner_"
  const SMALL_SIZE = 16
  const LARGE_SIZE = 32

  interface Props {
    colour: BannerColour
    name: string
    xPosRatio: number // A number in [0, 1] representing how far from the left of the parent this should be positioned.
    yPosRatio: number
    selected: boolean
    onclick: MouseEventHandler<HTMLButtonElement>
  }

  let { colour, name, xPosRatio, yPosRatio, selected = false, onclick }: Props = $props()
</script>

<button
  class="absolute cursor-pointer pointer-events-auto"
  style:left={xPosRatio * 100 + "%"}
  style:top={yPosRatio * 100 + "%"}
  style:translate="-50% -100%"
  tabindex="0"
  {onclick}
>
  <img
    src={BANNER_MARKER_URL_PATH + colour + ".png"}
    alt={name}
    style:image-rendering="pixelated"
    width={selected ? LARGE_SIZE : SMALL_SIZE + "px"}
    height={selected ? LARGE_SIZE : SMALL_SIZE + "px"}
    class="pointer-events-none transition-all"
  />
</button>
