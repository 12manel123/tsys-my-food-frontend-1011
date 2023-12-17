import { Component,OnInit, inject } from '@angular/core';
import { OrderUserService } from '../../../services/order-user.service';
import { Slot } from '../../../models/slots-admin';
import {FormsModule} from '@angular/forms';
import { LogoComponent } from '../../../shared/logo/logo.component';
import { MatButtonModule } from '@angular/material/button';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [LogoComponent, MatButtonModule, FormsModule ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {

  private servOrder = inject(OrderUserService);

  selectedSlotId: number = 0;
  slotAvaible: Slot[] = [];
  idUser = this.servOrder.userID;

  ngOnInit() {
    this.getSlotAvaible();

  }

  getSlotAvaible() {
    this.servOrder.getSlotsApi().subscribe((slots: Slot[]) => {
      this.slotAvaible = slots;
    });
  }

  prossesOrder() {

    console.log(this.selectedSlotId);
    console.log(this.servOrder.idOrder());
    this.servOrder.putSlotsApi(this.servOrder.idOrder(),  this.selectedSlotId).subscribe((res: any) => {
      if (res) {

        Swal.fire(
          'Enjoy your food! 🍜',
          `<b> Order number ${res.slot.id} </b> <br><br>
           Slot: ${res.slot.time}`,
          'success'
        )
        console.log('Slot added' ,res);
      }
      else {
        console.log('Slot not added');
      }

    });

  }
}
