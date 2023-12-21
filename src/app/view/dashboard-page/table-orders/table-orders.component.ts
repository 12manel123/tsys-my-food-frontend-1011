import { Component, OnInit } from '@angular/core';
import { OrdersDbService } from '../../../services/orders-db.service';
import { Order, OrderDate } from '../../../models/orders-admin';
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
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CurrencyPipe } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-table-orders',
  standalone: true,
  imports: [DatePipe,MatCardModule,CurrencyPipe,NgClass,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatTableModule,JsonPipe,
    MatPaginatorModule,MatFormFieldModule],
  templateUrl: './table-orders.component.html',
  styleUrl: './table-orders.component.css'
})
export class TableOrdersComponent implements OnInit {
  orders: Order[] = [];
  ordersDate: OrderDate[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 2;
  totalPages: number = 0;
  availableDishes: DishAdmin[] = [];
  selectedOrderId: number | null = null;
  displayedColumns: string[] = ['id', 'maked', 'slot', 'price', 'datetime', 'dishes', 'actions'];
  displayedColumnsDate: string[] = ['id', 'maked', 'slot', 'price', 'datetime', 'actions'];

  dataSource: MatTableDataSource<Order> = new MatTableDataSource<Order>([]);
  totalEntities: number = 0;
  public selectedPageSize: number = 10;

  showOrders: boolean = true;


  constructor(public ordersDbService: OrdersDbService,private dishesDbService: DishesDbService,private router: Router) { }

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
      this.ordersDate=[];
    });
  }
    
  onChange(event: any): void {
    this.selectedPageSize = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    this.loadOrders();
  }

  removeOrder(orderId: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ordersDbService.removeOrder(orderId).subscribe(() => {
          Swal.fire(
            'Deleted!',
            'The order with ID ' + orderId + ' has been deleted.',
            'success'
          ).then(() => {
            this.loadOrders();
            this.totalPages = Math.ceil(this.totalEntities / this.selectedPageSize);
          });
        });
      }
    });
  }

  returnToPreviousView() {
    this.ordersDate = [];
    this.reloadPage();
  }

  reloadPage() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  openDatePicker(): void {
    const today = new Date().toISOString().split('T')[0];
  
    Swal.fire({
      title: 'Select date',
      input: 'date',
      inputAttributes: {
        min: '1900-01-01', 
      },
      didOpen: () => {
        const input = Swal.getInput();
        if (input !== null) {
          input.value = today;
          input.min = '1900-01-01';
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const selectedDate = result.value;
        this.filterOrdersByDate(selectedDate);
      }
    });
  }

  filterOrdersByDate(selectedDate: string): void {
    const [year, month, day] = selectedDate.split('-').map(Number);

    this.loadOrdersDate(year, month, day);
  }

  loadOrdersDate(year: number, month: number, day: number): void {
    const startIndex = this.currentPage - 1;
    const endIndex = this.selectedPageSize;

    this.ordersDbService.getOrdersDateApi(startIndex, endIndex, year, month, day)
      .subscribe((orders: any) => {
        const { totalElements, totalPages, content, size } = orders;
        this.totalPages = totalPages;
        this.totalEntities = totalElements;
        this.selectedPageSize = size;
        this.orders = content;
        this.ordersDate = content;
      });
  }
  isEven(row: any): boolean {
    return this.orders.indexOf(row) % 2 === 0;
  }

}
