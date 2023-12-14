import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DishAdmin } from '../models/dish-admin';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DishesUserService {

  private url = environment.apiUrl + '/api/v1/dishes/visible';

  private http = inject(HttpClient)

  private dishes: DishAdmin[] = []

  private dishesSubject = new BehaviorSubject<DishAdmin[]>(this.dishes);

  getDishesFromApi() {
    return this.http.get<any[]>(this.url);
   }

  getDishes() {
    return this.dishesSubject.asObservable();
  }

}
