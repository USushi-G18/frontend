<script lang="ts">
  import { Heading } from "flowbite-svelte";
  import PwCard from "../../components/admin/PwCard.svelte";
  import { SushiUserType } from "../../models/sushi_user";
</script>

<div class="w-full self-start flex flex-col items-center flex-grow">
  <Heading tag="h1" class="my-7 w-max" customSize="text-4xl font-bold "
    >Password</Heading
  >

  <div class="flex gap-10">
    <PwCard user={SushiUserType.Admin} />
    <PwCard user={SushiUserType.Client} />
    <PwCard user={SushiUserType.Employee} />
  </div>
</div>
