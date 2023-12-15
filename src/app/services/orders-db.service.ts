// orders-db.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, throwError } from 'rxjs';
import { Order } from '../models/orders-admin';
import { DishAdmin } from '../models/dish-admin';
import { AsyncPipe } from '@angular/common';
import { DishesDbService } from './dishes-db.service';
import { inject } from '@angular/core';
import {  of } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class OrdersDbService {

  private ordersSubject: BehaviorSubject<Order[]> = new BehaviorSubject<Order[]>([]);
  
  private url = environment.apiUrl + '/api/v1/orders';
  private url2 = environment.apiUrl + '/api/v1/order';
  private http = inject(HttpClient)

  getOrdersApi(num1:number,num2:number): Observable<Order[]> {
    return this.http.get<any[]>(this.url+"?page="+num1+"&size="+num2);
  }

  removeOrder(orderId: number):  Observable<any> {
    return this.http.delete<any[]>(this.url2+"/"+orderId);
  }
}
