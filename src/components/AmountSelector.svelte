<script lang="ts">
  import { cart } from "../store/cart";

  import { Input } from "flowbite-svelte";
  import { PlusOutline, MinusOutline } from "flowbite-svelte-icons";

  export let plateID: number;
  export let limit: number | undefined;

  let quantity: number;
  $: {
    let item = $cart.find((item) => item.plateID === plateID);
    quantity = item?.quantity ?? 0;
  }

  const updateCart = (value: number) => {
    let q = Math.max(Math.min(value, limit || value), 0);
    if (q === quantity) {
      return;
    }
    let c = $cart.filter((item) => item.plateID !== plateID);
    if (q > 0) {
      c.push({
        plateID: plateID,
        quantity: q,
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
    (e.target as HTMLInputElement).value = quantity.toString();
  };
</script>

<button class="flex items-center">
  <button
    class="mr-2 rounded-md text-gray-900 dark:text-white"
    on:click={() => updateCart(quantity - 1)}
  >
    <MinusOutline class="m-1" />
  </button>
  <Input
    type="text"
    class="w-[6ch] text-center"
    value={quantity}
    on:change={updateInput}
    on:keypress={(event) => {
      if (!/^[0-9]+$/.test(event.key) && event.key !== "Backspace") {
        event.preventDefault();
      }
    }}
  />
  <button
    class="ml-2 rounded-md text-gray-900 dark:text-white"
    on:click={() => updateCart(quantity + 1)}
  >
    <PlusOutline class="m-1" />
  </button>
</button>
