import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User, UserReg } from '../models/user';
import { Observable, catchError, of } from 'rxjs';
import Swal from 'sweetalert2'


@Injectable({
  providedIn: 'root'
})

export class AuthService {


  // Routes to the API endpoints
  private readonly urlProd = environment.apiUrl;
  private urlRegister = `${this.urlProd}/auth/register`;
  private urlLogin = `${this.urlProd}/auth/login`;

  // Injects the HttpClient service
  http = inject(HttpClient);


  /**
  * Registers a user by making a POST request to the registration endpoint.
  *
  * @param user The user information to be registered.
  * @return An Observable containing the response from the registration API call.
  */
  register(user : UserReg ): Observable<any>{
    return this.http.post(this.urlRegister, user, { headers: { 'Content-Type': 'application/json' } })
    .pipe(catchError(this.handleError<any>('login')));

  }

  /**
  * Logs in a user by making a POST request to the login endpoint.
  *
  * @param user The user credentials for logging in.
  * @return An Observable containing the response from the login API call.
  */
  login(user : User ): Observable<any>{
    return this.http.post(this.urlLogin, user, { headers: { 'Content-Type': 'application/json' } })
      .pipe(catchError(this.handleError<any>('login')));
   }


  /**
  * Handles errors that occur during HTTP requests and provides error logging and user feedback.
  *
  * @param <T> The type of result to return in case of an error.
  * @param operation A description of the operation that resulted in the error.
  * @param result The default result to return in case of an error.
 * @return A function that takes an error and returns an Observable with the specified default result.
  */
  private handleError<T>(operation = 'opearation',result?:T){
    return (error: any): Observable<T > => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...😕',
        text: error.error.message,
      })
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }

}
