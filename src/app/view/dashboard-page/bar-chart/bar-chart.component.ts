import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto';
import { SlotsDbService } from '../../../services/slots-db.service';
import { Slot } from '../../../models/slots';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.css',
})
export class BarChartComponent {
  @ViewChild('slotChart') Chart: ElementRef | undefined;

  slotsDbService = inject(SlotsDbService);
  slots: Slot[] = [];

  timeArray: string[] = [];
  limitSlotArray: number[] = [];
  actualArray: number[] = [];

  ngOnInit(): void {
    this.loadSlots();

    const data = {
      labels: this.timeArray,

      datasets: [
        {
          label: 'Limit Slot',
          data: this.limitSlotArray,
          backgroundColor: '#d21ec346',
        },
        {
          label: 'Atual Slot',
          data: this.actualArray,
          backgroundColor: '#1ed22d4f',
        },
      ],
    };

    new Chart('slotChart', {
      type: 'bar' as ChartType,
      data: data,
      options: {
        plugins: {
          title: {
            display: true,
            text: ``,
          },
        },
        aspectRatio: 2.5,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  loadSlots(): void {
    this.slotsDbService.getSlots().subscribe({
      next: (data) => {
        this.slots = data;
        this.slots.forEach((slot: Slot) => {
          this.timeArray.push(slot.time);
          this.limitSlotArray.push(slot.limitSlot);
          this.actualArray.push(slot.actual);
        });
      },
    });
  }
}
