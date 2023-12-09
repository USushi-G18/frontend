import { Menu } from './menu';

export type Plate = {
    id: number,
    name: string,
    price: string,
    ingredients: string[],
    category: string,
    menu: Menu,
    img: string,
    description: string,
}