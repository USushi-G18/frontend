import type { Menu } from "./menu";

export type Plate = {
  id: number;
  name: string;
  price: string;
  categoryID: number;
  menu: Menu;
  description?: string;
  imageID?: number;
  orderLimit?: number;
  pieces: number;
};
