import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  private readonly urlProd = environment.apiUrl;
  private urlpost = `${this.urlProd}/auth/login`;

  http = inject(HttpClient);

  constructor() { }

  loginUser(user : User ): Observable<any>{
   return this.http.post(this.urlpost,user).pipe(catchError(this.handleError<any>('loginUser')));
  }

  private handleError<T>(operation = 'opearation',result?:T){
    return (error:any):Observable<T>=>{
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }

}
