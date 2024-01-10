<script lang="ts">
    import { Checkbox, Label } from "flowbite-svelte";
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let checked: boolean;
	export let content: string;
	
	$: checked, dispatch('change', { checked, content });
</script>


<Label>
	<Checkbox name={content} bind:checked>{content}</Checkbox>
</Label>