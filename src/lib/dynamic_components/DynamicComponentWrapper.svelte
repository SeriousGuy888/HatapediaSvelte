<!-- @migration-task Error while migrating Svelte code: migrating this component would require adding a `$props` rune but there's already a variable named props.
     Rename the variable and try again or migrate by hand. -->
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
