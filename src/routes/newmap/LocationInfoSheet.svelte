<script lang="ts">
  import { ChevronDown, ChevronUp } from "lucide-svelte"
  import type { MapLocation } from "./map_locations"

  interface Props {
    expanded: boolean
    location: MapLocation | null
  }
  let { expanded, location }: Props = $props()
</script>

<aside
  class={`
      fixed bottom-0 right-2 ml-2
      max-w-xl w-full
      cursor-auto
      z-20
      transition-transform
      ease-in-out
    `}
  style:translate={expanded ? "0% 0%" : "0% 100%"}
>
  <button
    class="w-full px-4 py-2 grid place-items-center cursor-pointer bg-background border-2 border-b-0 border-foreground rounded-t-xl transition-transform"
    style:translate={expanded ? "0% 0%" : "0% -100%"}
    onclick={(event) => {
      expanded = !expanded
    }}
    aria-label={expanded ? "Hide sheet" : "Show sheet"}
  >
    {#if expanded}
      <ChevronDown />
    {:else}
      <ChevronUp />
    {/if}
  </button>
  <article
    class="min-w-full h-48 overflow-y-scroll bg-background border-x-2 border-foreground px-4 prose dark:prose-invert"
  >
    {#if location}
      <h3>{location.name}</h3>
      <p>
        {location.description ?? ""}
      </p>
    {:else}
      <p>Nothing selected.</p>
    {/if}
  </article>
</aside>
