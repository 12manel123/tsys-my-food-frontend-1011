import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, of, tap } from 'rxjs';
import { DishAdmin } from '../models/dish-admin';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class DishesDbService {


  private url = environment.apiUrl + '/api/v1/dishes';
  private url2 = environment.apiUrl + '/api/v1/dish';
  private url3 = environment.apiUrl + '/api/v1/atribut'
  
  constructor(private http: HttpClient) {}

  private dishes: DishAdmin[] = []
  private dishesSubject = new BehaviorSubject<DishAdmin[]>(this.dishes);
  private lastId = this.dishes.length > 0 ? Math.max(...this.dishes.map((dish) => dish.id)) : 0;
  private dishVisibilityChanged = new Subject<number>();


  getDishesFromApi(num1:number, num2:number) {
    return this.http.get<any[]>(this.url+"?page="+num1+"&size="+num2);
  }

  getDishes() {
    return this.dishesSubject.asObservable();
  }
  
  getDishesCategoryFromApi(category:string,num1:number, num2:number){
    return this.http.get<any[]>(this.url+"/byCategory/"+category+"?page="+num1+"&size="+num2);
  }

  deleteDish(dishId: number) {
    return this.http.delete<any[]>(this.url2+"/"+dishId);
  }

  addDish(dish: DishAdmin) {
    return this.http.post(this.url2,dish, { headers: { 'Content-Type': 'application/json' } });

  }

  updateDish(updatedDish: DishAdmin) {
    return this.http.put(this.url2+"/"+updatedDish.id,updatedDish, { headers: { 'Content-Type': 'application/json' } });
  }


  changeDishVisibility(dishId: number): Observable<any> {
    return this.http.put(`${this.url2}/changeVisibility/${dishId}`, null)
      .pipe(
        tap(() => {
          this.dishVisibilityChanged.next(dishId);
        })
      );
  }

  getDishVisibilityChanges(): Observable<number> {
    return this.dishVisibilityChanged.asObservable();
  }

  getDishNameById(dishId: number): Observable<string> {
    const dish = this.dishes.find((d) => d.id === dishId);
    return dish ? of(dish.name) : of('Plato no encontrado');
  }

  getDishDetailsByIds(dishIds: number[]): DishAdmin[] {
    return this.dishes.filter((dish) => dishIds.includes(dish.id));
  }

  getDishById(dishId: number): Observable<DishAdmin[]> {
    const dish = this.dishes.find((d) => d.id === dishId);
    return of(dish ? [dish] : []);
  }

  addRelationAttribute(idAt: number, dishId: number) {
    return this.http.post(this.url3+"/"+idAt + "/dish/"+dishId,{ headers: { 'Content-Type': 'application/json' } });
  }

  deleteRelationAttribute(idAt: number, dishId: number) {
    return this.http.delete<any[]>(this.url3+"/"+idAt + "/dish/"+dishId);
  }

}
