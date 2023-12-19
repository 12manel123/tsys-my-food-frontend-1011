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
  getOrdersDateApi(page:number,size:number,year:number,month:number,day:number): Observable<Order[]> {
    if(day == 0){
      if(month == 0){
        if(year==0){
          return this.http.get<any[]>(this.url+"?page="+page+"&size="+size);
        }
        else{
          return this.http.get<any[]>(this.url+"/date?year="+year+"&size=100");
        }
        
      }
      else{
        return this.http.get<any[]>(this.url+"/date?year="+year+"&month="+month+"&size=100");
      }
    }
    return this.http.get<any[]>(this.url+"/date?year="+year+"&month="+month+"&day="+day+"&size=100");
  }

  removeOrder(orderId: number):  Observable<any> {
    return this.http.delete<any[]>(this.url2+"/"+orderId);
  }

  getOrdersApiChef(num1:number,num2:number): Observable<Order[]> {
    return this.http.get<any[]>(this.url+"/chef?page="+num1+"&size="+num2);
  }

  removeOrderChef(orderId: number):  Observable<any> {
    return this.http.put(this.url2+"/markAsMaked/"+orderId, { headers: { 'Content-Type': 'application/json' } });
  }
}
