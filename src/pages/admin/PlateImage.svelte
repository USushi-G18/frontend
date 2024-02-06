<script lang="ts">
  import { Fileupload, Img } from "flowbite-svelte";
  import { images, plates } from "../../store/models";
  import { createReq, updateReq } from "../../utils/fetch";

  export let plateID: number;

  $: plate = $plates.find((p) => p.id === plateID);
  $: base64img = $images.find((i) => i.id === plate?.imageID)?.image;

  const handleFileUpload = (event: Event) => {
    if (event.target) {
      const target = event.target as HTMLInputElement;
      if (target.files) {
        const file = target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
          let base64data = reader.result as string;
          base64data = base64data.slice(base64data.indexOf(",") + 1);
          let res = await createReq("image", {
            image: base64data,
          });
          let body = await res.json();
          if (!("id" in body)) {
            return;
          }
          let p = { ...plate, imageID: body.id };
          res = await updateReq(`plate/${plateID}`, p);
          if (res.status === 200) {
            base64img = base64data as string;
          }
        };
      }
    }
  };
</script>

<form class="flex flex-col items-center space-y-6">
  {#if base64img !== undefined}
    <Img
      class="rounded-lg"
      size="max-w-[30rem]"
      src="data:image;base64, {base64img}"
      alt="img"
    />
  {/if}
  <Fileupload name="img" on:change={handleFileUpload} />
</form>
