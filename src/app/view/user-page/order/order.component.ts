import { Component,OnInit } from '@angular/core';
import { OrderUserService } from '../../../services/order-user.service';
import { Order } from '../../../models/orders-admin';
import { Slot } from '../../../models/slots-admin';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
@Component({
  selector: 'app-order',
  standalone: true,
  imports: [FormsModule,CurrencyPipe],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit{
  order: Order | undefined;
  availableSlots: Slot[] = []; 
  selectedSlotId: number=0;
  constructor(
    private orderUserService: OrderUserService,
    private router: Router
  ) {}

  ngOnInit() {
    const orderId = 1;
    this.orderUserService.getOrderById(orderId).subscribe((order: Order | undefined) => {
      this.order = order;
    });

    this.orderUserService.getAvailableSlots().subscribe((slots: Slot[]) => {
      this.availableSlots = slots;
    });
  }

  onEditOrder() {
    if (this.order && this.selectedSlotId !== undefined) {
      const selectedSlotIdNumber = Number(this.selectedSlotId);
      const selectedSlot = this.availableSlots.find(slot => slot.id === selectedSlotIdNumber);
      if (selectedSlot) {
        const confirmationMessage = `¿Confirmar la orden para las ${selectedSlot.time}?\nPrecio total: `+ this.calculateTotalPrice()+`€`+`\nPlatos pedidos: ${this.order.dishes.map(dish => dish.name).join(', ')}`;
        const isConfirmed = confirm(confirmationMessage);
        if(isConfirmed){
          this.order.slot = selectedSlot;
          const alertMessage = `¡Orden reservada para las ${selectedSlot.time}!\nPrecio total: `+ this.calculateTotalPrice()+`€`+`\nPlatos pedidos: ${this.order.dishes.map(dish => dish.name).join(', ')}`;
          alert(alertMessage);
          this.router.navigate(['/user/initial']);
        }
        else{
          alert("Te has acojonao");
        }
      } else {
        console.error('No se encontró el slot con ID:', selectedSlotIdNumber);
      }
    }
  }

  calculateTotalPrice(): string {
    if (this.order) {
      const totalPrice = this.order.dishes.reduce((total, dish) => total + dish.price, 0);
      return totalPrice.toFixed(2);
    }
    return '0.00';
  }
  
  
}
