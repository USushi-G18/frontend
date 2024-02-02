<script lang="ts">
  import type { Plate } from "../../models/plate";

  import PlateCard from "./PlateCard.svelte";

  export let plates: Plate[] | undefined;
</script>

<div class="plates my-7 w-full items-center justify-center">
  {#if plates}
    {#each plates as plate}
      <PlateCard {plate} />
    {/each}
  {/if}
</div>

<style>
  .plates {
    display: grid;
    grid-gap: 1.25rem;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
</style>
