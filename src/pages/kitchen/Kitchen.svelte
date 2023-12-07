<script lang="ts">
    import OrderCard from "../../components/kitchen/OrderCard.svelte";
	import type { Order } from "../../models/order";
    import { StateOfOrder } from "../../models/orderstate";
    import { Menu } from "../../models/menu";
    
	let ord: { "orders": Order[] } = { "orders": [ {
		table: 1,
		timestamp: new Date(),
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
		timestamp: new Date(),
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
		timestamp: new Date(),
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
		timestamp: new Date(),
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
		
		if(order.status != StateOfOrder.Served)
			acc.get(table)?.push(order);
		
		return acc
	}, new Map<number, Order[]>)
</script>

<div class="orders items-stretch w-full h-full m-7 self-start">
	{#each Array.from(orders.keys()).sort() as table}
		{#if orders.get(table)?.length??0 > 0}
			<OrderCard table={table} orders={orders.get(table)} />
		{/if}
	{/each}
</div>

<style>
	.orders {
		display: grid;
		grid-gap: 1.25rem;
		grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
	}
</style>