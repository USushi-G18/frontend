<script lang="ts">
	import { TabItem, Tabs } from 'flowbite-svelte';
    import LoginContent from '../../components/login/LoginContent.svelte';
    import LoginUsers from '../../components/login/LoginUsers.svelte';
</script>

<form class="dark:bg-gray-900 bg-gray-300 rounded-lg w-[80%] sm:w-auto">
	<Tabs style="underline" contentClass="p-4 bg-gray-200 dark:bg-gray-800 rounded-b-lg">
		<TabItem open>
			<LoginUsers user="admin" slot="title"/>
			<LoginContent user="admin" />
		</TabItem>
		<TabItem>
			<LoginUsers user="kitchen" slot="title"/>
			<LoginContent user="kitchen"  />
		</TabItem>
		<TabItem>
			<LoginUsers user="restaurant" slot="title"/>
			<LoginContent user="restaurant"/>
		</TabItem>
	</Tabs>	
</form>