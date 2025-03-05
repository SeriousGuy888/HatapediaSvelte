<script lang="ts">
  import { ChevronDown, ChevronUp } from "lucide-svelte"
  import type { MapLocation } from "./map_locations"

  interface Props {
    expanded: boolean
    location: MapLocation | null
  }
  let { expanded, location }: Props = $props()

  let isSwiping = $state(false)
  let initialSwipePos = $state([0, 0])
</script>

<div class="fixed bottom-0 inset-x-1 pointer-events-none">
  <aside
    class={`
      pointer-events-auto cursor-auto
      float-right z-20
      max-w-xl w-full
      transition-transform ease-in-out
    `}
    style:translate={expanded ? "0% 0%" : "0% 100%"}
  >
    <button
      class="w-full px-4 py-2 cursor-pointer bg-background border-2 border-b-0 border-foreground rounded-t-xl transition-transform flex gap-2 align-middle"
      style:translate={expanded ? "0% 0%" : "0% -100%"}
      aria-label={expanded ? "Hide sheet" : "Show sheet"}
      onpointerdown={(event) => {
        isSwiping = true
        initialSwipePos = [event.clientX, event.clientY]
      }}
      onpointerup={() => {
        isSwiping = false
        initialSwipePos = [0, 0]
      }}
      onpointermove={(event) => {
        if (!isSwiping) {
          return
        }

        event.preventDefault()

        const dY = event.clientY - initialSwipePos[1]
        if (dY > 5) {
          // swiped down
          expanded = false
        } else if (dY < -5) {
          // swiped up
          expanded = true
        }
      }}
      onclick={(event) => {
        expanded = !expanded
      }}
    >
      <h2 class="grow text-left font-bold">
        {location ? location.name : "Nothing selected."}
      </h2>
      {#if expanded}
        <ChevronDown />
      {:else}
        <ChevronUp />
      {/if}
    </button>
    <article
      class="min-w-full h-48 overflow-y-scroll bg-background border-x-2 border-foreground px-4"
    >
      <p>
        {location?.description ?? ""}
      </p>
    </article>
  </aside>
</div>
