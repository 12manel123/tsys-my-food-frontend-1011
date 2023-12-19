import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Router } from '@angular/router';
import { TokenStorageService } from './token-storage.service';
import { Dish } from '../models/dihsh';
import { Menu } from '../models/menu';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class DishesUserService {

  // Injects the Router and HttpClient services
  private routes = inject(Router);
  private http = inject(HttpClient)
  private servToker = inject(TokenStorageService)

  // Routes to the API endpoints
  private urlDishes = environment.apiUrl + '/api/v1/dishes/visible?size=1000';
  private urlMenus = environment.apiUrl + '/api/v1/allVisibleMenus';
  private urlCatagory = environment.apiUrl + '/api/v1/dishes/visibleByCategory/';
  private urlAttribute = environment.apiUrl + '/api/v1/atribut/visible/';


  /**
  * Retrieves a list of dishes from the API.
  *
  * @return An Observable containing the list of dishes retrieved from the API.
  */
  getDishesFromApi() {
    return this.http.get<Dish[]>(this.urlDishes);
  }

  /**
  * Retrieves a list of menus from the API.
  *
  * @return An Observable containing the list of menus retrieved from the API.
  */
  getMenusFromApi() {
    return this.http.get<Menu[]>(this.urlMenus, { headers: { 'Content-Type': 'application/json' } }).pipe(
      catchError((error) => {
        Swal.fire({
          title: '<strong>Opps!</strong>',
          icon: 'info',
          html:'We have problems showing the data try later',
          showCloseButton: true,

          focusConfirm: false,
          confirmButtonText:
          'Try after a few minutes! <i class="fa fa-thumbs-up"></i>',
        })
        this.servToker.singOut();
        this.routes.navigate(['/']);
        return error;
      })
    );
  }

  /**
  * Retrieves a list of dishes from the API based on the specified category.
  *
  * @param category The category used to filter dishes from the API.
  * @return An Observable containing the list of dishes retrieved from the API.
  */
  getDishesByCategoryFromApi(category: string) {
    return this.http.get<Dish[]>(this.urlCatagory + category +'?size=1000').pipe(
      catchError((error: any) => {
        Swal.fire({
          title: '<strong>Opps!</strong>',
          icon: 'info',
          html:'We have problems showing the data try later',
          showCloseButton: true,

          focusConfirm: false,
          confirmButtonText:
          'Try after a few minutes! <i class="fa fa-thumbs-up"></i>',
        })
        this.servToker.singOut();
        this.routes.navigate(['/']);
        return error;
      }));
  }

  /**
 * Retrieves a list of dishes from the API based on the specified attribute.
 *
 * @param attribute The attribute used to filter dishes from the API.
 * @return An Observable containing the list of dishes retrieved from the API.
 */
  getDishesByAttributeFromApi(attribute: string) {
    return this.http.get<Dish[]>(this.urlAttribute + attribute + "/dishes")
      .pipe(catchError(this.handleError<any>('getDishesByAttributeFromApi')));
  }

  /**
 * Handles errors that occur during HTTP requests and provides error logging and user feedback.
 *
 * @param operation A description of the operation that resulted in the error.
 * @param result The default result to return in case of an error.
 * @return A function that takes an error and returns an Observable with the specified default result.
 */
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
