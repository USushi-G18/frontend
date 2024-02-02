<script lang="ts">
  import { cart } from "../store/cart";

  import { Input } from "flowbite-svelte";
  import { PlusOutline, MinusOutline } from "flowbite-svelte-icons";

  export let plate_id: number;
  let quantity: number;
  $: {
    let command = $cart.find((item) => item.plate_id === plate_id);
    quantity = command?.quantity ?? 0;
  }

  function updateCart() {
    if (quantity === 0) {
      $cart = $cart.filter((item) => item.plate_id !== plate_id);
    } else {
      let c = $cart.filter((item) => item.plate_id !== plate_id);
      c.push({
        plate_id: plate_id,
        quantity: quantity,
      });
      $cart = c;
    }
  }
</script>

<button class="flex items-center">
  <button
    class="mr-2 rounded-md text-gray-900 dark:text-white"
    on:click={() => {
      quantity = !quantity ? quantity : quantity - 1;
      updateCart();
    }}
  >
    <MinusOutline onclick="this.blur();" class="m-1" />
  </button>
  <Input
    type="text"
    class="w-[6ch] text-center"
    bind:value={quantity}
    on:blur={() => {
      quantity = Number(quantity);
      updateCart();
    }}
    on:keyup={() =>
      quantity == 0 || quantity == null
        ? (quantity = 0)
        : (quantity = quantity)}
    on:keypress={(event) => {
      if (!/^[0-9]+$/.test(event.key) && event.key !== "Backspace") {
        event.preventDefault();
      }
    }}
    onclick="this.select();"
  />
  <button
    class="ml-2 rounded-md text-gray-900 dark:text-white"
    on:click={() => {
      quantity++;
      updateCart();
    }}
  >
    <PlusOutline class="m-1" onclick="this.blur();" />
  </button>
</button>
