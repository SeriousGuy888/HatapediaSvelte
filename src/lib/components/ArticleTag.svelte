<script lang="ts">
  export let tag: string
  export let size: "small" | "regular" = "regular"
</script>

<a href={`/tags/${tag}`} aria-label={`Tag: ${tag}`}>
  <span
    class={`
      ${size === "small" ? "text-xs" : "text-sm"}
      ${size === "small" ? "px-1 py-0.5" : "px-2 py-1"}
      ${size === "small" ? "border" : "border-2"}
      ${size === "small" ? "tracking-tight" : "tracking-normal"}
      rounded-full
      text-black border-purple-300 bg-purple-300 hover:border-purple-600
      dark:text-white dark:border-purple-900 dark:bg-purple-900 dark:hover:border-purple-500
    `}
  >
    #{tag}
  </span>
</a>
