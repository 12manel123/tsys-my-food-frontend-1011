import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Dish {
  name: string;
}

interface Card {
  id: number;
  time: string;
  dishes: Dish[];
}

@Component({
  selector: 'app-chef-page',
  standalone: true,
  imports: [],
  templateUrl: './chef-page.component.html',
  styleUrl: './chef-page.component.css'
})
export class ChefPageComponent implements OnInit{
  currentTime: string = '';
  currentPage: number = 1;
  totalPages: number = 1;
  itemsPerPage: number = 8;
  simulateOrders: number = 17;

  cards: Card[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.updateCurrentTime();
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
          { name: 'Plato 1' },
          { name: 'Plato 2' },
          { name: 'Plato 1' },
          { name: 'Plato 2' },
          { name: 'Plato 1' },
          { name: 'Plato 2' },
          { name: 'Plato 1' },
          { name: 'Plato 2' },
          { name: 'Plato 1' },
          { name: 'Plato 1' },
          { name: 'Plato 2' },
          { name: 'Plato 1' },
          { name: 'Plato 2' },
          { name: 'Plato 1' }
        ]
      });
    }

    setInterval(() => {
      this.updateCurrentTime();
    }, 1000);

    this.totalPages = Math.ceil(this.cards.length /8);
  }

  updateCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    this.currentTime = `${hours}:${minutes}`;
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  reloadPage() {
    console.log('Recargar página');
  }

  closePage() {
    this.router.navigateByUrl('/');
  }

  getCurrentPageCards(): Card[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  const endIndex = startIndex + this.itemsPerPage;
  
  const currentPageCards = this.cards.slice(startIndex, endIndex);

  // Añadir tarjetas vacías si la página no tiene suficientes tarjetas
  while (currentPageCards.length < this.itemsPerPage) {
    currentPageCards.push({
      id: 0,
      time: '',
      dishes: []
    });
  }

  return currentPageCards;
  }

  deleteOrder(orderId: number) {
    console.log(`Eliminar orden con ID: ${orderId}`);
    this.cards = this.cards.filter(card => card.id !== orderId);
    this.totalPages = Math.ceil(this.cards.length / this.itemsPerPage);
  }

}