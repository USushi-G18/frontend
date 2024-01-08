<script lang="ts">
    import { Checkbox, Label } from "flowbite-svelte";
	import { createEventDispatcher } from "svelte";

	export let checked = false;
	export let content: string;

	const dispatch = createEventDispatcher();

	function handleClick() {
		dispatch("click");
	}
</script>


<Label>
	<Checkbox name={content} bind:checked  on:click={handleClick}>{content}</Checkbox>
</Label>