import { StateOfOrder } from "./orderstate";
import type { OrderedPlate } from "./ordered_plate";

export type Order = {
	table: number,
	ordered_plate: OrderedPlate,
	status: StateOfOrder,
}