<script lang="ts">
  interface Props {
    title: string
    value: string | string[] | undefined
  }

  let { title, value }: Props = $props()
  let vals = value instanceof Array ? value : [value]
</script>

<dt class="uppercase font-normal text-gray-600 dark:text-gray-300 print:text-black text-xs m-0">
  {title}
</dt>

{#each vals as item}
  <dd class="text-black dark:text-white print:text-black my-0 text-base">
    {item}
  </dd>
{/each}
