<script lang="ts">
  export let tag: string
</script>

<a href={`/tags/${tag}`} aria-label={`Tag: ${tag}`}>
  <span
    class={`
    text-sm font-mono
    px-2 py-1 rounded-full border-2
    text-black border-purple-300 bg-purple-300 hover:border-purple-600
    dark:text-white dark:border-purple-900 dark:bg-purple-900 dark:hover:border-purple-500`}
  >
    #{tag}
  </span>
</a>
