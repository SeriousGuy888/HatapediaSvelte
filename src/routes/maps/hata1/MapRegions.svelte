<script lang="ts">
  import { worldSpaceToImageSpace } from "./coordinates.svelte"
  import type { MapRegionData } from "./map_marker_types"

  interface Props {
    regions: { [key: string]: MapRegionData }
    width: number
    height: number
    setSelectedRegion: (regionId: string) => void
  }
  const { regions, width, height, setSelectedRegion }: Props = $props()

  function coordsListToPath(coordsList: [number, number][]): string {
    let path = ""
    for (let i = 0; i < coordsList.length; i++) {
      const [x, y] = worldSpaceToImageSpace(...coordsList[i])
      if (i === 0) {
        path += `M ${x} ${y} `
      } else {
        path += `L ${x} ${y} `
      }
    }
    path += "Z"
    return path
  }
</script>

<svg class="absolute inset-0 overflow-visible" viewBox={`0 0 ${width} ${height}`}>
  {#each Object.entries(regions) as [id, region]}
    <path
      d={coordsListToPath(region.coordinates)}
      style:fill="#fff8"
      style:stroke="white"
      style:stroke-width="3"
      class="cursor-pointer outline-0"
      onclick={() => setSelectedRegion(id)}
      onkeypress={() => setSelectedRegion(id)}
      role="button"
      tabindex="0"
    />
  {/each}
</svg>
