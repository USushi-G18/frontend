<script lang="ts">
	import type { Plate } from "../../models/plate";
    import { Img, Modal } from "flowbite-svelte";

	export let openModal: boolean;
	export let plate: Plate;
</script>

<Modal bind:open={openModal} autoclose outsideclose title={plate.name}>
	<div class="">
		<Img class="rounded-lg w-72 float-right aspect-video" src={plate.img} alt="{plate.name}"/>
		<p><b class="dark:text-white text-gray-700">Descrizione</b><br> {"\n\n" + plate.description}</p><br>
		<p><b class="dark:text-white text-gray-700">Categoria</b><br> {plate.category}</p><br>
		<p><b class="dark:text-white text-gray-700">Ingredienti</b><br> {plate.ingredients}</p><br>
		<p><b class="dark:text-white text-gray-700">Prezzo</b><br> {plate.price + "€"}</p><br>
		<p><b class="dark:text-white text-gray-700">Menu</b><br> {plate.menu}</p><br>
	</div>
</Modal>