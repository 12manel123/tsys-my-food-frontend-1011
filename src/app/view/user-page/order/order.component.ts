import { Component,OnInit, inject } from '@angular/core';
import { OrderUserService } from '../../../services/order-user.service';
import { Slot } from '../../../models/slots-admin';
import {FormsModule} from '@angular/forms';
import { LogoComponent } from '../../../shared/logo/logo.component';
import { MatButtonModule } from '@angular/material/button';
import Swal from 'sweetalert2'
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { TokenStorageService } from '../../../services/token-storage.service';


@Component({
  selector: 'app-order',
  standalone: true,
  imports: [LogoComponent, MatButtonModule, FormsModule,  CurrencyPipe, ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {

  private servOrder = inject(OrderUserService);
  private routes = inject(Router);
  private servSession = inject(TokenStorageService);

  selectedSlotId: number = 0;
  slotAvaible: Slot[] = [];
  idUser = this.servOrder.userID;
  totalPrice = 0;

  ngOnInit() {
    this.getSlotAvaible();
    this.totalPrice = this.servOrder.totalPrice();
  }

  getSlotAvaible() {
    this.servOrder.getSlotsApi().subscribe((slots: Slot[]) => {
      this.slotAvaible = slots;
    });
  }

  prossesOrder(price: number) {
    this.servOrder.putSlotsApiPrice(this.servOrder.idOrder(),  this.selectedSlotId,price*2).subscribe((res: any) => {
      if (res) {

        Swal.fire(
          'Enjoy your food! 🍜',
          `<b> Order number ${res.id} </b> <br><br>
          Slot: ${res.slot.time}`,
          'success'
        )
        this.routes.navigate(['/user/historial']);

      }
      else {
        console.log('Slot not added');
      }
    });
  }
}
