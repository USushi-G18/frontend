<script lang="ts">
  import { Menu, menuFromName } from "../../models/menu";
  import DashboardTable from "../../components/dashboard/DashboardTable.svelte";
  import { menuName } from "../../models/menu";
  import type { Plate } from "../../models/plate";
  import { texts } from "./texts";
  import { ImageOutline, InfoCircleOutline } from "flowbite-svelte-icons";
  import { Tooltip } from "flowbite-svelte";
  import { useNavigate } from "svelte-navigator";
  import { categories, plates } from "../../store/models";
  import {
    createReq,
    fetchTable,
    deleteReq,
    updateReq,
  } from "../../utils/fetch";

  const navigate = useNavigate();

  $: items = $plates;

  let columns: ColumnDef[];
  $: columns = [
    {
      field: "name",
      name: "Nome",
      type: "string",
      editable: true,
    },
    {
      field: "price",
      name: "Prezzo",
      type: "number",
      valueSetter: (v) => (v === undefined ? undefined : v.toString()),
      editable: true,
    },
    {
      field: "categoryID",
      name: "Categoria",
      type: "select",
      selectOptions: $categories.map((c) => c.name),
      valueGetter: (v) => $categories.find((c) => c.id === v)?.name,
      valueSetter: (v) => $categories.find((c) => c.name === v)?.id,
      editable: true,
    },
    {
      field: "menu",
      name: "Menu",
      type: "select",
      selectOptions: Object.keys(Menu).map((m) => menuName(m as Menu)),
      valueGetter: menuName,
      valueSetter: menuFromName,
      editable: true,
    },
    {
      field: "description",
      name: "Descrizione",
      type: "string",
      editable: true,
    },
    {
      field: "orderLimit",
      name: "Limite",
      type: "number",
      editable: true,
    },
    {
      field: "pieces",
      name: "Pezzi",
      type: "number",
      editable: true,
    },
  ];

  const handleCreate = async (event: CustomEvent) => {
    let res = await createReq("plate", event.detail);
    if (res.status !== 201) {
      let body = await res.json();
      console.error(body);
      return;
    }
    $plates = await fetchTable("plate");
  };

  const handleUpdate = async (event: CustomEvent) => {
    let res = await updateReq(`plate/${event.detail.id}`, event.detail);
    if (res.status !== 200) {
      let body = await res.json();
      console.error(body);
      return;
    }
    $plates = await fetchTable("plate");
  };

  const handleDelete = async (event: CustomEvent) => {
    let res = await deleteReq(`plate/${event.detail.id}`);
    if (res.status !== 200) {
      let body = await res.json();
      console.error(body);
      return;
    }
    $plates = await fetchTable("plate");
  };

  const filter = (item: Plate, key: string) => {
    return item.name.toLowerCase().indexOf(key.toLowerCase()) !== -1;
  };
</script>

<DashboardTable
  texts={{ ...texts, title: "Piatti" }}
  {items}
  {columns}
  {filter}
  editable
  delitable
  on:create={handleCreate}
  on:update={handleUpdate}
  on:delete={handleDelete}
>
  <div class="flex gap-5" slot="actions" let:item>
    <ImageOutline on:click={() => navigate(`${item.id}/image`)} />
    <Tooltip shadow={false} class="bg-sky-300 dark:bg-sky-200 text-sky-900"
      >Immagine</Tooltip
    >
    <InfoCircleOutline on:click={() => navigate(`${item.id}/ingredient`)} />
    <Tooltip shadow={false} class="bg-sky-300 dark:bg-sky-200 text-sky-900">
      Ingredienti
    </Tooltip>
  </div>
</DashboardTable>
