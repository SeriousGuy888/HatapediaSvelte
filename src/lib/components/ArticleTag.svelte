<script lang="ts">
  interface Props {
    tag: string;
    size?: "small" | "regular";
  }

  let { tag, size = "regular" }: Props = $props();
</script>

<a href={`/tags/${tag}`} aria-label={`Tag: ${tag}`}>
  <span
    class={`
      ${size === "small" ? "text-xs" : "text-sm"}
      ${size === "small" ? "px-1 py-0.5" : "px-2 py-1"}
      ${size === "small" ? "border" : "border-2"}
      ${size === "small" ? "tracking-tight" : "tracking-normal"}
      rounded-full
      text-foreground border-primary bg-primary hover:border-secondary
    `}
  >
    #{tag}
  </span>
</a>
