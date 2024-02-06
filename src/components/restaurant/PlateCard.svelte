<script lang="ts">
  import { Card, P } from "flowbite-svelte";
  import AmountSelector from "../AmountSelector.svelte";
  import PlateInfos from "./PlateInfos.svelte";
  import { images, plates } from "../../store/models";
  import { selectedMenu } from "../../store/selected_menu";
  import { Menu } from "../../models/menu";

  export let plateID: number;
  export let category: string;
  let openModal = false;

  $: menu = $selectedMenu;
  $: plate = $plates.find((p) => p.id === plateID);
  $: image = $images.find((i) => i.id === plate?.imageID)?.image;
</script>

{#if plate !== undefined}
  <Card padding="none" class="m-auto w-64 relative">
    <button on:click={() => (openModal = true)}>
      {#if image !== undefined}
        <div
          class="w-full aspect-video rounded-t-lg mb-5"
          style="
                background-image: url('data:image;base64, {image}');
                background-size: cover;
                background-position: center;
            "
        />
      {:else}
        <div
          class="w-full aspect-video rounded-t-lg mb-5"
          style="
                background-size: cover;
                background-position: center;
            "
        />
      {/if}

      <span
        class="absolute top-32 right-3 text-lg font-bold bg-primary-500 p-1 px-2 rounded-xl text-gray-100"
      >
        {menu === Menu.Carte ? plate.price + "€" : "0.0 €"}</span
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
        <AmountSelector {plateID} limit={plate.orderLimit} />
      </div>
    </div>
  </Card>
  <PlateInfos {plate} {category} {image} bind:openModal />
{/if}
