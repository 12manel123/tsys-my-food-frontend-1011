import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { TokenStorageService } from './token-storage.service';
import { environment } from '../../environments/environment';
import { Order } from '../models/orders-admin';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistorialUserService {

  private hhtp = inject(HttpClient);
  private servSession = inject(TokenStorageService);

  private readonly urlHistorial = '/api/v1/orders/';
  private readonly urlProd = environment.apiUrl;

  private readonly userID = this.servSession.getId();

  order: Order[] = []

  getHistorialByUserId(): Observable<Order[]> {
    return this.hhtp.get<Order[]>(this.urlProd + this.urlHistorial + this.userID);
  }
}
