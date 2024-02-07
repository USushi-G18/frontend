import type { Menu } from "./menu";

export type Session = {
  id: number;
  startAt: string;
  endAt: string;
  tableNumber: number;
  menu: Menu;
  seating: number;
};
