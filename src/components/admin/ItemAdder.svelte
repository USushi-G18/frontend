<script lang="ts">
	import { Menu } from "../../models/menu";
	import { Modal, Label, Input, Fileupload, Button, Img, Select } from "flowbite-svelte";
	import { PlusSolid } from "flowbite-svelte-icons";
    import { translator } from "../../models/translator";
    import type { Category } from "../../models/category";

	export let openModal = false;
	export let keys: any[];
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

<Button size="sm" on:click={() => openModal = true}>
	<PlusSolid class="text-white mr-3" size="sm" />
	Aggiungi
</Button>
<Modal title="Aggiungi" on:close={() => imgPath = null} bind:open={openModal} autoclose class="modal" backdropClass='fixed inset-0 z-40 bg-gray-900 bg-opacity-50 dark:bg-opacity-25'>
	<form class="flex flex-col space-y-6" action="#">
		{#each keys as key}
			{#if key != 'id'}
				<Label class="space-y-2">
					<span>{translator[key] || key}</span>
					{#if key == 'img'}
						{#if imgPath}
							<Img class="rounded-lg" size="max-w-[50%]" src={imgPath} alt="img" />
						{/if}
						<Fileupload name="img" on:change={handleFileUpload} />
					{:else if key == 'category'}
						<Select name="category">
							{#each cats as cat}
								<option value={cat.name.toLowerCase()}>{cat.name}</option>
							{/each}
						</Select>
					{:else if key == 'price'}
						<Input name={key} type="number" min="0" step="0.01" />
					{:else if key == 'description'}
						<Input name={key} type="text"/>
					{:else if key == 'ingredients'}
						<Input name={key} type="text"/>
					{:else if key == 'menu'}
						<Select name="menu">
							{#each Object.values(Menu).filter(value => isNaN(Number(value))) as menu}
								<option value={menu}>{menu}</option>
							{/each}
						</Select>
					{:else}
						<Input name={key} type="text"/>	
					{/if}
				</Label>
			{/if}
		{/each}
	</form>
	<svelte:fragment slot="footer">
		<Button>Aggiungi</Button>
		<Button color="alternative">Annulla</Button>
	</svelte:fragment>
</Modal>