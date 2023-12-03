<script lang="ts">
	import { Input } from 'flowbite-svelte';
	import EyeButton from './EyeButton.svelte';
	export let visible = false;
	export let btnClass = '';
	export let value = '';
	export let disabled = false;
	export let color="base";
	export let tabindex = 0;
</script>

<Input name="password" {disabled} type={visible ? "text" : "password"} bind:value={value} class={btnClass} color={color === "base" || color === "red" || color === "green" ? color : undefined}>
	<button {tabindex} {disabled} type="button" slot="right" class="flex items-center justify-center" on:click={() => visible = !visible}>
		<EyeButton {visible} {tabindex}/>
	</button>
</Input>