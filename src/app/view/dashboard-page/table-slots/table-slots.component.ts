import { Component } from '@angular/core';
import { SlotsDbService } from '../../../services/slots-db.service';
import { Slot } from '../../../models/slots-admin';

@Component({
  selector: 'app-table-slots',
  standalone: true,
  imports: [],
  templateUrl: './table-slots.component.html',
  styleUrl: './table-slots.component.css'
})
export class TableSlotsComponent {
  slots: Slot[] = [];
  selectedSlotId: number | undefined;
  newLimit: number | undefined;

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
