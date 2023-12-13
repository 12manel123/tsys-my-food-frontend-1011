import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { DishAdmin } from '../../../models/dish-admin';
import { DishesUserService } from '../../../services/dishes-user.service';
import { UpperCasePipe } from '@angular/common';

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
  ],
  templateUrl: './initial.component.html',
  styleUrl: './initial.component.css',
})
export class InitialComponent {
  listDishes: DishAdmin[] = [];

  serverDishes = inject(DishesUserService);

  ngOnInit(): void {
    this.serverDishes.getDishes().subscribe((dishes) => {
      this.listDishes = dishes;
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
}
