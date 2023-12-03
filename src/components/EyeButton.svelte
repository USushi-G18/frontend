<script lang="ts">
	export let visible = false;
	import { EyeOutline, EyeSlashOutline } from 'flowbite-svelte-icons';

	export let tabindex = 0;
</script>
{#if visible}
	<EyeOutline {tabindex}/>
{:else}
	<EyeSlashOutline {tabindex}/>
{/if}