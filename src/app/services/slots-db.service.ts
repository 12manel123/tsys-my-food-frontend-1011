import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Slot } from '../models/slots-admin';

@Injectable({
  providedIn: 'root'
})
export class SlotsDbService {
  private slots: Slot[] = [
    { id: 1, time: '12:00', limit_slot: 15, actual: 2 },
    { id: 2, time: '12:15', limit_slot: 15, actual: 2 },
    { id: 3, time: '12:30', limit_slot: 15, actual: 2 },
    { id: 4, time: '12:45', limit_slot: 15, actual: 2 },
    { id: 5, time: '13:00', limit_slot: 15, actual: 2 },
    { id: 6, time: '13:15', limit_slot: 15, actual: 2 },
    { id: 7, time: '13:30', limit_slot: 15, actual: 2 },
    { id: 8, time: '13:45', limit_slot: 15, actual: 2 },
    { id: 9, time: '14:00', limit_slot: 15, actual: 2 },
    { id: 10, time: '14:15', limit_slot: 15, actual: 2 },
    { id: 11, time: '14:30', limit_slot: 15, actual: 2 },
    { id: 12, time: '14:45', limit_slot: 15, actual: 2 }
  ];

  getSlots(): Observable<Slot[]> {
    return of(this.slots);
  }

  updateLimitSlot(slotId: number): Observable<void> {
    const index = this.slots.findIndex(slot => slot.id === slotId);

    if (index !== -1) {
      const newLimit = prompt('Ingrese el nuevo límite de slots:');
      
      if (newLimit !== null && !isNaN(Number(newLimit))) {
        this.slots[index].limit_slot = Number(newLimit);
      } else {
        alert('Límite de slots inválido. Por favor, ingrese un número válido.');
      }
    }

    return of();
  }

  constructor() { }
}
