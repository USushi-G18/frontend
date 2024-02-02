<script lang="ts">
  import type { Category } from "../../models/category";
  import DashboardTable from "../../components/DashboardTable.svelte";

  let cats: { categorie: Category[] } = {
    categorie: [
      {
        id: 1,
        name: "Temaki",
      },
      {
        id: 2,
        name: "Uramaki",
      },
      {
        id: 3,
        name: "Nigiri",
      },
      {
        id: 4,
        name: "Sashimi",
      },
      {
        id: 5,
        name: "Hossomaki",
      },
      {
        id: 6,
        name: "Gunkan",
      },
      {
        id: 7,
        name: "Futomaki",
      },
      {
        id: 8,
        name: "Oshizushi",
      },
      {
        id: 9,
        name: "Inarizushi",
      },
      {
        id: 10,
        name: "Chirashi",
      },
      {
        id: 11,
        name: "Makizushi",
      },
      {
        id: 12,
        name: "Narezushi",
      },
      {
        id: 13,
        name: "Temarizushi",
      },
    ],
  };

  let items = cats["categorie"];
</script>

<DashboardTable
  mx="mx-96"
  title="Categorie"
  {items}
  editBtn
  delBtn
  header={["id", "name"]}
/>
