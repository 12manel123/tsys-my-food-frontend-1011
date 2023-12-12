import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, catchError, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserReg } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private readonly urlProd = environment.apiUrl;
  private urlpost = `${this.urlProd}/auth/register`;

  http = inject(HttpClient);

  constructor() { }

  addNewUser(user : UserReg ): Observable<any>{
   return this.http.post(this.urlpost,user).pipe(catchError(this.handleError<any>('addNewUser')));
  }

  private handleError<T>(operation = 'opearation',result?:T){
    return (error:any):Observable<T>=>{
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }




}
