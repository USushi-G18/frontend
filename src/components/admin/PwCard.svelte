<script lang="ts">
  import { Card, Heading, Button } from "flowbite-svelte";
  import PwModifier from "./PwModifier.svelte";
  import type { SushiUserType } from "../../models/sushi-user";

  export let user: SushiUserType;
  let openModal: boolean;
</script>

<Card>
  <Heading tag="h4" class="mb-6">{user}</Heading>
  <Button on:click={() => (openModal = true)}>Modifica</Button>
  <PwModifier {user} bind:openModal />
</Card>
