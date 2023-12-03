<script lang="ts">
	import { Card, Heading, Button} from 'flowbite-svelte';
	import PwInput from '../PwInput.svelte';
	import PwModifier from './PwModifier.svelte';

	export let user:string;
	let openModal:boolean;
</script>

<Card>
	<Heading tag="h4" class="mb-4">{user}</Heading>
	<PwInput value="passwordPlaceholder" disabled/>
	<Button class="mt-5" on:click={() => openModal = true}>Modifica</Button>
	<PwModifier {user} bind:openModal={openModal}/>
</Card>