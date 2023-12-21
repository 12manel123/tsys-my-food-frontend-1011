export interface DishChef {
    name: string;
  }
  
  export  interface Card {
    id: number;
    time: string;
    dishes: DishChef[];
  }