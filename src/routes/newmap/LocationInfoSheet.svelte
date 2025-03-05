<script lang="ts">
  import { ChevronDown, ChevronUp } from "lucide-svelte"
  import type { MapLocation } from "./map_locations"

  interface Props {
    expanded: boolean
    location: MapLocation | null
  }
  let { expanded, location }: Props = $props()
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
      onclick={(event) => {
        expanded = !expanded
      }}
      aria-label={expanded ? "Hide sheet" : "Show sheet"}
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
