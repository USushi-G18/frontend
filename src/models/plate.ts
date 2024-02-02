export enum Menu {
  Carte = "Carte",
  Lunch = "Lunch",
  Dinner = "Dinner",
}

export type Plate = {
  id: number;
  name: string;
  price: string;
  ingredients: string[];
  category: string;
  menu: Menu;
  img: string;
  description: string;
  pieces: number;
};
