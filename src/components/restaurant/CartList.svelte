<script lang="ts">
  import { cart } from "../../store/cart";
  import { List, Li, Tooltip, Heading, Button } from "flowbite-svelte";
  import { TrashBinSolid } from "flowbite-svelte-icons";
  import AmountSelector from "../AmountSelector.svelte";
  import type { CartItem } from "../../models/cart";

  function removeItemFromCart(item: CartItem) {
    $cart = $cart.filter((cartItem) => cartItem.plate_id != item.plate_id);
  }
</script>

{#if $cart.length != 0}
  <div class="flex flex-col items-left">
    <Heading tag="h1" class="my-5 w-max" customSize="text-4xl font-bold "
      >Carrello</Heading
    >
    <List
      tag="ul"
      list="none"
      class="w-[28rem] divide-y divide-gray-200 dark:divide-gray-700"
    >
      {#each $cart as item}
        <Li class="py-3 sm:py-4">
          <div class="flex items-center space-x-4 min-w-0">
            <div class="flex-1 min-w-0">
              <p
                class="text-sm font-medium text-gray-900 truncate dark:text-white"
              >
                {item.plate_id}
              </p>
            </div>
            <AmountSelector plate_id={item.plate_id} />
            <div
              class="flex-[0.3] pl-7 inline-flex items-center text-base font-semibold text-gray-900 dark:text-white"
            >
              {item.plate_id + "€"}
            </div>
            <div>
              <TrashBinSolid
                class="text-red-500"
                onclick="this.blur();"
                on:click={() => removeItemFromCart(item)}
              />
              <Tooltip
                shadow={false}
                class="bg-red-200 dark:bg-red-200 text-red-500">Elimina</Tooltip
              >
            </div>
          </div>
        </Li>
      {/each}
    </List>
  </div>
  <div class="w-[15%] bottom-10 right-10 absolute flex flex-col gap-4">
    <Button size="lg" on:click={() => console.error("INVIA L'ORDINE")}
      >Invia Ordine</Button
    >
  </div>
{/if}
