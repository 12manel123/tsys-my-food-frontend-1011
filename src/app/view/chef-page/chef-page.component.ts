import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../../services/token-storage.service';
import { Order } from '../../models/orders-admin';
import { MatTableDataSource } from '@angular/material/table';
import { OrdersDbService } from '../../services/orders-db.service';
import { JsonPipe } from '@angular/common';
import { NgClass } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-chef-page',
  standalone: true,
  imports: [JsonPipe,NgClass,MatButtonModule],
  templateUrl: './chef-page.component.html',
  styleUrl: './chef-page.component.css'
})
export class ChefPageComponent implements OnInit{
  orders: Order[] = [];

  selectedOrderId: number | null = null;
  displayedColumns: string[] = ['id', 'maked', 'slot', 'price', 'datetime', 'dishes', 'actions'];
  dataSource: MatTableDataSource<Order> = new MatTableDataSource<Order>([]);
  totalEntities: number = 0;
  public selectedPageSize: number = 8;
  servToker = inject(TokenStorageService)
  currentTime: string = '';
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(private router: Router,public ordersDbService: OrdersDbService,private snackBar: MatSnackBar) {}

  loadOrders(): void {
    const startIndex = this.currentPage - 1;
    const endIndex = this.selectedPageSize;
    this.ordersDbService.getOrdersApiChef(startIndex,endIndex).subscribe((orders:any) => {
      const {totalElements,totalPages,content,size}=orders;
      this.totalPages = totalPages;
      this.totalEntities=totalElements;
      this.selectedPageSize=size
      this.orders = content;
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

    setInterval(() => {
      this.updateCurrentTime();
    }, 1000);  }

    updateCurrentTime() {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      this.currentTime = `${hours}:${minutes}`;
    }

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
      this.snackBar.open('Reloading orders', 'Close', {
        duration: 2000,
        panelClass: ['copied-snackbar'],
      });
      this.loadOrders();
    }

    closePage() {
      this.servToker.singOut();
      this.router.navigateByUrl('/');
    }

    alertDelete(orderId : number):void {
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
