import { Dish } from "./dihsh";

export interface Menu {
  id: number,
  appetizer: Dish,
  first: Dish,
  second: Dish,
  dessert: Dish,
  visible: boolean
}
