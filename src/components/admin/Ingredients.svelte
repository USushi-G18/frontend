<script lang="ts">
    import { Input, Popover } from "flowbite-svelte";
    import { PenSolid } from "flowbite-svelte-icons";
    import Ingredient from "./Ingredient.svelte";

	export let key: string;
	export let ingredients: string[] = [];

	$: inputContent = ingredients.join(", ");

	let allIngredients: string[] = [
		"riso",
		"tonno",
		"avocado",
		"maionese",
		"wasabi",
		"zenzero",
		"uova di salmone",
		"salmone",
		"orata",
		"salsa di soia",
		"sale",
		"pepe",
		"olio",
		"aceto"
	]

	function handleClick(ingredient: string) {
		if (ingredients.includes(ingredient)) {
			ingredients = ingredients.filter((ing) => ing !== ingredient);
		} else {
			ingredients.push(ingredient);
			ingredients = [...ingredients];
		}
	}
</script>

<Input name={key} type="text" bind:value={inputContent} disabled defaultClass='block w-full cursor-pointer disabled:opacity-80'>
	<PenSolid class="text-white mr-1 cursor-pointer" size="sm" slot="right" />
</Input>
<Popover placement='bottom' class="w-[70%] text-sm font-light" trigger="click">
	<div class="flex flex-wrap gap-x-7 gap-y-3">
		{#each allIngredients as ingredient}
			<Ingredient on:click={() => handleClick(ingredient)} content={ingredient} checked={ingredients.includes(ingredient)} />
		{/each}
	</div>
</Popover>