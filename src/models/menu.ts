export enum Menu {
  Carte = "Carte",
  Lunch = "Lunch",
  Dinner = "Dinner",
}

export function menuName(menu: Menu): string {
  switch (menu) {
    case Menu.Carte:
      return "Carta";
    case Menu.Lunch:
      return "Pranzo";
    case Menu.Dinner:
      return "Cena";
  }
}

export function menuFromName(menu: string): Menu {
  switch (menu) {
    case "Carta":
      return Menu.Carte;
    case "Cena":
      return Menu.Dinner;
    default:
      return Menu.Lunch;
  }
}
