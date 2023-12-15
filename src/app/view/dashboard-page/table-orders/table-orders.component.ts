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
import { MatFormFieldModule } from '@angular/material/form-field';
@Component({
  selector: 'app-table-orders',
  standalone: true,
  imports: [DatePipe,MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,MatFormFieldModule],
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
  totalEntities: number = 0;
  public selectedPageSize: number = 10;

  constructor(public ordersDbService: OrdersDbService,private dishesDbService: DishesDbService) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    const startIndex = this.currentPage - 1;
    const endIndex = this.selectedPageSize;
    this.ordersDbService.getOrdersApi(startIndex,endIndex).subscribe((orders:any) => {
      const {totalElements,totalPages,content,size}=orders;
      this.totalPages = totalPages;
      this.totalEntities=totalElements;
      this.selectedPageSize=size
      this.orders = content;
      console.log(content)
    });
  }
  
  onChange(event: any): void {
    this.selectedPageSize = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    this.loadOrders();
  }

  removeOrder(orderId: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario con ID: '+ orderId+"?")) {
      this.ordersDbService.removeOrder(orderId).subscribe(() => {
        this.loadOrders();
        this.totalPages = Math.ceil(this.totalEntities / this.selectedPageSize);
      });
    }
    this.loadOrders();
  }

}
