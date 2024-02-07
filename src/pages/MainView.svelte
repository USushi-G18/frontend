<script lang="ts">
  import { Toast } from "flowbite-svelte";
  import { BellRingSolid, CheckCircleSolid } from "flowbite-svelte-icons";
  import { notification } from "../store/notification";
  import { globalHistory, navigate, useNavigate } from "svelte-navigator";

  const navigator = useNavigate();

  const historyStore = { subscribe: globalHistory.listen };
  historyStore.subscribe(() => {
    let path = window.location.pathname;
    if (path.startsWith("/admin")) {
      if (!localStorage.getItem("ADMIN_TOKEN")) {
        navigate("/");
      }
    } else if (path.startsWith("/kitchen")) {
      if (!localStorage.getItem("EMPLOYEE_TOKEN")) {
        navigate("/");
      }
    } else if (path.startsWith("/restaurant")) {
      if (!localStorage.getItem("CLIENT_TOKEN")) {
        navigate("/");
      }
    }
    $notification = undefined;
  });

  let color: "green" | "red" = "green";
  $: notify = $notification;
  $: {
    color = notify?.type === "ERROR" ? "red" : "green";
  }
</script>

<main
  class="min-h-screen max-w-full bg-gray-100 dark:bg-gray-600 flex flex-col items-center"
>
  <slot name="navbar" />
  {#if notify !== undefined}
    <Toast class="mt-4" {color} on:close={() => ($notification = undefined)}>
      <svelte:fragment slot="icon">
        {#if notify.type === "ERROR"}
          <BellRingSolid class="w-5 h-5" />
        {:else if notify.type === "INFO"}
          <CheckCircleSolid class="w-5 h-5" />
        {/if}
      </svelte:fragment>
      {notify.message}
    </Toast>
  {/if}
  <div class="flex justify-center items-center h-auto flex-grow w-full">
    <slot name="content" />
  </div>
</main>
