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
  let frameOffsetX = $state(0)
  let frameOffsetY = $state(0)

  let isDragging = $state(false)
  let lastDragPosition = $state([0, 0])

  const minZoom = 1 / 16
  const maxZoom = 8
  const zoomFactor = 9 / 8
  let zoom = $state(0.5)

  $effect(() => {
    if (mapCamera) {
      const boundingBox = mapCamera.getBoundingClientRect()
      cameraLeft = boundingBox.left
      cameraTop = boundingBox.top
    }
  })

  function beginDrag(mouseX: number, mouseY: number) {
    isDragging = true
    lastDragPosition = [mouseX, mouseY]
  }

  function endDrag() {
    isDragging = false
  }

  function doDrag(mouseX: number, mouseY: number) {
    if (isDragging) {
      frameOffsetX -= mouseX - lastDragPosition[0]
      frameOffsetY -= mouseY - lastDragPosition[1]
      lastDragPosition = [mouseX, mouseY]
    }
  }

  /**
   * @param direction Zoom in or zoom out?
   * @param centerX Screenspace x coordinate around which zooming should occur.
   * @param centerY Screenspace y coordinate around which zooming should occur.
   */
  function changeZoom(direction: "in" | "out", centerX: number, centerY: number) {
    const oldZoom = zoom

    if (direction == "in") {
      zoom = Math.min(zoom * zoomFactor, maxZoom)
    } else if (direction == "out") {
      zoom = Math.max(zoom / zoomFactor, minZoom)
    }

    // Adjust offset to make sure that the zooming is happening around the cursor location.
    frameOffsetX = zoom * (frameOffsetX / oldZoom + centerX / oldZoom - centerX / zoom)
    frameOffsetY = zoom * (frameOffsetY / oldZoom + centerY / oldZoom - centerY / zoom)
  }
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
  onmousedown={(event) => beginDrag(event.clientX, event.clientY)}
  onmouseup={endDrag}
  onmousemove={(event) => doDrag(event.clientX, event.clientY)}
  ontouchstart={(event) => {
    if (event.touches.length === 1) {
      beginDrag(event.touches[0].clientX, event.touches[0].clientY)
    } else {
      console.log("multiple touches not implemented yet")
    }
  }}
  ontouchend={endDrag}
  ontouchmove={(event) => {
    if (event.touches.length === 1) {
      doDrag(event.touches[0].clientX, event.touches[0].clientY)
    } else {
      console.log("multiple touches not implemented yet")
    }
  }}
  onwheel={(event) => {
    // Screenspace Coordinates
    const mouseX = event.clientX - cameraLeft
    const mouseY = event.clientY - cameraTop

    changeZoom(event.deltaY > 0 ? "out" : "in", mouseX, mouseY)
  }}
>
  <div
    bind:this={mapFrame}
    class="absolute select-none shadow-xl shadow-gray-700"
    style:width={`${MAP_DIMENSIONS.width * zoom}px`}
    style:height={`${MAP_DIMENSIONS.height * zoom}px`}
    style:left={`${-frameOffsetX}px`}
    style:top={`${-frameOffsetY}px`}
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

<aside class="absolute left-2 bottom-2 p-2 bg-background border-2 rounded font-mono">
  <p>isDragging = {isDragging}</p>
  <p>lastDragPosition = {lastDragPosition}</p>
  <p>offsets: {[~~frameOffsetX, ~~frameOffsetY]}</p>
</aside>
