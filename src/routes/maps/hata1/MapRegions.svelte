<script lang="ts">
  import { ZoomIn } from "lucide-svelte"
  import { clientSpaceToWorldSpace, worldSpaceToImageSpace } from "./coordinates.svelte"
  import type { MapRegionData } from "./map_marker_types"
  import { getSelectedRegion } from "./map_markers.svelte"
  import { cameraState } from "./view_state.svelte"

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

  let selectedRegion: MapRegionData | null = $derived(getSelectedRegion())
  let prevDragPos: [number, number] | null = $state(null)
  let draggingVertIdx: number | null = $state(null)
</script>

<svg
  class="absolute inset-0 overflow-visible"
  viewBox={`0 0 ${width} ${height}`}
  role="none"
  onmousemove={(e) => {
    if (selectedRegion === null || prevDragPos === null || draggingVertIdx === null) {
      return
    }

    if (e.buttons === 1) {
      const [worldX, worldZ] = clientSpaceToWorldSpace(e.clientX, e.clientY)
      selectedRegion.coordinates[draggingVertIdx] = [worldX, worldZ]
      prevDragPos = [worldX, worldZ]
    }
  }}
  onmouseup={() => {
    prevDragPos = null
    draggingVertIdx = null
  }}
>
  {#each Object.entries(regions) as [id, region]}
    <path
      d={coordsListToPath(region.coordinates)}
      style:fill="#fff8"
      style:stroke="#fffc"
      style:stroke-width="1"
      class="cursor-pointer outline-0"
      onclick={() => setSelectedRegion(id)}
      onkeypress={() => setSelectedRegion(id)}
      role="button"
      tabindex="0"
    />
  {/each}

  {#if selectedRegion}
    {#each selectedRegion.coordinates as [worldX, worldY], vertIdx}
      {@const [imageX, imageY] = worldSpaceToImageSpace(worldX, worldY)}
      {@const [imageXNext, imageYNext] = worldSpaceToImageSpace(
        ...selectedRegion.coordinates[(vertIdx + 1) % selectedRegion.coordinates.length],
      )}

      <line
        x1={imageX}
        y1={imageY}
        x2={imageXNext}
        y2={imageYNext}
        stroke-width={4 / cameraState.zoom}
        stroke="#ff0"
        class="cursor-alias"
        role="none"
        tabindex="-1"
        onclick={(e) => {
          const [worldX, worldY] = clientSpaceToWorldSpace(e.clientX, e.clientY)
          selectedRegion.coordinates.splice(vertIdx + 1, 0, [worldX, worldY])
        }}
      />

      <circle
        cx={imageX}
        cy={imageY}
        r={8 / cameraState.zoom}
        stroke-width={1 / cameraState.zoom}
        fill="#f00"
        stroke="#ff0"
        class="cursor-move"
        role="none"
        tabindex="-1"
        onmousedown={(e) => {
          e.preventDefault()
          prevDragPos = clientSpaceToWorldSpace(e.clientX, e.clientY)
          draggingVertIdx = vertIdx
        }}
        oncontextmenu={(e) => {
          // i can't get the right-click event to fire
          e.preventDefault()
          selectedRegion.coordinates.splice(vertIdx, 1)
        }}
      />
    {/each}
  {/if}
</svg>
