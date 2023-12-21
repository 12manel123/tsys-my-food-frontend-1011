import { Component, OnInit, inject } from '@angular/core';
import { HistorialUserService } from '../../../services/historial-user.service';
import { CurrencyPipe, DatePipe } from '@angular/common';


@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [DatePipe , CurrencyPipe,],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.css'
})
export class HistorialComponent implements OnInit {
sortData($event: Event) {
throw new Error('Method not implemented.');
}

  historialServ = inject(HistorialUserService);
  historial : any[] = [];

  ngOnInit(): void {

    this.historialServ.getHistorialByUserId().subscribe(
      (data : any) => {
        const {content} = data;
        this.historial = content;
      }
    );
  }


}
