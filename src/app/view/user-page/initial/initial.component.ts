import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { DishesUserService } from '../../../services/dishes-user.service';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { DishAdmin } from '../../../models/dish-admin';
import { Router } from '@angular/router';


@Component({
  selector: 'app-initial',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    UpperCasePipe,
    CurrencyPipe,
  ],
  templateUrl: './initial.component.html',
  styleUrl: './initial.component.css',
})
export class InitialComponent {

  private router = inject(Router)

  listDishes: any[] = [];

  listDishesOrder: any[] = [];

  totalPrice = 0;

  serverDishes = inject(DishesUserService);

  ngOnInit(): void {

    //LOCAL DATA
    // this.serverDishes.getDishes().subscribe((dishes) => {
    //   this.listDishes = dishes;
    // });


    this.serverDishes.getDishesFromApi().subscribe((dishes: any) => {
      const { content } = dishes;
      this.listDishes = content;
    });
  }

  fliterForDesserts() {
    alert('falta implemtar el fitro por desserts');
  }
  fliterForSeconds() {
    alert('falta implemtar el fitro por seconds');
  }
  fliterForFirsts() {
    alert('falta implemtar el fitro porfirsts');
  }
  fliterForApptizer() {
    alert('falta implemtar el fitro porapptizer');
  }

  addTotlaPrice(price: number) {
    this.totalPrice += price;
  }

  addMenu(_t34: MatMenu) {

    this.addTotlaPrice(8.90)
    }

  addCard(dihs: DishAdmin) {
    this.addTotlaPrice(dihs.price )
    this.listDishesOrder.push(dihs);

  }

  cancelPedido() {
    this.listDishesOrder = [];
    this.totalPrice = 0;
  }

  aceptarOrden() {
    alert('falta implemtar el aceptar orden');
    this.router.navigate(['user/order']);

    }
}
