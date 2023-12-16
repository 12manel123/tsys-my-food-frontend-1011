import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Card } from '../../models/dish-chef';
import { ChefService } from '../../services/chef.service';
import { TokenStorageService } from '../../services/token-storage.service';
import { Order } from '../../models/orders-admin';
import { DishAdmin } from '../../models/dish-admin';
import { MatTableDataSource } from '@angular/material/table';
import { OrdersDbService } from '../../services/orders-db.service';
import { JsonPipe } from '@angular/common';
import { NgClass } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-chef-page',
  standalone: true,
  imports: [JsonPipe,NgClass],
  templateUrl: './chef-page.component.html',
  styleUrl: './chef-page.component.css'
})
export class ChefPageComponent implements OnInit{

  servToker = inject(TokenStorageService)
  currentTime: string = '';
  currentPage: number = 1;
  totalPages: number = 1;
  itemsPerPage: number = 1;

  cards: Card[] = [];

  constructor(private chefService: ChefService,private router: Router,public ordersDbService: OrdersDbService,private snackBar: MatSnackBar) {}
  orders: Order[] = [
    /*{
      orderId: 1,
      maked: false,
      price: 25.99,
      slot:{
        id: 1,
        time:"12:12",
        limitSlot: 1,
        actual:2
      },
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
          visible: false,
        },
        {
          id: 4,
          name: 'BBQ Chicken Pizza',
          description: 'Pizza topped with BBQ chicken, red onions, and cilantro.',
          image: 'https://example.com/bbq-chicken-pizza.jpg',
          price: 16.99,
          category: 'second',
          attributes: [],
          visible: false,
        }
      ]
    },
    {
      orderId: 2,
      maked: false,
      price: 25.99,
      slot:{
        id: 1,
        time:"12:31",
        limitSlot: 1,
        actual:2
      },
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
          visible: false,
        },
        {
          id: 4,
          name: 'BBQ Chicken Pizza',
          description: 'Pizza topped with BBQ chicken, red onions, and cilantro.',
          image: 'https://example.com/bbq-chicken-pizza.jpg',
          price: 16.99,
          category: 'second',
          attributes: [],
          visible: false,
        }
      ]
    },
    {
      orderId: 3,
      maked: true,
      price: 30.5,
      slot:{
        id: 1,
        time:"12:38",
        limitSlot: 1,
        actual:2
      },
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
          visible: true,
        },
        {
          id: 2,
          name: 'Grilled Salmon',
          description: 'Grilled salmon fillet served with lemon butter sauce.',
          image: 'https://www.thecookierookie.com/wp-content/uploads/2023/05/featured-grilled-salmon-recipe.jpg',
          price: 18.99,
          category: 'first',
          attributes: ['lactose'],
          visible: false,
        }
      ]
    }*/
  ];
  //orders: Order[] = [];
  availableDishes: DishAdmin[] = [];
  selectedOrderId: number | null = null;
  displayedColumns: string[] = ['id', 'maked', 'slot', 'price', 'datetime', 'dishes', 'actions'];
  dataSource: MatTableDataSource<Order> = new MatTableDataSource<Order>([]);
  totalEntities: number = 0;
  public selectedPageSize: number = 8;

  loadOrders(): void {
    const startIndex = this.currentPage - 1;
    const endIndex = this.selectedPageSize;
    this.ordersDbService.getOrdersApiChef(startIndex,endIndex).subscribe((orders:any) => {
      const {totalElements,totalPages,content,size}=orders;
      this.totalPages = totalPages;
      this.totalEntities=totalElements;
      this.selectedPageSize=size
      this.orders = content;
      console.log(content)
    });
  }

  deleteOrder(orderId: number): void {
    this.ordersDbService.removeOrderChef(orderId).subscribe(() => {
      this.loadOrders();
      this.selectedOrderId = orderId;
    });
  }

  ngOnInit() {
this.loadOrders();
    this.updateCurrentTime();
    //this.totalPages = Math.ceil(this.chefService.getOrdersCount() / this.itemsPerPage);
    //this.loadCurrentPageOrders();

    setInterval(() => {
      this.updateCurrentTime();
    }, 1000);  }

    updateCurrentTime() {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      this.currentTime = `${hours}:${minutes}`;
    }

    /*loadCurrentPageOrders() {
      this.chefService.getOrdersPage(this.currentPage, this.itemsPerPage)
        .subscribe(orders => this.cards = orders);
    }*/

    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.loadOrders();
      }
    }

    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.loadOrders();
      }
    }

    reloadPage() {
      console.log('Recargar página');
      this.loadOrders();
    }

  closePage() {
       this.servToker.singOut();
      this.router.navigateByUrl('/');
    }

    deleteOrderLocal(orderId: number) {
      this.chefService.deleteOrder(orderId);
      this.loadOrders();
      this.totalPages = Math.ceil(this.chefService.getOrdersCount() / this.itemsPerPage);
    }
    toggleCrossedOut(dish: any): void {
      dish = !dish.crossedOut;
    }

    copyToClipboard(orderId : number):void {
      this.snackBar.open('Deleted order '+orderId, 'Close', {
        duration: 1500,
        panelClass: ['copied-snackbar'],
      });
    }
    isPastTime(time?:string): boolean {
      if (!time) {
        return false;
      }
      const orderTime = new Date(time);
      const currentTime = new Date();
      const currentHours: number = currentTime.getHours();
      const currentMinutes: number = currentTime.getMinutes();
      const [hours, minutes]: number[] = time.split(':').map(Number);
      orderTime.setHours(currentHours, currentMinutes, 0, 0);
      if (currentHours < hours) {
          return false;
      } else if (currentHours === hours && currentMinutes < minutes) {
          return false;
      } else {
          return true;
      }
    }
    
}
