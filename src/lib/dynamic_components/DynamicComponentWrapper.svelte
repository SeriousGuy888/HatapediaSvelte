<!--
  Stolen from
  https://github.com/dimfeld/website/blob/54c30d47ecaa02fabfc5c5ccedf419035da02c77/src/DynamicComponentWrapper.svelte
-->

<script>
  export let component
  export let props
</script>

<div>
  <svelte:component this={component} {...props} />
</div>
