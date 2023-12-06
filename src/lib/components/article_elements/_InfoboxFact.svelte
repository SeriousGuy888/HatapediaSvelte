<script lang="ts">
  export let title: string
  export let value: string | string[] | undefined
</script>

<div
  class="flex-1 bg-gray-200 dark:bg-gray-700 rounded-md p-4 print:border-b-black print:border-2"
>
  <div class="px-2 py-1">
    <p class="uppercase text-gray-600 dark:text-gray-300 print:text-black text-xs my-0">
      {title}
    </p>
    <span class="text-md text-black dark:text-white print:text-black my-0">
      <!--If the value is an array, render it as a ul, otherwise render it as a regular string. -->
      {#if value instanceof Array && value.length > 1}
        <ul class="list-disc">
          {#each value as item}
            <li class="m-0">{item}</li>
          {/each}
        </ul>
      {:else}
        {value ?? "Unknown"}
      {/if}
    </span>
  </div>
</div>
