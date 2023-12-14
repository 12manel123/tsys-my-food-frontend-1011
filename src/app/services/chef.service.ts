import { Injectable } from '@angular/core';
import { Card } from '../models/dish-chef';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChefService {
  private simulateOrders: number = 17;
  private cards: Card[] = [];

  constructor() {
    this.generateOrders();
  }

  private generateOrders() {
    for (let i = 1; i <= this.simulateOrders; i++) {
      this.cards.push({
        id: i,
        time: '12:30',
        dishes: [
          { name: 'Plato 1' },
          { name: 'Plato 2' },
          { name: 'Plato 1' },
          { name: 'Plato 2' },
          { name: 'Plato 1' },
          { name: 'Plato 2' },
          { name: 'Plato 1' },
          { name: 'Plato 2' },
          { name: 'Plato 1' },
          { name: 'Plato 2' },
          { name: 'Plato 1' },
          { name: 'Plato 2' },
          { name: 'Plato 1' },
          { name: 'Plato 2' },
          { name: 'Plato 1' },
          { name: 'Plato 2' },
          { name: 'Plato 1' },
          { name: 'Plato 2' },
          { name: 'Plato 1' },
          { name: 'Plato 2' },
          { name: 'Plato 1' },
          { name: 'Plato 2' },
          { name: 'Plato 1' },
          { name: 'Plato 2' },
          { name: 'Plato 1' },
          { name: 'Plato 2' },
          { name: 'Plato 1' },
          { name: 'Plato 2' },
          { name: 'Plato 1' },
          { name: 'Plato 2' },
          { name: 'Plato 1' },
          { name: 'Plato 2' },
          { name: 'Plato 1' }                      ]
      });
    }
  }

  getOrdersCount(): number {
    return this.cards.length;
  }

  getOrdersPage(page: number, itemsPerPage: number): Observable<Card[]> {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const currentPageOrders = this.cards.slice(startIndex, endIndex);

    while (currentPageOrders.length < itemsPerPage) {
      currentPageOrders.push({
        id: 0,
        time: '',
        dishes: []
      });
    }

    return of(currentPageOrders);
  }

  deleteOrder(orderId: number): void {
    console.log(`Eliminar orden con ID: ${orderId}`);
    this.cards = this.cards.filter(card => card.id !== orderId);
  }
}
