<script lang="ts">
	import type { OrderedPlate } from "../../models/ordered_plate";
    import OrderCard from "../../components/kitchen/OrderCard.svelte";
	import type { Order } from "../../models/order";
    import PlateCard from "../../components/restaurant/PlateCard.svelte";
    import { StateOfOrder } from "../../models/orderstate";
    import { Menu } from "../../models/menu";
    
	let ord: { "orders": Order[] } = { "orders": [ {
		table: 1,
		ordered_plate: {
			plate: {
				id: 1,
				name: "Sashimi misto",
				price: "18.50",
				ingredients: ["tonno", "salmone", "orata"],
				category: "sashimi",
				menu: Menu.Dinner,
				img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqJzzxf3axXBhXtcmR_uPmaK_miJ94OCh6LA&usqp=CAU",
				description: "ciao",
				limit: 1
			},
			quantity: 1
		},
		status: StateOfOrder.Ready
	},{
		table: 3,
		ordered_plate: {
			plate: {
				id: 1,
				name: "Sashimi misto",
				price: "18.50",
				ingredients: ["tonno", "salmone", "orata"],
				category: "sashimi",
				menu: Menu.Dinner,
				img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqJzzxf3axXBhXtcmR_uPmaK_miJ94OCh6LA&usqp=CAU",
				description: "ciao",
				limit: 1
			},
			quantity: 1
		},
		status: StateOfOrder.Received
	},{
		table: 2,
		ordered_plate: {
			plate: {
				id: 1,
				name: "Sashimi misto",
				price: "18.50",
				ingredients: ["tonno", "salmone", "orata"],
				category: "sashimi",
				menu: Menu.Dinner,
				img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqJzzxf3axXBhXtcmR_uPmaK_miJ94OCh6LA&usqp=CAU",
				description: "ciao",
				limit: 1
			},
			quantity: 5
		},
		status: StateOfOrder.Processing
	},{
		table: 4,
		ordered_plate: {
			plate: {
				id: 1,
				name: "Sashimi misto",
				price: "18.50",
				ingredients: ["tonno", "salmone", "orata"],
				category: "sashimi",
				menu: Menu.Dinner,
				img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqJzzxf3axXBhXtcmR_uPmaK_miJ94OCh6LA&usqp=CAU",
				description: "ciao",
				limit: 1
			},
			quantity: 1
		},
		status: StateOfOrder.Served
	} ]};


	let orders = ord.orders.reduce((acc, order) => {
		const table = order.table;
		
		if(!acc.has(table))
			acc.set(table, [])
		
		acc.get(table)?.push(order);
		
		return acc
	}, new Map<number, Order[]>)
</script>

<div class="orders items-stretch w-full h-full m-7 self-start">
	{#each Array.from(orders.keys()).sort() as table}
		<OrderCard table={table} orders={orders.get(table)} />
	{/each}
</div>

<style>
	.orders {
		display: grid;
		grid-gap: 1.25rem;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	}
</style>