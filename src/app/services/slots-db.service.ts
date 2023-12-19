import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Slot } from '../models/slots-admin';
import { inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
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

  // updateLimitSlot(slotId: number,slot: Slot): Observable<any> {
  //   console.log(slot);
  //   console.log(slotId);

  //   const newLimit = prompt('Ingrese el nuevo límite de slots:');
  //   if (newLimit !== null) {
  //     const newLimitNumber = parseInt(newLimit);
  //     if (!isNaN(newLimitNumber)) {
  //       slot.limitSlot = newLimitNumber;
  //       console.log(slot);
  //       return this.http.put(this.url2 + "/" + slotId, slot, { headers: { 'Content-Type': 'application/json' } });
  //     } else {
  //       alert('Límite de slots inválido. Por favor, ingrese un número válido.');
  //     }
  //   } else {
  //     console.log('Operación cancelada por el usuario.');
  //   }
  //   return of();
  // }

  updateLimitSlot(slotId: number, slot: Slot): Observable<any> {
    return new Observable((observer) => {
      Swal.fire({
        title: "Enter the new limit of slots",
        input: "text",
        inputValue: slot.limitSlot.toString(),
        inputValidator: (value) => {
          if (!value) {
            return "You need to write something!";
          }
  
          const newLimitNumber = parseInt(value);
          if (isNaN(newLimitNumber)) {
            return "Invalid slot limit. Please enter a valid number.";
          }
          return null; // Añade esta línea para corregir el error
        },
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          const newLimitNumber = parseInt(result.value);
          if (!isNaN(newLimitNumber)) {
            slot.limitSlot = newLimitNumber;
            this.http.put(this.url2 + "/" + slotId, slot, { headers: { 'Content-Type': 'application/json' } })
              .subscribe(
                () => {
                  observer.next();
                  observer.complete();
                },
                (error) => observer.error(error)
              );
          } else {
            alert('Invalid slot limit. Please enter a valid number.');
            observer.complete();
          }
        } else {
          console.log('Operation canceled by the user.');
          observer.complete();
        }
      });
    });
  }

  constructor() { }
}


