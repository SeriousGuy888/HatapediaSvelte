<script lang="ts">
  import mapImage from "./map.png"

  const MAP_DIMENSIONS = {
    width: 10001,
    height: 10001,
  }

  let mapCamera: HTMLDivElement // Contains map frame, but hides overflow, only showing a part of the map frame.
  let cameraWidth = $state(0)
  let cameraHeight = $state(0)
  let cameraLeft = $state(0) // How far the camera div is offset from the left edge of the window.
  let cameraTop = $state(0)

  let mapFrame: HTMLDivElement // Holds the map image, and is transformed around with CSS to zoom and pan.
  let frameOffsetX = $state(MAP_DIMENSIONS.width / 2)
  let frameOffsetY = $state(MAP_DIMENSIONS.height / 2)

  let isDragging = $state(false)
  let lastDragPosition = $state([0, 0])

  const minZoom = 1 / 16
  const maxZoom = 8
  const zoomFactor = 9 / 8
  let zoom = $state(1)

  $effect(() => {
    if (mapCamera) {
      const boundingBox = mapCamera.getBoundingClientRect()
      cameraLeft = boundingBox.left
      cameraTop = boundingBox.top
    }
  })
</script>

<svelte:head>
  <title>Map</title>
</svelte:head>

<div
  bind:this={mapCamera}
  bind:clientWidth={cameraWidth}
  bind:clientHeight={cameraHeight}
  class="relative overflow-hidden"
  style:cursor={isDragging ? "grabbing" : "grab"}
  role="presentation"
  onmousedown={(event) => {
    isDragging = true
    lastDragPosition = [event.clientX, event.clientY]
  }}
  onmousemove={(event) => {
    if (event.buttons === 1) {
      frameOffsetX -= event.clientX - lastDragPosition[0]
      frameOffsetY -= event.clientY - lastDragPosition[1]
      lastDragPosition = [event.clientX, event.clientY]
    }
  }}
  onmouseup={() => {
    isDragging = false
  }}
  onwheel={(event) => {
    // Screenspace Coordinates
    const mouseX = event.clientX - cameraLeft
    const mouseY = event.clientY - cameraTop
    // console.log(mouseX, mouseY)

    const oldZoom = zoom

    if (event.deltaY > 0) {
      // Scrolled down; zoom out.
      zoom = Math.max(zoom / zoomFactor, minZoom)
    } else if (event.deltaY < 0) {
      // Scrolled up; zoom in.
      zoom = Math.min(zoom * zoomFactor, maxZoom)
    }

    // Adjust offset to make sure that the zooming is happening around the cursor location.
    frameOffsetX = zoom * (frameOffsetX / oldZoom + mouseX / oldZoom - mouseX / zoom)
    frameOffsetY = zoom * (frameOffsetY / oldZoom + mouseY / oldZoom - mouseY / zoom)
  }}
>
  <div
    bind:this={mapFrame}
    class="absolute select-none"
    style:width={`${MAP_DIMENSIONS.width * zoom}px`}
    style:height={`${MAP_DIMENSIONS.height * zoom}px`}
    style:left={`-${frameOffsetX}px`}
    style:top={`-${frameOffsetY}px`}
  >
    <img
      src={mapImage}
      id="map-image"
      class="w-full h-full pointer-events-none"
      style:image-rendering="pixelated"
      alt=""
    />
  </div>
</div>
