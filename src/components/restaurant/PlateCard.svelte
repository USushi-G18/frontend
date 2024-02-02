<script lang="ts">
  import type { Plate } from "../../models/plate";

  import { Card, P } from "flowbite-svelte";
  import AmountSelector from "../AmountSelector.svelte";
  import PlateInfos from "./PlateInfos.svelte";

  export let plate: Plate;
  let openModal = false;
</script>

<Card padding="none" class="m-auto w-64 relative">
  <button on:click={() => (openModal = true)}>
    <div
      class="w-full aspect-video rounded-t-lg mb-5"
      style="
                background-image: url({plate.img || ''});
                background-size: cover;
                background-position: center;
            "
    />
    <span
      class="absolute top-32 right-3 text-lg font-bold bg-primary-500 p-1 px-2 rounded-xl text-gray-100"
      >{plate.price + "€"}</span
    >
    <div class="px-5">
      <div class="flex justify-between items-center">
        <div class="text-left">
          <h5
            class="max-w-lg whitespace-nowrap overflow-hidden text-ellipsis font-semibold tracking-tight text-gray-900 dark:text-white"
          >
            {plate.name}
          </h5>
          <P size="xs">{plate.pieces + " pezzi"}</P>
        </div>
      </div>
    </div>
  </button>
  <div class="pb-5">
    <div class="w-full flex justify-center items-center mt-5">
      <AmountSelector plate_id={plate.id} />
    </div>
  </div>
</Card>
<PlateInfos {plate} bind:openModal />
