<!--
  Stolen from
  https://github.com/dimfeld/website/blob/54c30d47ecaa02fabfc5c5ccedf419035da02c77/src/DynamicComponentWrapper.svelte
-->

<script lang="ts">
  export let component: any
  export let props: Record<string, any> = {}
</script>

<div>
  <svelte:component this={component} {...props} />
</div>
