import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Card } from '../../models/dish-chef';
import { ChefService } from '../../services/chef.service';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-chef-page',
  standalone: true,
  imports: [],
  templateUrl: './chef-page.component.html',
  styleUrl: './chef-page.component.css'
})
export class ChefPageComponent implements OnInit{

  servToker = inject(TokenStorageService)
  currentTime: string = '';
  currentPage: number = 1;
  totalPages: number = 1;
  itemsPerPage: number = 8;

  cards: Card[] = [];

  constructor(private chefService: ChefService,private router: Router) {}

  ngOnInit() {

    this.updateCurrentTime();
    this.totalPages = Math.ceil(this.chefService.getOrdersCount() / this.itemsPerPage);
    this.loadCurrentPageOrders();

    setInterval(() => {
      this.updateCurrentTime();
    }, 1000);  }

    updateCurrentTime() {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      this.currentTime = `${hours}:${minutes}`;
    }

    loadCurrentPageOrders() {
      this.chefService.getOrdersPage(this.currentPage, this.itemsPerPage)
        .subscribe(orders => this.cards = orders);
    }

    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.loadCurrentPageOrders();
      }
    }

    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.loadCurrentPageOrders();
      }
    }

    reloadPage() {
      console.log('Recargar página');
      this.loadCurrentPageOrders();
    }

  closePage() {
       this.servToker.singOut();
      this.router.navigateByUrl('/');
    }

    deleteOrder(orderId: number) {
      this.chefService.deleteOrder(orderId);
      this.loadCurrentPageOrders();
      this.totalPages = Math.ceil(this.chefService.getOrdersCount() / this.itemsPerPage);
    }

}
