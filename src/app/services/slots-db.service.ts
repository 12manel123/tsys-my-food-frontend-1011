import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Slot } from '../models/slots-admin';
import { inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SlotsDbService {

  private url = environment.apiUrl + '/api/v1/slots';
  private url2 = environment.apiUrl + '/api/v1/slot';

  private http = inject(HttpClient)

  private slotsApi: Slot[] = []

  private slotSubject = new BehaviorSubject<Slot[]>(this.slotsApi);
  
  getSlots(): Observable<Slot[]> {
    return this.http.get<any[]>(this.url);
  }

  updateLimitSlot(slotId: number,slot: Slot): Observable<any> {
    console.log(slot);
    console.log(slotId);

    const newLimit = prompt('Ingrese el nuevo límite de slots:');
    if (newLimit !== null) {
      const newLimitNumber = parseInt(newLimit);
      if (!isNaN(newLimitNumber)) {
        slot.limitSlot = newLimitNumber;
        console.log(slot);
        return this.http.put(this.url2 + "/" + slotId, slot, { headers: { 'Content-Type': 'application/json' } });
      } else {
        alert('Límite de slots inválido. Por favor, ingrese un número válido.');
      }
    } else {
      console.log('Operación cancelada por el usuario.');
    }
    return of();
  }

  constructor() { }
}
