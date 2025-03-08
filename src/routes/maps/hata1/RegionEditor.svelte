<script lang="ts">
  import { getSelectedRegion, locationSelection } from "./map_markers.svelte"

  let regionIdInput: HTMLInputElement
</script>

<aside class="p-2 bg-background rounded border-2 border-foreground pointer-events-auto cursor-auto">
  {#if getSelectedRegion()}
    {@const selectedRegion = getSelectedRegion()}
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
    </form>
  {:else}
    <form class="flex gap-2 flex-col" action="" onsubmit={(e) => e.preventDefault()}>
      <input
        bind:this={regionIdInput}
        type="text"
        placeholder="Region ID"
        value={~~(Math.random() * 10 ** 8)}
      />
      <button
        class="cursor-pointer hover:underline"
        type="button"
        onclick={() => {
          const newRegionId = regionIdInput.value
          if (!newRegionId || newRegionId in locationSelection.regions) {
            alert("Region ID already exists.")
            return
          }
          locationSelection.regions[newRegionId] = {
            name: newRegionId,
            description: "",
            coordinates: [
              // 4 random coordinates in the (-5000, -5000) to (5000, 5000) square
              [Math.random() * 10000 - 5000, Math.random() * 10000 - 5000],
              [Math.random() * 10000 - 5000, Math.random() * 10000 - 5000],
              [Math.random() * 10000 - 5000, Math.random() * 10000 - 5000],
              [Math.random() * 10000 - 5000, Math.random() * 10000 - 5000],
            ],
          }
          locationSelection.selectedLocationId = newRegionId
        }}
      >
        Create Region
      </button>
    </form>
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
