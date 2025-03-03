<script lang="ts">
  import mapImage from "./map.png"

  const MAP_DIMENSIONS = {
    width: 10001,
    height: 10001,
  }

  let mapContainer: HTMLDivElement
  let containerWidth = $state(0)
  let containerHeight = $state(0)
  let offsetX = $state(MAP_DIMENSIONS.width / 2)
  let offsetY = $state(MAP_DIMENSIONS.height / 2)

  let isDragging = $state(false)
  let lastDragPosition = $state([0, 0])
</script>

<svelte:head>
  <title>Map</title>
</svelte:head>

<div
  class="relative overflow-hidden"
  class:cursor-grabbing={isDragging}
  bind:clientWidth={containerWidth}
  bind:clientHeight={containerHeight}
  role="presentation"
  onmousedown={(event) => {
    isDragging = true
    lastDragPosition = [event.clientX, event.clientY]
  }}
  onmousemove={(event) => {
    if (event.buttons === 1) {
      offsetX -= event.clientX - lastDragPosition[0]
      offsetY -= event.clientY - lastDragPosition[1]
      lastDragPosition = [event.clientX, event.clientY]
    }
  }}
  onmouseup={() => {
    isDragging = false
  }}
>
  <div
    bind:this={mapContainer}
    id="map-container"
    class="absolute select-none"
    style:width={`${MAP_DIMENSIONS.width}px`}
    style:height={`${MAP_DIMENSIONS.height}px`}
    style:left={`-${offsetX + containerWidth / 2}px`}
    style:top={`-${offsetY + containerWidth / 2}px`}
  >
    <img src={mapImage} id="map-image" class="w-full h-full pointer-events-none" alt="" />
  </div>
</div>
