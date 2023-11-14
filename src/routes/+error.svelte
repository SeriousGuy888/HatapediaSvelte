<script lang="ts">
  import { page } from "$app/stores"
  import * as config from "$lib/config"
  import { Home } from "lucide-svelte"
</script>

<svelte:head>
  <title>{$page.status} - {config.title}</title>
</svelte:head>

<div class="w-full p-12 sm:p-24">
  <hgroup class="text-center">
    <p class="text-xs">Error</p>
    <h1 class="text-4xl font-bold">{$page.status}</h1>
    <p class="text-lg mt-8">{$page.error?.message}</p>
  </hgroup>
  <section class="mt-16 grid place-items-center">
    <a
      href="/"
      class="flex align-middle gap-2 px-8 py-4 border-2 rounded-full"
    >
      <Home />
      <span>Home</span>
    </a>
  </section>
</div>
