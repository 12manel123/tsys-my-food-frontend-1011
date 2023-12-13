import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DishAdmin } from '../models/dish-admin';

@Injectable({
  providedIn: 'root'
})
export class DishesUserService {

  private dishes: DishAdmin[] = [
    {
      id: 1,
      name: 'Caesar Salad',
      description: 'Classic Caesar salad with romaine lettuce, croutons, and parmesan cheese.',
      image: 'https://itsavegworldafterall.com/wp-content/uploads/2023/04/Avocado-Caesar-Salad-FI.jpg',
      price: 9.99,
      category: 'appetizer',
      attributes: ['vegetarian'],
      visible: false
    },
    {
      id: 2,
      name: 'Grilled Salmon',
      description: 'Grilled salmon fillet served with lemon butter sauce.',
      image: 'https://www.thecookierookie.com/wp-content/uploads/2023/05/featured-grilled-salmon-recipe.jpg',
      price: 18.99,
      category: 'first',
      attributes: ['lactose'],
      visible: true
    },
    {
      id: 3,
      name: 'Mushroom Risotto',
      description: 'Creamy mushroom risotto with Arborio rice.',
      image: 'https://chefmunne.com/wp-content/uploads/2020/06/riso-micro.jpg',
      price: 14.99,
      category: 'first',
      attributes: ['vegetarian'],
      visible: false
    },
    {
      id: 4,
      name: 'BBQ Chicken Pizza',
      description: 'Pizza topped with BBQ chicken, red onions, and cilantro.',
      image: 'https://thecozycook.com/wp-content/uploads/2019/08/BBQ-Chicken-Pizza-.jpg',
      price: 16.99,
      category: 'second',
      attributes: [],
      visible: false
    },
    {
      id: 5,
      name: 'Chocolate Fondue',
      description: 'Rich chocolate fondue served with strawberries and marshmallows.',
      image: 'https://th.bing.com/th?id=OSK.f189fad82f35435742afc77fbdcff008&w=226&h=169&rs=2&qlt=80&o=6&cdv=1&pid=16.1',
      price: 12.99,
      category: 'dessert',
      attributes: ['nuts'],
      visible: false
    },
    {
      id: 6,
      name: 'Shrimp Scampi',
      description: 'Shrimp sautéed in garlic and white wine sauce, served over linguine.',
      image: 'https://th.bing.com/th?id=OSK.ff5ea37f2a2d5e354198a810c5e506d2&w=226&h=226&rs=2&qlt=80&o=6&cdv=1&pid=16.1',
      price: 20.99,
      category: 'second',
      attributes: [],
      visible: false
    },
    {
      id: 7,
      name: 'Vegetable Stir-Fry',
      description: 'Assorted vegetables stir-fried in a savory sauce, served with rice.',
      image: 'https://th.bing.com/th?id=OSK.2ecf3ec4a1bc4aa3b43a22e7333e02e0&w=226&h=339&rs=2&qlt=80&o=6&cdv=1&pid=16.1',
      price: 15.99,
      category: 'second',
      attributes: ['vegan', 'vegetarian'],
      visible: false
    },
    {
      id: 8,
      name: 'Key Lime Pie',
      description: 'Refreshing key lime pie with a graham cracker crust.',
      image: 'https://th.bing.com/th/id/OIP._txd9Hwain8m1-so-mkBhwAAAA?rs=1&pid=ImgDetMain',
      price: 8.99,
      category: 'dessert',
      attributes: ['vegetarian'],
      visible: true
    },
    {
      id: 9,
      name: 'Crispy Calamari',
      description: 'Crispy fried calamari rings served with marinara sauce.',
      image: 'https://th.bing.com/th/id/OIP._txd9Hwain8m1-so-mkBhwAAAA?rs=1&pid=ImgDetMain',
      price: 13.99,
      category: 'appetizer',
      attributes: [],
      visible: true
    },
    {
      id: 10,
      name: 'Beef Tacos',
      description: 'Spicy beef tacos with shredded lettuce, cheese, and salsa.',
      image: 'https://th.bing.com/th/id/OIP._txd9Hwain8m1-so-mkBhwAAAA?rs=1&pid=ImgDetMain',
      price: 11.99,
      category: 'first',
      attributes: [],
      visible: true
    },
    {
      id: 11,
      name: 'Lemon Sorbet',
      description: 'Light and tangy lemon sorbet served in a chilled bowl.',
      image: 'https://th.bing.com/th/id/OIP._txd9Hwain8m1-so-mkBhwAAAA?rs=1&pid=ImgDetMain',
      price: 7.99,
      category: 'dessert',
      attributes: ['vegan', 'vegetarian'],
      visible: true
    },
  ];
  private dishesSubject = new BehaviorSubject<DishAdmin[]>(this.dishes);

  getDishes() {
    return this.dishesSubject.asObservable();
  }

}
