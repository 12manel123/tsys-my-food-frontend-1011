import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, throwError } from 'rxjs';
import Swal from 'sweetalert2'
import { routes } from '../app.routes';
import { Router } from '@angular/router';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class DishesUserService {

  private routes = inject(Router);

  private urlDishes = environment.apiUrl + '/api/v1/dishes/visible';
  private urlMenus = environment.apiUrl + '/api/v1/allVisibleMenus';
  private urlCatagory = environment.apiUrl + '/api/v1/dishes/visibleByCategory/';
  private urlAttribute = environment.apiUrl + '/api/v1/atribut/visible/';

  private http = inject(HttpClient)
  private servToker = inject(TokenStorageService)

  getDishesFromApi() {
    return this.http.get<[]>(this.urlDishes);
  }

  getMenusFromApi() {
    return this.http.get<any[]>(this.urlMenus, { headers: { 'Content-Type': 'application/json' } }).pipe(
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

  getDishesByCategoryFromApi(category: string) {
    return this.http.get<[]>(this.urlCatagory + category);
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
