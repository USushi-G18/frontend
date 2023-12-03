<script lang="ts">
	import { Modal, Label, Helper, Button } from "flowbite-svelte";
	import PwInput from "../PwInput.svelte";

	function colChose(){
		if(newPassword == '')
			return 'base'
		else if(repeatNewPassword == newPassword)
			return 'green'
		else return 'red';
	}
	function capitalize(string:string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	export let user:string;
	export let openModal:boolean;
	let newPassword = '';
	let repeatNewPassword = '';
	let currPassword = '';
</script>

<Modal title={'Cambia password di ' + capitalize(user)} bind:open={openModal} autoclose outsideclose class="w-[80%] modal" backdropClass='fixed inset-0 z-40 bg-gray-900 bg-opacity-50 dark:bg-opacity-25'>
	<form class="flex flex-col space-y-6" action="#">
		<Label class="space-y-2">
		  <span>Vecchia Password</span>
		  <PwInput tabindex={-1} bind:value={currPassword}/>
		</Label>				
		<Label class="space-y-2">
		  <span>Nuova Password</span>
		  <PwInput tabindex={-1} bind:value={newPassword}/>
		  <Helper class="mt-2" color='red'>
			{#if currPassword != '' && newPassword == currPassword}
				<span class="font-medium">Attenzione!</span> La nuova password non può essere uguale alla vecchia!
			{/if}
		  </Helper>
		</Label>				
		<Label class="space-y-2">
		  <span>Ripeti Nuova Password</span>
		  <PwInput tabindex={-1} bind:value={repeatNewPassword} color={colChose()}/>
		  <Helper class="mt-2" color={repeatNewPassword == newPassword ? 'green' : 'red'}>
			{#if newPassword != ''}
				{#if newPassword != repeatNewPassword}
					<span class="font-medium">Attenzione!</span> Le password non coincidono!
				{:else}
					<span class="font-medium">Le password coincidono!</span>
				{/if}
			{/if}
		  </Helper>
		</Label>				
	  </form>
	<svelte:fragment slot="footer">
	  <Button disabled={newPassword == '' || newPassword != repeatNewPassword || newPassword == currPassword} on:click={() => alert('ADD FUNCTION')}>Modifica</Button>
		<Button color="alternative">Annulla</Button>
	</svelte:fragment>
</Modal>