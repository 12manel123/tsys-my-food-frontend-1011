import { Component } from '@angular/core';
import { SlotsDbService } from '../../../services/slots-db.service';
import { Slot } from '../../../models/slots-admin';
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-table-slots',
  standalone: true,
  imports: [MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule],
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

  editLimitSlot(slotId: number): void {
    this.slotsDbService.updateLimitSlot(slotId).subscribe(() => {
      this.loadSlots();
      this.selectedSlotId = slotId;
    });
  }
}
