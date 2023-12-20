import { Component, OnDestroy, inject } from '@angular/core';
import Chart from 'chart.js/auto';
import { SlotsDbService } from '../../../services/slots-db.service';
import { Slot } from '../../../models/slots';


@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.css'
})
export class BarChartComponent implements OnDestroy{
  ngOnDestroy(): void {
    this.chart.destroy();
  }

  slotsDbService = inject(SlotsDbService);
  slots: any[] = [];

  timeArray: string[] = [];
  limitSlotArray: number[] = [];
  actualArray: number[] = [];

  data = {
    labels: this.timeArray,
    datasets: [
      {
        label: "Limit Slot",
        data: this.limitSlotArray,
        backgroundColor: '#d21ec346'
      },
      {
        label: "Atual Slot",
        data: this.actualArray,
        backgroundColor: '#1ed22d4f'
      }
    ]
  }

  ngOnInit(): void {

  this.loadSlots();
  this.createChart();

  }

  public chart: any ;

  createChart() {

    this.chart = new Chart("Chart", {
      type: 'bar',
      data: this.data
    ,
      options: {
        plugins: {
          title: {
              display: true,
              text: 'Ctrl +'
          }
      },
        aspectRatio: 2.5,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }

    });
  }

  loadSlots(): void {
    this.slotsDbService.getSlots().subscribe(slots => {
      this.slots = slots;
      this.slots.forEach((slot: Slot) => {
        this.timeArray.push(slot.time);
        this.limitSlotArray.push(slot.limitSlot);
        this.actualArray.push(slot.actual);
      });
    });
  }
}
