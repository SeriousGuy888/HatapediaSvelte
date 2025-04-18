<script lang="ts">
  import type { MapRegionData } from "./map_marker_types"
  import { getSelectedRegion, locationSelection } from "./map_markers.svelte"

  let selectedRegion: MapRegionData | null = $derived(getSelectedRegion())
</script>

<aside class="p-2 bg-background rounded border-2 border-foreground pointer-events-auto cursor-auto">
  {#if selectedRegion}
    <p>
      Selected Region: <span class="font-mono">{locationSelection.selectedLocationId}</span>
    </p>
    <form class="flex flex-col gap-2" action="" onsubmit={(e) => e.preventDefault()}>
      <input type="text" placeholder="Region Name" bind:value={selectedRegion!.name} />
      <textarea placeholder="Region Description" bind:value={selectedRegion!.description}>
      </textarea>
      <button
        class="cursor-pointer hover:underline"
        type="button"
        onclick={() => {
          if (confirm("Are you sure you want to delete this region?")) {
            delete locationSelection.regions[locationSelection.selectedLocationId!]
            locationSelection.selectedLocationId = null
          }
        }}
      >
        Delete Region
      </button>
      <button
        class="cursor-pointer hover:underline"
        type="button"
        onclick={() => prompt("Region data", JSON.stringify(selectedRegion))}
      >
        Get Region Data
      </button>
    </form>
  {:else}
    <p>No region selected.</p>
  {/if}
</aside>

<style>
  input,
  textarea {
    padding: 0.5rem;
    border: 1px solid var(--color-foreground);
    border-radius: 0.25rem;
  }
</style>
