<script lang="ts">
  import type { Category } from "../../models/category";
  import DashboardTable from "../../components/dashboard/DashboardTable.svelte";
  import { texts } from "./texts";
  import { categories } from "../../store/models";
  import {
    createReq,
    deleteReq,
    fetchTable,
    updateReq,
  } from "../../utils/fetch";

  $: items = $categories;

  let columns = [
    {
      field: "name",
      name: "nome",
      editable: true,
    },
  ];

  const filter = (item: Category, key: string) => {
    return item.name.toLowerCase().indexOf(key.toLowerCase()) !== -1;
  };

  const handleCreate = async (event: CustomEvent) => {
    let res = await createReq("category", event.detail);
    if (res.status !== 201) {
      let body = await res.json();
      console.error(body);
      return;
    }
    $categories = await fetchTable("category");
  };

  const handleUpdate = async (event: CustomEvent) => {
    let res = await updateReq(`category/${event.detail.id}`, event.detail);
    if (res.status !== 200) {
      let body = await res.json();
      console.error(body);
      return;
    }
    $categories = await fetchTable("category");
  };

  const handleDelete = async (event: CustomEvent) => {
    let res = await deleteReq(`category/${event.detail.id}`);
    if (res.status !== 200) {
      let body = await res.json();
      console.error(body);
      return;
    }
    $categories = await fetchTable("category");
  };
</script>

<DashboardTable
  texts={{ ...texts, title: "Categorie" }}
  {items}
  {columns}
  {filter}
  editable
  delitable
  on:create={handleCreate}
  on:update={handleUpdate}
  on:delete={handleDelete}
/>
