<script lang="ts">
    import { Heading } from "flowbite-svelte";
    import PwCard from "./PwCard.svelte"
</script>

<div class="w-full self-start flex flex-col items-center flex-grow">
    <Heading tag="h1" class="my-7 w-max" customSize="text-4xl font-bold ">Password</Heading>

    <div class="flex gap-10">
        <PwCard user="Admin"/>
        <PwCard user="Dipendenti"/>
        <PwCard user="Clienti"/>
    </div>
</div>
