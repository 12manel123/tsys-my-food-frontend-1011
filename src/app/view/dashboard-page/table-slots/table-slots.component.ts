import { Component } from '@angular/core';
import { SlotsDbService } from '../../../services/slots-db.service';
import { Slot } from '../../../models/slots-admin';
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgClass } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table-slots',
  standalone: true,
  imports: [MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    NgClass],
  templateUrl: './table-slots.component.html',
  styleUrl: './table-slots.component.css'
})
export class TableSlotsComponent {
  slots: Slot[] = [];
  selectedSlotId: number | undefined;
  newLimit: number | undefined;
  displayedColumns: string[] = ['id', 'time', 'limit_slot', 'actual'];

  constructor(private slotsDbService: SlotsDbService) {}

  ngOnInit(): void {
    this.loadSlots();
  }

  loadSlots(): void {
    this.slotsDbService.getSlots().subscribe(slots => {
      this.slots = slots;
    });
  }

  editLimitSlot(slotId: number, slot: Slot): void {
    this.slotsDbService.updateLimitSlot(slotId, slot).subscribe(() => {
      this.loadSlots();
      this.selectedSlotId = slotId;

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Slot limit updated successfully',
        showConfirmButton: false,
        timer: 1000
      });
    });
  }

  isEven(row: any): boolean {
    return this.slots.indexOf(row) % 2 === 0;
  }

}
