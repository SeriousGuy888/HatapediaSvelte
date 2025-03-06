<script lang="ts">
  import mapImage from "./map.png"
  import BannerMarker from "./BannerMarker.svelte"
  import { locations } from "./map_locations"
  import type { MapLocation } from "./map_locations"
  import { Plus, Minus } from "lucide-svelte"
  import LocationInfoSheet from "./LocationInfoSheet.svelte"
  import { onMount } from "svelte"
  import { fade } from "svelte/transition"
  import { MAP_DIMENSIONS, MAP_WORLD_ORIGIN_OFFSET, WORLD_DEFAULT_LOCATION } from "./map_config"
  import { cameraState, changeZoom, frameState } from "./view_state.svelte"

  let mapCamera: HTMLDivElement // Contains map frame, but hides overflow, only showing a part of the map frame.
  let mapFrame: HTMLDivElement // Holds the map image, and is transformed around with CSS to zoom and pan.

  // Used for pinch zoom gestures
  // https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events/Pinch_zoom_gestures
  let pointerCache = $state<PointerEvent[]>([])
  let prevPointerSquareDist = $state(-1)

  // Set to true when >=2 pointers. Set to false when ==0 pointers.
  // Used to prevent map markers from being deselected after pinch zooming.
  let hadMultiplePointers = $state(false)

  let isDragging = $state(false)
  let lastDragPosition = $state([0, 0])

  let mapPinContainer: HTMLDivElement // Holds map pins as children
  let selectedPin = $state<string | null>(null)
  let selectedLocation = $derived<MapLocation | null>(selectedPin ? locations[selectedPin] : null)

  onMount(() => {
    const boundingBox = mapCamera.getBoundingClientRect()
    cameraState.left = boundingBox.left
    cameraState.top = boundingBox.top

    // Register event listener here because {passive:false} is needed.
    mapCamera.addEventListener(
      "touchmove",
      (event) => {
        event.preventDefault()
      },
      { passive: false },
    )

    teleportToWorldCoords(...WORLD_DEFAULT_LOCATION)
  })

  let mouseScreenX = $state(0)
  let mouseScreenY = $state(0)
  let [mouseImageX, mouseImageY] = $derived(screenSpaceToImageSpace(mouseScreenX, mouseScreenY))
  let [mouseWorldX, mouseWorldZ] = $derived(imageSpaceToWorldSpace(mouseImageX, mouseImageY))

  function updateMousePos(event: MouseEvent) {
    ;[mouseScreenX, mouseScreenY] = clientSpaceToScreenSpace(event.clientX, event.clientY)
  }

  /**
   * "Clientspace" is the position in the window, with the top left corner of the webpage being 0, 0.
   * "Screenspace" is the position in the view of the camera, with the top left corner of the visible part
   * of the map being 0, 0.
   */
  function clientSpaceToScreenSpace(clientX: number, clientY: number): [number, number] {
    return [clientX - cameraState.left, clientY - cameraState.top]
  }

  function screenSpaceToImageSpace(screenX: number, screenY: number): [number, number] {
    return [
      ~~((screenX + frameState.offsetX) / cameraState.zoom),
      ~~((screenY + frameState.offsetY) / cameraState.zoom),
    ]
  }

  function imageSpaceToWorldSpace(imageX: number, imageY: number): [number, number] {
    return [imageX - MAP_WORLD_ORIGIN_OFFSET[0], imageY - MAP_WORLD_ORIGIN_OFFSET[1]]
  }

  function worldSpaceToImageSpace(worldX: number, worldY: number): [number, number] {
    return [worldX + MAP_WORLD_ORIGIN_OFFSET[0], worldY + MAP_WORLD_ORIGIN_OFFSET[1]]
  }

  function doDrag(x: number, y: number) {
    if (isDragging) {
      frameState.offsetX -= x - lastDragPosition[0]
      frameState.offsetY -= y - lastDragPosition[1]
      lastDragPosition = [x, y]
    }
  }

  function teleportToWorldCoords(worldX: number, worldZ: number) {
    const [imageX, imageY] = worldSpaceToImageSpace(worldX, worldZ)
    frameState.offsetX = imageX * cameraState.zoom - cameraState.width / 2
    frameState.offsetY = imageY * cameraState.zoom - cameraState.height / 2
  }

  function pointerUp(event: PointerEvent) {
    isDragging = false

    // Remove this pointer from the cache
    const idx = pointerCache.findIndex((cachedEvent) => cachedEvent.pointerId === event.pointerId)
    if (idx >= 0) {
      pointerCache.splice(idx, 1)
    }

    // If less than two fingers on the screen, reset the zooming distance cache.
    if (pointerCache.length < 2) {
      prevPointerSquareDist = -1
      hadMultiplePointers = false
    }
  }

  let bottomSheetShown = $state(false)
  let isLoaded = $state(false)
</script>

<svelte:head>
  <title>Map</title>
</svelte:head>

<div
  bind:this={mapCamera}
  bind:clientWidth={cameraState.width}
  bind:clientHeight={cameraState.height}
  class="relative overflow-hidden"
  style:cursor={isDragging ? "grabbing" : "grab"}
  role="presentation"
  onpointerdown={(event) => {
    pointerCache.push(event)
    if (pointerCache.length >= 2) {
      hadMultiplePointers = true
    }

    updateMousePos(event)
    lastDragPosition = [mouseScreenX, mouseScreenY]
  }}
  onpointermove={(event) => {
    updateMousePos(event)

    if (
      pointerCache.length > 0 &&
      (mouseScreenX != lastDragPosition[0] || mouseScreenY != lastDragPosition[1])
    ) {
      isDragging = true
    }

    // Write to the cache this current event as the latest event pertaining to this pointer.
    const idx = pointerCache.findIndex((cachedEvent) => cachedEvent.pointerId === event.pointerId)
    pointerCache[idx] = event

    if (pointerCache.length === 1) {
      doDrag(mouseScreenX, mouseScreenY)
    } else if (pointerCache.length === 2) {
      // If two fingers/styluses on screen
      const currSquareDist =
        (pointerCache[0].clientX - pointerCache[1].clientX) ** 2 +
        (pointerCache[0].clientY - pointerCache[1].clientY) ** 2

      // The midpoint in screenspace between the two pointers.
      const [centerX, centerY] = clientSpaceToScreenSpace(
        (pointerCache[0].clientX + pointerCache[1].clientX) / 2,
        (pointerCache[0].clientY + pointerCache[1].clientY) / 2,
      )

      if (prevPointerSquareDist > 0) {
        if (currSquareDist > prevPointerSquareDist) {
          changeZoom("in", centerX, centerY)
        } else if (currSquareDist < prevPointerSquareDist) {
          changeZoom("out", centerX, centerY)
        }
      }

      prevPointerSquareDist = currSquareDist
    }
  }}
  onpointerup={(event) => {
    // Deselect the selected map pin only if the pointer was released without dragging (i.e. a single click.)
    if (!isDragging) {
      selectedPin = null
    }
    pointerUp(event)
  }}
  onpointercancel={pointerUp}
  onpointerleave={pointerUp}
  onwheel={(event) => {
    event.preventDefault()
    changeZoom(event.deltaY > 0 ? "out" : "in", mouseScreenX, mouseScreenY)
  }}
>
  {#if !isLoaded}
    <section
      id="loading-overlay"
      class={`
        absolute inset-0 z-30
        grid place-items-center
        bg-background/95 text-foreground text-xl
        select-none pointer-events-none
      `}
      transition:fade={{ duration: 500 }}
    >
      <p>Loading map...</p>
    </section>
  {/if}

  <div
    bind:this={mapFrame}
    class="absolute select-none shadow-xl shadow-gray-700"
    style:width={`${MAP_DIMENSIONS.width * cameraState.zoom}px`}
    style:height={`${MAP_DIMENSIONS.height * cameraState.zoom}px`}
    style:left={`${-frameState.offsetX}px`}
    style:top={`${-frameState.offsetY}px`}
    role="button"
    tabindex="0"
    onkeypress={null}
  >
    <img
      src={mapImage}
      id="map-image"
      class="w-full h-full pointer-events-none"
      style:image-rendering="pixelated"
      alt=""
      onload={() => (isLoaded = true)}
      onerror={() => {
        alert("Failed to load map image.")
        isLoaded = true
      }}
    />
    <div bind:this={mapPinContainer} class="absolute inset-0">
      {#each Object.keys(locations) as locationId}
        {@const location = locations[locationId]}
        {@const [imageX, imageY] = worldSpaceToImageSpace(...location.coordinates)}
        {@const xPosRatio = imageX / MAP_DIMENSIONS.width}
        {@const yPosRatio = imageY / MAP_DIMENSIONS.height}

        <BannerMarker
          name={location.name}
          colour={location.banner ?? "white"}
          {xPosRatio}
          {yPosRatio}
          selected={selectedPin == locationId}
          onclick={(event) => {
            event.stopPropagation() // prevent click event from passing through & clicking the map behind this pin
            selectedPin = locationId
          }}
        ></BannerMarker>
      {/each}
    </div>
  </div>
  <nav
    class="absolute top-2 left-2 flex flex-col rounded border-2 bg-background border-foreground z-10"
  >
    <button
      class="cursor-pointer p-1 hover:bg-brand/20"
      onclick={() => changeZoom("in", cameraState.width / 2, cameraState.height / 2)}
      aria-label="Zoom in"
    >
      <Plus class="w-4 h-4" />
    </button>
    <button
      class="cursor-pointer p-1 hover:bg-brand/20"
      onclick={() => changeZoom("out", cameraState.width / 2, cameraState.height / 2)}
      aria-label="Zoom out"
    >
      <Minus class="w-4 h-4" />
    </button>
  </nav>
  <nav class="absolute top-2 right-2 z-10 flex flex-col gap-2 items-end">
    <div
      class={`
      p-1 bg-background
      rounded border-2 border-foreground
      cursor-not-allowed pointer-events-none
      font-mono w-fit
    `}
    >
      <p>{mouseWorldX}, {mouseWorldZ}</p>
    </div>
  </nav>
</div>

<LocationInfoSheet expanded={bottomSheetShown} location={selectedLocation} />
