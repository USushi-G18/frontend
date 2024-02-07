<script lang="ts">
  export let visible = false;
  import { EyeOutline, EyeSlashOutline } from "flowbite-svelte-icons";
</script>

{#if visible}
  <EyeOutline />
{:else}
  <EyeSlashOutline />
{/if}
