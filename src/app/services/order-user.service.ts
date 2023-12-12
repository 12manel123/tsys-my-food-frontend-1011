import { Injectable } from '@angular/core';
import { Order } from '../models/orders-admin';
import { Slot } from '../models/slots-admin';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderUserService {
  private slots: Slot[] = [
    { id: 1, time: '12:00', limit_slot: 15, actual: 1 },
    { id: 2, time: '12:15', limit_slot: 15, actual: 16 },
    { id: 3, time: '12:30', limit_slot: 15, actual: 2 },
    { id: 4, time: '12:45', limit_slot: 15, actual: 0 },
    { id: 5, time: '13:00', limit_slot: 15, actual: 15 },
    { id: 6, time: '13:15', limit_slot: 15, actual: 2 },
    { id: 7, time: '13:30', limit_slot: 15, actual: 2 },
    { id: 8, time: '13:45', limit_slot: 15, actual: 2 },
    { id: 9, time: '14:00', limit_slot: 15, actual: 2 },
    { id: 10, time: '14:15', limit_slot: 15, actual: 2 },
    { id: 11, time: '14:30', limit_slot: 15, actual: 2 },
    { id: 12, time: '14:45', limit_slot: 15, actual: 2 }
  ];
  private orders: Order[] = [
    {
      id: 1,
      maked: false,
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

  constructor() { }

  getOrderById(orderId: number): Observable<Order> {
    const order = this.orders.find(o => o.id === orderId);
    if (order) {
      return of(order);
    } else {
      return of();
    }
  }
  

  getAvailableSlots(): Observable<Slot[]> {
    const availableSlots = this.slots.filter(slot => slot.actual < slot.limit_slot);
    return of(availableSlots);
  }
  
}
