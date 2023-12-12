// orders-db.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, throwError } from 'rxjs';
import { Order } from '../models/orders-admin';
import { DishAdmin } from '../models/dish-admin';
import { AsyncPipe } from '@angular/common';
import { DishesDbService } from './dishes-db.service';
@Injectable({
  providedIn: 'root'
})
export class OrdersDbService {
  private orders: Order[] = [
    {
      id: 1,
      maked: false,
      slot: { id: 4, time: '12:45', limit_slot: 15, actual: 2 },
      price: 25.99,
      datetime: new Date(),
      dishes: [
        {
          id: 3,
          name: 'Mushroom Risotto',
          description: 'Creamy mushroom risotto with Arborio rice.',
          image: 'https://example.com/mushroom-risotto.jpg',
          price: 14.99,
          category: 'first',
          attributes: ['vegetarian'],
        },
        {
          id: 4,
          name: 'BBQ Chicken Pizza',
          description: 'Pizza topped with BBQ chicken, red onions, and cilantro.',
          image: 'https://example.com/bbq-chicken-pizza.jpg',
          price: 16.99,
          category: 'second',
          attributes: [],
        }
      ]
    },
    {
      id: 2,
      maked: false,
      slot: { id: 2, time: '12:15', limit_slot: 15, actual: 2 },
      price: 25.99,
      datetime: new Date(),
      dishes: [
        {
          id: 3,
          name: 'Mushroom Risotto',
          description: 'Creamy mushroom risotto with Arborio rice.',
          image: 'https://example.com/mushroom-risotto.jpg',
          price: 14.99,
          category: 'first',
          attributes: ['vegetarian'],
        },
        {
          id: 4,
          name: 'BBQ Chicken Pizza',
          description: 'Pizza topped with BBQ chicken, red onions, and cilantro.',
          image: 'https://example.com/bbq-chicken-pizza.jpg',
          price: 16.99,
          category: 'second',
          attributes: [],
        }
      ]
    },
    {
      id: 3,
      maked: true,
      slot: { id: 1, time: '12:00', limit_slot: 15, actual: 2 },
      price: 30.5,
      datetime: new Date(),
      dishes: [
        {
          id: 1,
          name: 'Caesar Salad',
          description: 'Classic Caesar salad with romaine lettuce, croutons, and parmesan cheese.',
          image: 'https://itsavegworldafterall.com/wp-content/uploads/2023/04/Avocado-Caesar-Salad-FI.jpg',
          price: 9.99,
          category: 'appetizer',
          attributes: ['vegetarian'],
        },
        {
          id: 2,
          name: 'Grilled Salmon',
          description: 'Grilled salmon fillet served with lemon butter sauce.',
          image: 'https://www.thecookierookie.com/wp-content/uploads/2023/05/featured-grilled-salmon-recipe.jpg',
          price: 18.99,
          category: 'first',
          attributes: ['lactose'],
        }
      ]
    }
  ];

  private ordersSubject: BehaviorSubject<Order[]> = new BehaviorSubject<Order[]>([]);

  constructor(private dishesDbService: DishesDbService) {
    console.log('OrdersDbService constructor called');
    this.ordersSubject = new BehaviorSubject<Order[]>(this.orders);
  }
  

  getOrders(): Observable<Order[]> {
    console.log('getOrders called');
    console.log('Orders:', this.ordersSubject.value);
    return this.ordersSubject.asObservable();
  }

  addOrder(order: Order): void {
    console.log('addOrder called');
    this.orders.push(order);
    this.ordersSubject.next([...this.orders]);
  }

  removeOrder(orderId: number): void {
    this.orders = this.orders.filter(order => order.id !== orderId);
    this.ordersSubject.next([...this.orders]);
  }

  addDishToOrder(orderId: number, dish: DishAdmin): void {
    const order = this.orders.find(o => o.id === orderId);
    if (order) {
      order.dishes.push(dish);
      this.ordersSubject.next([...this.orders]);
    }
  }
  
  getAvailableDishes(): Observable<DishAdmin[]> {
    return this.dishesDbService.getDishes();
  }

  addDishByIdToOrder(orderId: number, dishId: number): Observable<void> {
    const order = this.orders.find(o => o.id === orderId);

    if (!order) {
      return throwError('Orden no encontrada');
    }

    return this.dishesDbService.getDishById(dishId).pipe(
      map((dishDetails: DishAdmin[]) => {
        if (dishDetails.length === 0) {
          throw new Error('Plato no encontrado');
        }
        const dishToAdd: DishAdmin = dishDetails[0];
        order.dishes.push(dishToAdd);
        this.ordersSubject.next([...this.orders]);
      })
    );
  }

  removeDishFromOrder(orderId: number, dishId: number): void {
    const order = this.orders.find(o => o.id === orderId);
    if (order) {
      order.dishes = order.dishes.filter(d => d.id !== dishId);
      this.ordersSubject.next([...this.orders]);
    }
  }

  getTotalOrdersCount(): number {
    return this.orders.length;
  }
}
