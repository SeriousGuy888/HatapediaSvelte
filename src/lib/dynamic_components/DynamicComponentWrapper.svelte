<!--
  Stolen from
  https://github.com/dimfeld/website/blob/54c30d47ecaa02fabfc5c5ccedf419035da02c77/src/DynamicComponentWrapper.svelte
-->

<script lang="ts">
  interface Props {
    component: any;
    props?: Record<string, any>;
  }

  let { component, props = {} }: Props = $props();

  const SvelteComponent = $derived(component);
</script>

<div>
  <SvelteComponent {...props} />
</div>
