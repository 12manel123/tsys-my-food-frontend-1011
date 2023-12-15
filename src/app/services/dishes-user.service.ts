import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class DishesUserService {

  private urlDishes = environment.apiUrl + '/api/v1/dishes/visible';
  private urlMenus = environment.apiUrl + '/api/v1/allVisibleMenus';
  private urlCatagory = environment.apiUrl + '/api/v1/dishes/visibleByCategory/';
  private urlAttribute = environment.apiUrl + '/api/v1/atribut/visible/';

  private http = inject(HttpClient)

  getDishesFromApi() {
    return this.http.get<[]>(this.urlDishes).pipe(catchError(this.handleError<any>('getDishesFromApi')));
  }

  getMenusFromApi() {
    return this.http.get<any[]>(this.urlMenus, { headers: { 'Content-Type': 'application/json' } }).pipe(catchError(this.handleError<any>('getMenusFromApi')));
  }

  getDishesByCategoryFromApi(category: string) {
    return this.http.get<[]>(this.urlCatagory + category).pipe(catchError(this.handleError<any>('getDishesByCategoryFromApi')));
  }

  getDishesByAttributeFromApi(attribute: string) {
    return this.http.get<[]>(this.urlAttribute + attribute +"/dishes").pipe(catchError(this.handleError<any>('getDishesByAttributeFromApi')));
  }

  private handleError<T>(operation = 'opearation',result?:T){
    return (error:any):Observable<T>=>{
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      Swal.fire({
        icon: 'error',
        title: 'Oops... 🤷',
        text: "We don't have plates for samples!",
      })
      return of(result as T);
    }
  }

}
