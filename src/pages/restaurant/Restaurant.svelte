<script lang="ts">
	import { selectedMenu } from "../../store/selected_menu";
	import type { Plate } from "../../models/plate";
	import { Menu } from "../../models/menu";
	import { TabItem, Tabs } from "flowbite-svelte";
    import PlateDisplay from "../../components/restaurant/PlatesDisplay.svelte";
	import MenuSelectModal from "../../components/restaurant/MenuSelectModal.svelte";

	$: menu = $selectedMenu;
	$: open = $selectedMenu != undefined && !Object.keys(Menu).includes(Menu[$selectedMenu]);

	// TODO: get plates from DB (used plates variable for testing)
	let plates = {
		"piatti": [
			{
				"id": 1,
				"name": "Sashimi misto",
				"price": "18.50",
				"ingredients": ["tonno", "salmone", "orata"],
				"category": "sashimi",
				"menu": Menu.Dinner,
				"img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqJzzxf3axXBhXtcmR_uPmaK_miJ94OCh6LA&usqp=CAU",
				"description": "Sashimi misto di tonno, salmone e orata",
				"pieces": 6
			},
			{
				"id": 2,
				"name": "Uramaki California",
				"price": "12.00",
				"ingredients": ["granchio", "avocado", "maionese"],
				"category": "uramaki",
				"menu": Menu.Lunch,
				"img": "https://images.fidhouse.com/fidelitynews/wp-content/uploads/sites/6/2020/01/1580315600_842a0278b5b34385f186c24c69e5c3cb369c2b20-1580290176.jpg?width=1280&height=720&quality=90",
				"description": "Uramaki California con granchio, avocado e maionese",
				"pieces": 6
			},
			{
				"id": 3,
				"name": "Temaki Salmone",
				"price": "8.50",
				"ingredients": ["riso", "alga nori", "salmone"],
				"category": "temaki",
				"menu": Menu.Carte,
				"img": "https://www.melarossa.it/wp-content/uploads/2021/10/temaki.jpg",
				"description": "Temaki Salmone con riso, alga nori e salmone",
				"pieces": 6
			},
			{
				"id": 4,
				"name": "Nigiri Salmone",
				"price": "3.50",
				"ingredients": ["riso", "salmone"],
				"category": "nigiri",
				"menu": Menu.Carte,
				"img": "https://primochef.it/wp-content/uploads/2021/10/SH_nigiri_salmone.jpg",
				"description": "Nigiri Salmone con riso e salmone",
				"pieces": 6
			},
			{
				"id": 5,
				"name": "Hosomaki Avocado",
				"price": "4.50",
				"ingredients": ["riso", "alga nori", "avocado"],
				"category": "hosomaki",
				"menu": Menu.Lunch,
				"img": "https://kingu.it/wp-content/uploads/2022/09/Hosomaki-avocado.jpeg",
				"description": "Hosomaki Avocado con riso, alga nori e avocado",
				"pieces": 6
			},
			{
				"id": 6,
				"name": "Futomaki Tonno",
				"price": "10.00",
				"ingredients": ["riso", "alga nori", "tonno"],
				"category": "futomaki",
				"menu": Menu.Dinner,
				"img": "https://media.istockphoto.com/id/157610246/it/foto/tonno-roll.jpg?s=612x612&w=0&k=20&c=EWF_S3phiDXBFQbAEnKKZ-pd65_54EjctYTWeiyU0uY=",
				"description": "Futomaki Tonno con riso, alga nori e tonno",
				"pieces": 6
			},
			{
				"id": 7,
				"name": "Uramaki Gamberi",
				"price": "9.00",
				"ingredients": ["gamberi", "avocado", "maionese"],
				"category": "uramaki",
				"menu": Menu.Lunch,
				"img": "https://www.sosushiandsound.it/wp-content/uploads/2023/04/uramaki-ebiten-2.jpg",
				"description": "Uramaki Gamberi con gamberi, avocado e maionese",
				"pieces": 6
			},
			{
				"id": 8,
				"name": "Nigiri Gamberi",
				"price": "4.00",
				"ingredients": ["riso", "gamberi"],
				"category": "nigiri",
				"menu": Menu.Carte,
				"img": "https://www.sosushiandsound.it/wp-content/uploads/2023/04/nigiri-gambero-ebi-1.jpg",
				"description": "Nigiri Gamberi con riso e gamberi",
				"pieces": 6
			},
			{
				"id": 9,
				"name": "Gunkan Salmone",
				"price": "4.50",
				"ingredients": ["riso", "alga nori", "salmone"],
				"category": "gunkan",
				"menu": Menu.Dinner,
				"img": "https://www.ristorantedong.it/wp-content/uploads/Ristorante-Dong-Menu-WEB-175.jpg",
				"description": "Gunkan Salmone con riso, alga nori e salmone",
				"pieces": 6
			},
			{
				"id": 10,
				"name": "Futomaki Salmone",
				"price": "9.50",
				"ingredients": ["riso", "alga nori", "salmone"],
				"category": "futomaki",
				"menu": Menu.Lunch,
				"img": "https://cdn.cook.stbm.it/thumbnails/ricette/144/144478/hd750x421.jpg",
				"description": "Futomaki Salmone con riso, alga nori e salmone",
				"pieces": 6
			},
			{
				"id": 11,
				"name": "Uramaki Tonno",
				"price": "11.00",
				"ingredients": ["tonno", "riso", "alga nori"],
				"category": "uramaki",
				"menu": Menu.Lunch,
				"img": "https://www.agrodolce.it/app/uploads/2022/03/uramaki-con-tonno.jpg",
				"description": "Uramaki Tonno con tonno, riso e alga nori",
				"pieces": 6
			},
			{
				"id": 12,
				"name": "Temaki Gamberi",
				"price": "9.50",
				"ingredients": ["riso", "alga nori", "gamberi"],
				"category": "temaki",
				"menu": Menu.Carte,
				"img": "https://kingu.it/wp-content/uploads/2022/09/philadelphia-temaki-cono-di-alga-con-riso-gamberi-cotti-e-avocado.jpeg",
				"description": "Temaki Gamberi con riso, alga nori e gamberi",
				"pieces": 6
			}
		]
	} 
	let piatti: Plate[] = plates.piatti;

	$: categoriesMenu = piatti.filter(
			(plate: Plate) => {
				if(menu == Menu.Carte)
					return true
				else if (menu == Menu.Dinner)
					return plate.menu == Menu.Dinner || plate.menu == Menu.Lunch
				else if (menu == Menu.Lunch)
					return plate.menu == Menu.Lunch
				else
					return false
			}
		).reduce((acc, plate:Plate) => {
		const category = plate.category;
		
		if(!acc.has(category))
			acc.set(category, [])
		
		if(menu == Menu.Lunch || menu == Menu.Dinner)
			plate.price = "0.00"
		
		acc.get(category)?.push(plate)
		
		return acc
	}, new Map<string, Plate[]>)
</script>

<div class="flex flex-col items-center self-start w-full m-7">
 	<Tabs style="pill" contentClass="w-full" defaultClass="flex space-x-2">
		{#each Array.from(categoriesMenu.keys()) as category, i}
			<TabItem class="w-full" open={i==0} title={category.toUpperCase()} defaultClass="inline-block text-sm font-bold text-center disabled:cursor-not-allowed">
				<PlateDisplay plates={categoriesMenu.get(category)} />
			</TabItem>
		{/each}
	</Tabs>
</div>
<MenuSelectModal bind:open={open}/>