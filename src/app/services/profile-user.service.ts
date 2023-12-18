import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { TokenStorageService } from './token-storage.service';
import { UserDTO } from '../models/user';



@Injectable({
  providedIn: 'root'
})
export class ProfileUserService {

  http = inject(HttpClient);
  servSession = inject(TokenStorageService);

  private urlGetUserByID = '/api/v1/user/';
  private urlProd = environment.apiUrl



  getUserByID(id: string) {
    return this.http.get(this.urlProd + this.urlGetUserByID + id);
  }

  updateUserByID(id: string, user: any) {

    return this.http.put(this.urlProd + this.urlGetUserByID + id, user);
  }


}
