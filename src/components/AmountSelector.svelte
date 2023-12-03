<script lang="ts">
	import type { Plate } from '../models/plate';
	import type { OrderedPlate } from '../models/ordered_plate';

	import { cart } from '../store/cart';

	import { Input } from "flowbite-svelte";
	import { PlusOutline, MinusOutline } from "flowbite-svelte-icons";

	export let plate: Plate;
	export let value = 0;

    function updateCart(){
        let orderedPlate = {
			plate: plate,
			quantity: value
		} as OrderedPlate;

        $cart = JSON.parse(localStorage.getItem("cart")??"[]");

        if(value == 0){
            $cart = $cart.filter((item:OrderedPlate) => item.plate.name != plate.name);
        } else {
            $cart = $cart.filter((item:OrderedPlate) => item.plate.name != plate.name);
            $cart.push(orderedPlate);
        }

        localStorage.setItem("cart", JSON.stringify($cart));
        $cart.sort((a:OrderedPlate, b:OrderedPlate) => a.plate.name.localeCompare(b.plate.name));
    }
</script>

<button class="flex items-center">
	<button class="mr-2 rounded-md text-gray-900 dark:text-white" on:click={() => { value = (!value) ? value : value-1; updateCart()}}>
		<MinusOutline onclick="this.blur();" class="m-1"/>
	</button>
	<Input
		type="text"
		class="w-[6ch] text-center"
		bind:value
		on:blur={() => {value = Number(value); updateCart()}}
		on:keyup={() => (value == 0 || value == null) ? value = 0 : value = value}
		on:keypress={(event) => {
			if (!/^[0-9]+$/.test(event.key) && event.key !== "Backspace") {
				event.preventDefault();
			}
		}}
		onclick="this.select();"
	/>
	<button class="ml-2 rounded-md text-gray-900 dark:text-white" on:click={() => {value++; updateCart()}}>
		<PlusOutline class="m-1" onclick="this.blur();"/>
	</button>
</button>