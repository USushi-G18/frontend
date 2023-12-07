import { StateOfOrder } from "./orderstate";
import type { OrderedPlate } from "./ordered_plate";

export type Order = {
	table: number,
	timestamp: Date,
	ordered_plate: OrderedPlate,
	status: StateOfOrder,
}