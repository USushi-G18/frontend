<script lang="ts">
	import { StateOfOrder } from "../../models/orderstate";
	import { AngleLeftSolid, AngleRightSolid } from "flowbite-svelte-icons";

    export let state:StateOfOrder;

	const stateTextMap = new Map([
		[StateOfOrder.Received, "Ricevuto"],
		[StateOfOrder.Processing, "In corso"],
		[StateOfOrder.Ready, "Pronto"],
		[StateOfOrder.Served, "Servito"]
	]);

	let color:string;
	setColor()

	function setColor(){
		if(state == StateOfOrder.Received)
			color = "text-red-500"
		else if(state == StateOfOrder.Processing)
			color = "text-orange-400"
		else if(state == StateOfOrder.Ready)
			color = "text-green-500"
		else if(state == StateOfOrder.Served)
			color = "text-blue-500"
	
	}

	function nextState(){
		if(state == StateOfOrder.Received)
			state = StateOfOrder.Processing
		else if(state == StateOfOrder.Processing)
			state = StateOfOrder.Ready
		else if(state == StateOfOrder.Ready)
			state = StateOfOrder.Served
		setColor()
	}
	function prevState(){
		if(state == StateOfOrder.Served)
			state = StateOfOrder.Ready
		else if(state == StateOfOrder.Ready)
			state = StateOfOrder.Processing
		else if(state == StateOfOrder.Processing)
			state = StateOfOrder.Received
		setColor()
	}

</script>

<div class="flex items-center justify-end">
	<span class="{color} rounded-md flex items-center text-sm font-medium">{stateTextMap.get(state)}</span>
	<button disabled={state == StateOfOrder.Received} class="ml-1" on:click={prevState}>
		<AngleLeftSolid
			size="sm"
			class="pointer-events-none dark:text-{state == StateOfOrder.Received ? "gray" : "white"} text-{state == StateOfOrder.Received ? "gray" : "gray-800"}"
			tabindex="-1"/>
	</button>
	<button disabled={state == StateOfOrder.Served} class="ml-2" on:click={nextState}>
		<AngleRightSolid
			size="sm"
			class="pointer-events-none dark:text-{state == StateOfOrder.Served ? "gray" : "white"} text-{state == StateOfOrder.Served ? "gray" : "gray-800"}"
			tabindex="-1"/>
	</button>
</div>