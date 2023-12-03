<script lang="ts">
	import type { Plate } from '../../models/plate';
	import { Menu } from '../../models/menu';

	import DashboardTable from '../DashboardTable.svelte';
	import { InfoCircleOutline } from 'flowbite-svelte-icons';
    import { Tooltip } from 'flowbite-svelte';
	
	// TODO: get plates from DB (used piatti variable for testing)
	let piatti = {
		"piatti": [
			{
				"id": 1,
				"name": "Sashimi misto",
				"price": "18.5",
				"ingredients": ["tonno", "salmone", "orata"],
				"category": "sashimi",
				"menu": Menu.Dinner,
				"img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqJzzxf3axXBhXtcmR_uPmaK_miJ94OCh6LA&usqp=CAU",
				"description": "Sashimi misto di tonno, salmone e orata",
				"limit": 1
			},
			{
				"id": 2,
				"name": "Uramaki California",
				"price": "12.0",
				"ingredients": ["granchio", "avocado", "maionese"],
				"category": "uramaki",
				"menu": Menu.Lunch,
				"img": "https://images.fidhouse.com/fidelitynews/wp-content/uploads/sites/6/2020/01/1580315600_842a0278b5b34385f186c24c69e5c3cb369c2b20-1580290176.jpg?width=1280&height=720&quality=90"
			},
			{
				"id": 3,
				"name": "Temaki Salmone",
				"price": "8.5",
				"ingredients": ["riso", "alga nori", "salmone"],
				"category": "temaki",
				"menu": Menu.Carte,
				"img": "https://www.melarossa.it/wp-content/uploads/2021/10/temaki.jpg"
			},
			{
				"id": 4,
				"name": "Nigiri Salmone",
				"price": "3.5",
				"ingredients": ["riso", "salmone"],
				"category": "nigiri",
				"menu": Menu.Carte,
				"img": "https://primochef.it/wp-content/uploads/2021/10/SH_nigiri_salmone.jpg"
			},
			{
				"id": 5,
				"name": "Hosomaki Avocado",
				"price": "4.5",
				"ingredients": ["riso", "alga nori", "avocado"],
				"category": "hosomaki",
				"menu": Menu.Lunch,
				"img": "https://kingu.it/wp-content/uploads/2022/09/Hosomaki-avocado.jpeg"
			},
			{
				"id": 6,
				"name": "Futomaki Tonno",
				"price": "10.0",
				"ingredients": ["riso", "alga nori", "tonno"],
				"category": "futomaki",
				"menu": Menu.Dinner,
				"img": "https://media.istockphoto.com/id/157610246/it/foto/tonno-roll.jpg?s=612x612&w=0&k=20&c=EWF_S3phiDXBFQbAEnKKZ-pd65_54EjctYTWeiyU0uY="
			},
			{
				"id": 7,
				"name": "Uramaki Gamberi",
				"price": "9.0",
				"ingredients": ["gamberi", "avocado", "maionese"],
				"category": "uramaki",
				"menu": Menu.Lunch,
				"img": "https://www.sosushiandsound.it/wp-content/uploads/2023/04/uramaki-ebiten-2.jpg"
			},
			{
				"id": 8,
				"name": "Nigiri Gamberi",
				"price": "4.0",
				"ingredients": ["riso", "gamberi"],
				"category": "nigiri",
				"menu": Menu.Carte,
				"img": "https://www.sosushiandsound.it/wp-content/uploads/2023/04/nigiri-gambero-ebi-1.jpg"
			},
			{
				"id": 9,
				"name": "Gunkan Salmone",
				"price": "4.5",
				"ingredients": ["riso", "alga nori", "salmone"],
				"category": "gunkan",
				"menu": Menu.Dinner,
				"img": "https://www.ristorantedong.it/wp-content/uploads/Ristorante-Dong-Menu-WEB-175.jpg"
			},
			{
				"id": 10,
				"name": "Futomaki Salmone",
				"price": "9.5",
				"ingredients": ["riso", "alga nori", "salmone"],
				"category": "futomaki",
				"menu": Menu.Lunch,
				"img": "https://cdn.cook.stbm.it/thumbnails/ricette/144/144478/hd750x421.jpg"
			},
			{
				"id": 11,
				"name": "Uramaki Tonno",
				"price": "11.0",
				"ingredients": ["tonno", "riso", "alga nori"],
				"category": "uramaki",
				"menu": Menu.Lunch,
				"img": "https://www.agrodolce.it/app/uploads/2022/03/uramaki-con-tonno.jpg"
			},
			{
				"id": 12,
				"name": "Temaki Gamberi",
				"price": "9.5",
				"ingredients": ["riso", "alga nori", "gamberi"],
				"category": "temaki",
				"menu": Menu.Carte,
				"img": "https://kingu.it/wp-content/uploads/2022/09/philadelphia-temaki-cono-di-alga-con-riso-gamberi-cotti-e-avocado.jpeg"
			}
		]
	}

	let items = piatti['piatti'] as Plate[];

	let fields = ['id', 'name', 'price', 'category', 'menu'];
</script>

<DashboardTable mx="mx-28" title="Piatti" {items} editBtn delBtn header={fields}>
	<div slot="actions" let:item>
		<InfoCircleOutline class="text-blue-700	dark:text-white" onclick="this.blur();"/>
		<Tooltip shadow={false} class="bg-sky-300 dark:bg-sky-200 text-sky-900">{item.ingredients}</Tooltip>
	</div>
</DashboardTable>