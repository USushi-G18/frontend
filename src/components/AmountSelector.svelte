<script lang="ts">
  import { cart } from "../store/cart";

  import { Input } from "flowbite-svelte";
  import { PlusOutline, MinusOutline } from "flowbite-svelte-icons";
  import { notification } from "../store/notification";
  import { selectedMenu } from "../store/selected_menu";
  import { Menu } from "../models/menu";

  export let plateID: number;
  export let limit: number | undefined;

  let cartQuantity: number;
  let orderedQuantity: number;
  $: {
    let item = $cart.find((item) => item.plateID === plateID);
    cartQuantity = item?.cartQuantity ?? 0;
    orderedQuantity = item?.orderedQuantity ?? 0;
  }

  const updateCart = (value: number) => {
    let q = Math.max(value, 0);
    if (
      limit &&
      $selectedMenu !== Menu.Carte &&
      value + orderedQuantity > limit
    ) {
      $notification = {
        type: "ERROR",
        message: "Limite raggiunto per questo prodotto",
      };
      q = limit - orderedQuantity;
    }
    if (q === cartQuantity) {
      return;
    }
    let c = $cart.filter((item) => item.plateID !== plateID);
    if (orderedQuantity > 0 || q > 0) {
      c.push({
        plateID: plateID,
        orderedQuantity: orderedQuantity,
        cartQuantity: q,
      });
    }
    $cart = c;
  };

  const updateInput = (e: Event) => {
    if (!e.target) {
      return;
    }
    let value = parseInt((e.target as HTMLInputElement).value);
    if (isNaN(value)) {
      return;
    }
    updateCart(value);
    (e.target as HTMLInputElement).value = cartQuantity.toString();
  };
</script>

<button class="flex items-center">
  <button
    class="mr-2 rounded-md text-gray-900 dark:text-white"
    on:click={() => updateCart(cartQuantity - 1)}
  >
    <MinusOutline class="m-1" />
  </button>
  <Input
    type="text"
    class="w-[6ch] text-center"
    value={cartQuantity}
    on:change={updateInput}
    on:keypress={(event) => {
      if (!/^[0-9]+$/.test(event.key) && event.key !== "Backspace") {
        event.preventDefault();
      }
    }}
  />
  <button
    class="ml-2 rounded-md text-gray-900 dark:text-white"
    on:click={() => updateCart(cartQuantity + 1)}
  >
    <PlusOutline class="m-1" />
  </button>
</button>
