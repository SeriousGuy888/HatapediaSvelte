<script lang="ts">
  import { onMount, type Component } from "svelte"
  import { fade } from "svelte/transition"
  import { Plus, Minus } from "lucide-svelte"

  import mapImage from "./map.png"
  import LocationInfoSheet from "./LocationInfoSheet.svelte"

  import { MAP_DIMENSIONS, WORLD_DEFAULT_LOCATION } from "./map_config"
  import { userState, cameraState, changeZoom, frameState } from "./view_state.svelte"
  import {
    clientSpaceToScreenSpace,
    imageSpaceToWorldSpace,
    screenSpaceToImageSpace,
    worldSpaceToImageSpace,
  } from "./coordinates.svelte"

  import MapMarkers from "./MapMarkers.svelte"
  import RegionEditor from "./RegionEditor.svelte"
  import { getSelectedLocation, locationSelection } from "./map_markers.svelte.ts"

  let mapCamera: HTMLDivElement // Contains map frame, but hides overflow, only showing a part of the map frame.
  let mapFrame: HTMLDivElement // Holds the map image, and is transformed around with CSS to zoom and pan.
  // let markerContainer: HTMLDivElement | null = $state(null) // Holds the map markers.
  let uiContainer: HTMLElement // Holds the UI elements like the zoom buttons and the location info sheet.

  // Used for pinch zoom gestures
  // https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events/Pinch_zoom_gestures
  let pointerCache = $state<PointerEvent[]>([])
  let prevPointerSquareDist = $state(-1)

  // Set to true when >=2 pointers. Set to false when ==0 pointers.
  // Used to prevent map markers from being deselected after pinch zooming.
  let hadMultiplePointers = $state(false)

  let isDragging = $state(false)
  let lastDragPosition = $state([0, 0])

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

  function doDrag(x: number, y: number) {
    if (isDragging) {
      frameState.offsetX -= x - lastDragPosition[0]
      frameState.offsetY -= y - lastDragPosition[1]
      lastDragPosition = [x, y]
    }
  }

  function doPan(direction: "left" | "right" | "up" | "down") {
    const stepSize = 50
    switch (direction) {
      case "left":
        frameState.offsetX -= stepSize
        break
      case "right":
        frameState.offsetX += stepSize
        break
      case "up":
        frameState.offsetY -= stepSize
        break
      case "down":
        frameState.offsetY += stepSize
        break
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

  let bottomSheetShown = $state(true)
  let isLoaded = $state(false)

  const title = "HATA 1 World Map"
  const description =
    "An interactive map of the HATA 1 overworld, marked with notable locations on the server world."
</script>

<svelte:head>
  <title>{title}</title>
  <meta property="description" content={description} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content="https://www.hatapedia.xyz/maps/hata1" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="HATApedia" />
</svelte:head>

<div
  bind:this={mapCamera}
  bind:clientWidth={cameraState.width}
  bind:clientHeight={cameraState.height}
  class="relative overflow-hidden isolate"
  style:cursor={isDragging ? "grabbing" : "grab"}
  role="presentation"
  onpointerdown={(event) => {
    if (uiContainer.contains(event.target as Node)) {
      return
    }

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
    if (uiContainer.contains(event.target as Node)) {
      return
    }

    // Deselect the selected map pin only if the pointer was released without dragging (i.e. a single click.)
    if (!isDragging && userState.mode !== "edit") {
      locationSelection.selectedLocationId = null
    }

    pointerUp(event)
  }}
  onpointercancel={pointerUp}
  onpointerleave={pointerUp}
  onwheel={(event) => {
    event.preventDefault()
    changeZoom(event.deltaY > 0 ? "out" : "in", mouseScreenX, mouseScreenY)
  }}
  onkeydown={(event) => {
    console.log(event.key)
    if (document.activeElement !== mapFrame) {
      return
    }
    switch (event.key) {
      case "w":
      case "ArrowUp":
        doPan("up")
        break
      case "a":
      case "ArrowLeft":
        doPan("left")
        break
      case "s":
      case "ArrowDown":
        doPan("down")
        break
      case "d":
      case "ArrowRight":
        doPan("right")
        break
      case "=":
      case "+":
      case "Shift": // Fly down like in Minecraft
        changeZoom("in", cameraState.width / 2, cameraState.height / 2)
        break
      case "-":
      case "_":
      case " ": // Fly up like in Minecraft
        changeZoom("out", cameraState.width / 2, cameraState.height / 2)
        break
      case "Escape":
        locationSelection.selectedLocationId = null
        break
      case "F2":
        event.preventDefault()
        userState.mode = userState.mode === "view" ? "edit" : "view"
        break
    }
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
    <MapMarkers />
  </div>
  <nav bind:this={uiContainer} class="absolute inset-2 z-20 pointer-events-none">
    <section
      class="absolute top-0 left-0 flex flex-col gap-2 items-start pointer-events-none select-none"
    >
      <div
        class="flex flex-col rounded border-2 bg-background border-foreground pointer-events-auto"
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
      </div>
      <div
        class="p-1 bg-background rounded border-2 border-foreground text-sm pointer-events-auto cursor-default"
      >
        <p class="text-xs font-bold tracking-widest text-center mb-1">LAYERS</p>
        <p>
          <input
            class="cursor-pointer"
            type="checkbox"
            id="show-pins"
            bind:checked={userState.displayPins}
          />
          <label class="cursor-pointer tracking-tight" for="show-pins">Pins</label>
        </p>
        <p>
          <input
            class="cursor-pointer"
            type="checkbox"
            id="show-regions"
            bind:checked={userState.displayRegions}
          />
          <label class="cursor-pointer tracking-tight" for="show-regions">Regions</label>
        </p>
      </div>
    </section>
    <section
      class="absolute top-0 right-0 flex flex-col gap-2 items-end pointer-events-none select-none"
    >
      <div
        class={`
          p-1 bg-background
          rounded border-2 border-foreground
          font-mono w-fit
        `}
      >
        <p>{mouseWorldX}, {mouseWorldZ}</p>
      </div>
      {#if userState.mode !== "view"}
        <div class="p-1 bg-background rounded border-2 border-foreground font-mono">
          <p>{userState.mode.toUpperCase()}</p>
        </div>
        <RegionEditor />
      {/if}
    </section>
    <LocationInfoSheet expanded={bottomSheetShown} marker={getSelectedLocation()} />
  </nav>
</div>
