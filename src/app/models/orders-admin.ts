import {DishAdmin} from "./dish-admin";
import { Slot } from "./slots-admin";
export interface Order {
    id: number;
    maked: boolean;
    slot?: Slot; 
    price: number;
    datetime: Date;
    dishes: DishAdmin[];
}
