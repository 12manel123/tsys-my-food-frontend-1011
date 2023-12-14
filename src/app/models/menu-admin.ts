import { DishAdmin } from "./dish-admin";

export interface Menu {
    id: number;
    categoryAppetizer: DishAdmin;
    categoryFirst: DishAdmin;
    categorySecond: DishAdmin;
    categoryDessert: DishAdmin;
    visible: boolean;
}