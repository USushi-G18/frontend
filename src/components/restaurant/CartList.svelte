<script lang="ts">
  import { cart } from "../../store/cart";
  import { List, Li, Tooltip, Heading, Button } from "flowbite-svelte";
  import { TrashBinSolid } from "flowbite-svelte-icons";
  import AmountSelector from "../AmountSelector.svelte";
  import type { Plate } from "../../models/plate";
  import { plates } from "../../store/models";
  import { postReq } from "../../utils/fetch";
  import { notification } from "../../store/notification";
  import { SushiUserType } from "../../models/sushi_user";

  const removeItemFromCart = (id: number) => {
    $cart = $cart.filter((cartItem) => cartItem.plateID !== id);
  };

  let cartPlates: Plate[];
  $: cartPlates = $cart
    .filter((c) => c.cartQuantity > 0)
    .map((i) => $plates.find((p) => p.id === i.plateID))
    .filter((p) => p !== undefined) as Plate[];

  $: {
    cartPlates.sort((p1, p2) => p1.id - p2.id);
  }

  const handleSendCart = async () => {
    let res = await postReq(
      `command`,
      $cart.map((c) => {
        return { plateID: c.plateID, quantity: c.cartQuantity };
      }),
      { user: SushiUserType.Client }
    );
    if (res.status !== 201) {
      $notification = {
        type: "ERROR",
        message:
          "Qualcosa è andato storto mentre si mandava la comanda. Riprova",
      };
      return;
    }
    $cart = $cart.map((c) => {
      return {
        plateID: c.plateID,
        orderedQuantity: c.orderedQuantity + c.cartQuantity,
        cartQuantity: 0,
      };
    });
    $notification = {
      type: "INFO",
      message: "Comanda mandata con successo",
    };
  };
</script>

{#if $cart.length !== 0}
  <div class="flex flex-col items-left">
    <Heading tag="h1" class="my-5 w-max" customSize="text-4xl font-bold "
      >Carrello</Heading
    >
    <List
      tag="ul"
      list="none"
      class="w-[28rem] divide-y divide-gray-200 dark:divide-gray-700"
    >
      {#each cartPlates as item}
        <Li class="py-3 sm:py-4">
          <div class="flex items-center space-x-4 min-w-0">
            <div class="flex-1 min-w-0">
              <p
                class="text-sm font-medium text-gray-900 truncate dark:text-white"
              >
                {item.name}
              </p>
            </div>
            <AmountSelector plateID={item.id} limit={item.orderLimit} />
            <div
              class="flex-[0.3] pl-7 inline-flex items-center text-base font-semibold text-gray-900 dark:text-white"
            >
              {item.price + "€"}
            </div>
            <div>
              <TrashBinSolid
                class="text-red-500"
                on:click={() => removeItemFromCart(item.id)}
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
    <Button size="lg" on:click={handleSendCart}>Invia Ordine</Button>
  </div>
{/if}
