<script lang="ts">
	import { UserSettingsSolid, WalletSolid, UsersSolid } from 'flowbite-svelte-icons';
	export let user = '';
</script>

<div class="flex items-center justify-center gap-2 px-3 text-gray-800 dark:text-gray-400">
	{#if user == "admin"}
		<UserSettingsSolid size="md"tabindex="-1" class="outline-none"/>
		<span>Admin</span>
	{:else if user == "kitchen"}
		<UsersSolid size="md" tabindex="-1"  class="outline-none"/>
		<span>Dipendenti</span>
	{:else if user == "restaurant"}
		<WalletSolid size="md" tabindex="-1"  class="outline-none"/>
		<span>Clienti</span>
	{/if}
</div>