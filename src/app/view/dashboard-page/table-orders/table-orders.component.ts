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
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-table-orders',
  standalone: true,
  imports: [DatePipe,MatCardModule,CurrencyPipe,
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

  // loadOrdersDate(): void {
  //   const startIndex = this.currentPage - 1;
  //   const endIndex = this.selectedPageSize;
    
  //   let year = prompt('Ingrese el año (presione Enter para no filtrar): ');
  //   let month = prompt('Ingrese el mes (presione Enter para no filtrar): ');
  //   let day = prompt('Ingrese el día (presione Enter para no filtrar): ');
  
  //   let numericYear = year !== null ? parseInt(year, 10) : 0;
  //   let numericMonth = month !== null ? parseInt(month, 10) : 0;
  //   let numericDay = day !== null ? parseInt(day, 10) : 0;

  //   if (isNaN(numericYear)) {
  //     numericYear = 0;
  //   }
  //   if (isNaN(numericMonth)) {
  //     numericMonth = 0;
  //   }
  //   if (isNaN(numericDay)) {
  //     numericDay = 0;
  //   }

  //   this.ordersDbService.getOrdersDateApi(startIndex, endIndex, numericYear, numericMonth, numericDay)
  //     .subscribe((orders: any) => {
  //       const { totalElements, totalPages, content, size } = orders;
  //       this.totalPages = totalPages;
  //       this.totalEntities = totalElements;
  //       this.selectedPageSize = size;
  //       this.orders = content;
  //       this.ordersDate=content;

  //     });
  // }

  
    
  onChange(event: any): void {
    this.selectedPageSize = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    this.loadOrders();
  }

  // removeOrder(orderId: number): void {
  //   if (confirm('¿Estás seguro de que deseas eliminar este usuario con ID: '+ orderId+"?")) {
  //     this.ordersDbService.removeOrder(orderId).subscribe(() => {
  //       this.loadOrders();
  //       this.totalPages = Math.ceil(this.totalEntities / this.selectedPageSize);
  //     });
  //   }
  //   this.loadOrders();
  // }

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
            'The user with ID ' + orderId + ' has been deleted.',
            'success'
          ).then(() => {
            this.loadOrders();
            this.totalPages = Math.ceil(this.totalEntities / this.selectedPageSize);
          });
        }, (error) => {
          Swal.fire('Error', 'An error occurred while deleting the user.', 'error');
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

  // openDatePicker(): void {
  //   Swal.fire({
  //     title: 'Select date',
  //     input: 'date',
  //     didOpen: () => {
  //       const today = new Date().toISOString().split('T')[0];
  //       const input = Swal.getInput();
  //       if (input !== null) {
  //         input.min = today;
  //       }
  //     },
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       const selectedDate = result.value;
  //       // Filtrar por la fecha seleccionada
  //       this.filterOrdersByDate(selectedDate);
  //     }
  //   });
  // }

  openDatePicker(): void {
    const today = new Date().toISOString().split('T')[0];
  
    Swal.fire({
      title: 'Select date',
      input: 'date',
      inputAttributes: {
        min: '1900-01-01', // Establecer la fecha mínima según tus necesidades
      },
      didOpen: () => {
        const input = Swal.getInput();
        if (input !== null) {
          // Establecer la fecha actual como valor predeterminado
          input.value = today;
          // Puedes ajustar la fecha mínima según tus necesidades
          input.min = '1900-01-01';
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const selectedDate = result.value;
        // Filtrar por la fecha seleccionada
        this.filterOrdersByDate(selectedDate);
      }
    });
  }
  
  

  filterOrdersByDate(selectedDate: string): void {
    // Convertir la fecha seleccionada al formato requerido por tu servicio
    const [year, month, day] = selectedDate.split('-').map(Number);

    // Llamar al método para cargar las órdenes filtradas por la fecha
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

}
