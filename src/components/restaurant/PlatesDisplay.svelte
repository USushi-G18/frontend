<script lang="ts">
  import PlateCard from "./PlateCard.svelte";

  export let plates: number[];
  export let category: string;
</script>

<div class="plates my-7 w-full items-center justify-center">
  {#each plates as plateID}
    <PlateCard {plateID} {category} />
  {/each}
</div>

<style>
  .plates {
    display: grid;
    grid-gap: 1.25rem;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
</style>
