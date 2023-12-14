import { Component, OnInit } from '@angular/core';
import { OrdersDbService } from '../../../services/orders-db.service';
import { Order } from '../../../models/orders-admin';
import { DishAdmin } from '../../../models/dish-admin';
import { DatePipe } from '@angular/common';
import { DishesDbService } from '../../../services/dishes-db.service';
import { JsonPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
@Component({
  selector: 'app-table-orders',
  standalone: true,
  imports: [DatePipe,MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule],
  templateUrl: './table-orders.component.html',
  styleUrl: './table-orders.component.css'
})
export class TableOrdersComponent implements OnInit {
  orders: Order[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 2;
  totalPages: number = 0;
  availableDishes: DishAdmin[] = [];
  selectedOrderId: number | null = null;
  displayedColumns: string[] = ['id', 'maked', 'slot', 'price', 'datetime', 'dishes', 'actions'];
  dataSource: MatTableDataSource<Order> = new MatTableDataSource<Order>([]);

  
  constructor(public ordersDbService: OrdersDbService,private dishesDbService: DishesDbService) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = this.currentPage * this.itemsPerPage;

    this.ordersDbService.getOrders().subscribe(orders => {
      this.orders = orders.slice(startIndex, endIndex);
      this.totalPages = Math.ceil(this.ordersDbService.getTotalOrdersCount() / this.itemsPerPage);
    });
  }

  loadAvailableDishes(): void {
    this.ordersDbService.getAvailableDishes().subscribe(dishes => {
      this.availableDishes = dishes;
    });
  }

  addDishToOrderWithAlert(orderId: number): void {
    const dishIdString = prompt('Enter the ID of the dish to add:');
    if (dishIdString) {
      const dishId = parseInt(dishIdString, 10);
      this.addDishToOrder(orderId, dishId);
    }
  }
  
  onChange(event: any): void {
    this.itemsPerPage = event.pageSize;
    this.currentPage = 1;
    this.loadOrders();
    this.currentPage = event.pageIndex + 1;
    this.loadOrders();
  }



  removeOrder(orderId: number): void {
    this.ordersDbService.removeOrder(orderId);
  }

  addDishToOrder(orderId: number, dishId: number): void {
    if (orderId !== null) {
      const selectedOrder = this.orders.find(order => order.id === orderId);
      if (selectedOrder) {
        this.dishesDbService.getDishById(dishId).subscribe(
          (selectedDish) => {
            if (selectedDish && selectedDish.length > 0) {
              this.ordersDbService.addDishToOrder(orderId, selectedDish[0]);
              alert("Plato agregado a la orden");
            } else {
              alert("Plato no encontrado");
            }
          },
          (error) => {
            console.error("Error al obtener el plato:", error);
            alert("Error al obtener el plato");
          }
        );
      }
    }
  }

  removeDishFromOrder(orderId: number, dishId: number): void {
    this.ordersDbService.removeDishFromOrder(orderId, dishId);
  }
}
