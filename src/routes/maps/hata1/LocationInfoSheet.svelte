<script lang="ts">
  import { ChevronDown, ChevronUp } from "lucide-svelte"
  import type { MapPin } from "./map_pins"

  interface Props {
    expanded: boolean
    location: MapPin | null
  }
  let { expanded, location }: Props = $props()

  let isSwiping = $state(false)
  let initialSwipePos = $state([0, 0])
</script>

<div class="fixed bottom-0 inset-x-1 pointer-events-none touch-none">
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
      class="w-full px-4 py-2 cursor-pointer bg-background border-2 border-b-0 border-foreground rounded-t-xl transition-transform grid grid-cols-[auto_1fr] gap-2 align-middle"
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
      <h2 class="text-left font-bold text-nowrap min-w-0 max-w-full overflow-hidden text-ellipsis">
        {#if location}
          {location.name}
          <span class="ml-1 font-minecraft font-normal"
            >({location.coordinates[0]}, ~, {location.coordinates[1]})</span
          >
        {:else}
          Nothing selected
        {/if}
      </h2>
      <span class="justify-self-end">
        {#if expanded}
          <ChevronDown />
        {:else}
          <ChevronUp />
        {/if}
      </span>
    </button>
    <article
      class="min-w-full h-48 overflow-y-scroll bg-background border-x-2 border-foreground px-4 touch-pan-y"
    >
      <p>
        {location?.description ?? ""}
      </p>
    </article>
  </aside>
</div>
