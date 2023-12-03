<script lang="ts">
    import { Card } from "flowbite-svelte";
    import OrderStatus from "./OrderStatus.svelte";
    import type { Order } from "../../models/order";

    export let table: number;
    export let orders: Order[] | undefined;
    
</script>

<Card padding="md" class="w-full">
    <h5 class="mb-2 text-2xl font-medium text-gray-500 dark:text-gray-400">
        Tavolo {table}
    </h5>
    <table class="my-4 space-y-4 w-full">
        {#if orders != undefined}
            {#each orders as ord}
                <tr>
                    <td class="max-w-[9rem] text-ellipsis overflow-hidden whitespace-nowrap">
                    <span
                        class="text-base font-normal text-gray-700 dark:text-gray-400"
                            >{ord.ordered_plate.plate.name}
                        </span>
                    </td>
                    <td class="text-center">
                        <span
                            class=" text-base font-normal text-gray-700 dark:text-gray-400"
                            >x {ord.ordered_plate.quantity}
                        </span>
                    </td>
                    <td>
                        <OrderStatus state={ord.status} />
                    </td>
                </tr>
            {/each}
        {/if}
    </table>
</Card>
