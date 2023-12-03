<script lang="ts">
    import { Listgroup } from "flowbite-svelte";
    import Plates from "../../components/admin/Plates.svelte";
    import Passwords from "../../components/admin/Passwords.svelte";
    import Categories from "../../components/admin/Categories.svelte";
    let buttons = [
        { name: "Password", sectionName: "password" },
        { name: "Categorie", sectionName: "categories" },
        { name: "Piatti", sectionName: "plates" },
    ];

    let section = "select";
</script>

{#if section === "select"}
    <Listgroup
        active
        items={buttons}
        let:item
        class="w-48"
        on:click={(e) => (section = String(Object.entries(e.detail)[1][1]))}
    >
        {#if typeof item === "object" && item !== null && "name" in item}
            {item.name}
        {/if}
    </Listgroup>
{:else if section === "password"}
    <Passwords />
{:else if section === "categories"}
    <Categories />
{:else if section === "plates"}
    <Plates />
{/if}
