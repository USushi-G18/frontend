<script lang="ts">
	import type { OrderedPlate } from '../../../models/ordered_plate';

	import { cart } from '../../../store/cart';
	import { selectedMenu } from '../../../store/selected_menu';
	import { Button, Heading, Hr, P } from 'flowbite-svelte';
	
	function priceToNumber(price:string){
		return Number(price.replace("€", ""));
	}

	$:carte = $cart.reduce((acc:number, item:OrderedPlate) => acc + priceToNumber(item.plate.price) * item.quantity, 0);

	let allYouCanEat = ($selectedMenu == "Lunch" || $selectedMenu == "Dinner") ? 15.50 : 0.0;
	$: total = carte + allYouCanEat;

</script>

{#if $cart.length != 0}
	<div class="w-64 flex flex-col items-center">
		<Heading tag="h1" class="my-5 w-max self-start" customSize="text-2xl font-bold ">Sommario</Heading>
		<div class="w-full">
			<div class="flex justify-between">
				<P class="text-lg">Alla Carta</P>
				<P class="text-lg">€ {carte.toFixed(2)}</P>
			</div>
			<div class="flex justify-between">
				<P class="text-lg">All You Can Eat</P>
				<P class="text-lg">€ {allYouCanEat.toFixed(2)}</P>
			</div>
			<Hr class="my-1"/>
			<div class="flex justify-between">
				<P class="text-lg">Totale</P>
				<P class="text-lg">€ {total.toFixed(2)}</P>
			</div>
		</div>
		<!--TODO: al click del pulsante settare $hasAlreadyOrdered in "../../../store/cart" a true (Toglie l'opzione di cambiare menu dopo un ordine)-->
		<Button class="w-[75%] mt-10" size="md" on:click={() => console.error("INVIA L'ORDINE")}>Invia Ordine</Button>
	</div>
	<Button class="w-[15%] bottom-10 right-10 absolute" size="lg" href="/restaurant" on:click={() => {$selectedMenu = undefined; $cart = []}}>Chiudi Conto ed Esci</Button>
{/if}
