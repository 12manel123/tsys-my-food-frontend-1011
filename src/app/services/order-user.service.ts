import { Injectable, inject, signal } from '@angular/core';
import { Order } from '../models/orders-admin';
import { Slot } from '../models/slots';
import { Observable } from 'rxjs';
import { Dish } from '../models/dihsh';
import { Menu } from '../models/menu';
import { environment } from '../../environments/environment';
import { TokenStorageService } from './token-storage.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderUserService {

  listDishesOrders: Dish[] = [];
  listMenusOrders: Menu[] = [];

  private slots: Slot[] = [];
  private orders: Order[] = [];

  idOrder = signal(0);
  totalPrice = signal(0);

  private servSession = inject(TokenStorageService);
  private http = inject(HttpClient);

  readonly userID = this.servSession.getId();

  private readonly urlProd = environment.apiUrl;

  // Setp 1: Create order
  private postCreateOrder = this.urlProd + `/api/v1/order/${this.userID}`;

  // Step 2: Add dishes to reference order
  private postReferencesDishes = this.urlProd + '/api/v1/list-order/';
  private postReferencesMenus = this.urlProd + `/api/v1/list-order/`;

  // Step 3: Get the available Slots
  private getSlots = this.urlProd + `/api/v1/slots/available`;

  // Step 4: Add slots to reference order
  private putSlots = this.urlProd + `/api/v1/order/finish/`;

  /**
  * Performs an HTTP POST request to create an order in the API.
  *
 * @return An Observable that emits an object of type Order when the request is completed.
  */
  postCreateOrderApi(): Observable<Order> {
    return this.http.post<Order>(this.postCreateOrder, this.orders);
  }

  /**
  * Performs an HTTP POST request to send dish references to the API.
  *
  * @return An Observable that emits an object of type Dish when the request is completed.
  */
  postReferencesDishesApi  (idOrder : number , idDish : number): Observable<Dish> {
    return this.http.post<Dish>(this.postReferencesDishes +idOrder + '/' + idDish+'?itemType=dish'  , this.listDishesOrders);
  }

  /**
  * Performs an HTTP POST request to send menu references to the API.
  *
  * @return An Observable that emits an object of type Menu when the request is completed.
  */
  postReferencesMenusApi(idMenu: number , idDish : number): Observable<Menu> {
    return this.http.post<Menu>(this.postReferencesMenus + idMenu+ '/' + idDish+'?itemType=menu'  , this.listMenusOrders);
  }

  /**
  * Performs an HTTP PUT request to update slots in the API.
  *
  * @return An Observable that emits an object of type Slot when the request is completed.
  */
  putSlotsApiPrice(idOrder : number , idSlot : number,price:number): Observable<Slot> {
    return this.http.put<Slot>(this.putSlots+idOrder+'/'+idSlot+'/'+price, this.slots);
  }

  /**
  * Obtiene las franjas horarias desde la API.
  * @returns Un observable que emite un array de objetos Slot.
  */
  getSlotsApi(): Observable<Slot[]> {
    return this.http.get<Slot[]>(this.getSlots);
  }


}
