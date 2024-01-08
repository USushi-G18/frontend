<script lang="ts">
	import { Menu } from "../../models/menu";
	import { Modal, Label, Input, Fileupload, Button, Img, Select } from "flowbite-svelte";
    import { translator } from "../../models/translator";
    import type { Category } from "../../models/category";
    import Ingredients from "./Ingredients.svelte";

	export let openModal = false;
	export let item: { [key: string]: any };

	let imgPath: any;

	// TODO: get categories from DB (used cats variable for testing)
	let cats: Category[] = [
			{
				"id": 1,
				"name": "Temaki"
			},
			{
				"id": 2,
				"name": "Uramaki"
			},
			{
				"id": 3,
				"name": "Nigiri"
			},
			{
				"id": 4,
				"name": "Sashimi"
			},
			{
				"id": 5,
				"name": "Hossomaki"
			},
			{
				"id": 6,
				"name": "Gunkan"
			},
			{
				"id": 7,
				"name": "Futomaki"
			},
			{
				"id": 8,
				"name": "Oshizushi"
			},
			{
				"id": 9,
				"name": "Inarizushi"
			},
			{
				"id": 10,
				"name": "Chirashi"
			},
			{
				"id": 11,
				"name": "Makizushi"
			},
			{
				"id": 12,
				"name": "Narezushi"
			},
			{
				"id": 13,
				"name": "Temarizushi"
			}
		];

	let ingredients: string[] = [
		"Riso",
		"Tonno"
	];

	const handleFileUpload = (event: Event) => {
		if(event.target){
			const target = event.target as HTMLInputElement;
			if(target.files){
				const file = target.files[0];
				const reader = new FileReader();

				reader.onloadend = () => {
					imgPath = reader.result;
				};

				if (file) {
					reader.readAsDataURL(file);
				}
			}
		}
	};
</script>

<Modal title="Modifica" on:close={() => imgPath = null} bind:open={openModal} autoclose class="modal" backdropClass='fixed inset-0 z-40 bg-gray-900 bg-opacity-50 dark:bg-opacity-25'>
	<form class="flex flex-col space-y-6" action="#">
		{#each Object.entries(item) as [key, value]}
			<Label class="space-y-2">
				<span>{translator[key] || key}</span>
				{#if key == 'img'}
					<Img class="rounded-lg" size="max-w-[50%]" src={imgPath || String(value)} alt="img" />
					<Fileupload name="img" on:change={handleFileUpload} />
				{:else if key == 'category'}
					<Select name="category" value={value}>
						{#each cats as cat}
							<option value={cat.name.toLowerCase()}>{cat.name}</option>
						{/each}
					</Select>
				{:else if key == 'price'}
					<Input name={key} type="number" value={Number(value).toFixed(2)} min="0" step="0.01" />
				{:else if key == 'description'}
					<Input name={key} type="text" {value} />
				{:else if key == 'ingredients'}
					<Ingredients {key} ingredients={value}/>
				{:else if key == 'description'}
					<Input name={key} type="text"/>
				{:else if key == 'menu'}
					<Select name="menu" {value}>
						{#each Object.values(Menu).filter(value => isNaN(Number(value))) as menu}
							<option value={menu}>{menu}</option>
						{/each}
					</Select>
				{:else}
					<Input name={key} type="text" {value} disabled={key == 'id'}/>	
				{/if}
			</Label>
		{/each}
	</form>
	<svelte:fragment slot="footer">
		<Button>Modifica</Button>
		<Button color="alternative">Annulla</Button>
	</svelte:fragment>
</Modal>