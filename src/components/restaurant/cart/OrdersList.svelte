<script lang="ts">
	import type { OrderedPlate } from '../../../models/ordered_plate';

	import { cart } from '../../../store/cart';
    import { List, Li, Tooltip, Heading } from "flowbite-svelte";
    import { TrashBinSolid } from "flowbite-svelte-icons";
    import AmountSelector from "../../AmountSelector.svelte";
	
	function removeItemFromCart(item: OrderedPlate) {
		$cart = $cart.filter((cartItem: OrderedPlate) => cartItem.plate.name != item.plate.name);
	}
</script>

{#if $cart.length != 0}
	<div class="flex flex-col items-left">
		<Heading tag="h1" class="my-5 w-max" customSize="text-4xl font-bold ">Carrello</Heading>
		<List tag="ul" list="none" class="w-[28rem] divide-y divide-gray-200 dark:divide-gray-700">
			{#each $cart as item}
				<Li class="py-3 sm:py-4">
					<div class="flex items-center space-x-4 min-w-0">
						<div class="flex-1 min-w-0">
							<p class="text-sm font-medium text-gray-900 truncate dark:text-white">{item.plate.name}</p>
						</div>
						<AmountSelector plate={item.plate} value={item.quantity} />
						<div class="flex-[0.3] pl-7 inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">{item.plate.price + "€"}</div>
						<div>
							<TrashBinSolid class="text-red-500" onclick="this.blur();" on:click={() => removeItemFromCart(item)}/>
							<Tooltip shadow={false} class="bg-red-200 dark:bg-red-200 text-red-500">Elimina</Tooltip>
						</div>
					</div>
				</Li>
			{/each}
		</List>
	</div>
{/if}