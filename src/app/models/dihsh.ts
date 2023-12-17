export interface Dish {
  id: number,
  name: string,
  description: string,
  image: string,
  price: number,
  category: string,
  attributes: string[],
  visible: boolean
}
