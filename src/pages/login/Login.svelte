<script lang="ts">
  import { TabItem, Tabs } from "flowbite-svelte";
  import LoginContent from "../../components/login/LoginContent.svelte";
  import LoginUsers from "../../components/login/LoginUsers.svelte";
  import { SushiUserType } from "../../models/sushi-user";
</script>

<form class="dark:bg-gray-900 bg-gray-300 rounded-lg w-[80%] sm:w-auto">
  <Tabs
    style="underline"
    contentClass="p-4 bg-gray-200 dark:bg-gray-800 rounded-b-lg"
  >
    <TabItem open>
      <LoginUsers user={SushiUserType.Client} slot="title" />
      <LoginContent user={SushiUserType.Client} />
    </TabItem>
    <TabItem>
      <LoginUsers user={SushiUserType.Employee} slot="title" />
      <LoginContent user={SushiUserType.Employee} />
    </TabItem>
    <TabItem>
      <LoginUsers user={SushiUserType.Admin} slot="title" />
      <LoginContent user={SushiUserType.Admin} />
    </TabItem>
  </Tabs>
</form>
