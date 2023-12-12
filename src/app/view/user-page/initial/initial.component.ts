import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import { DishAdmin } from '../../../models/dish-admin';
import { DishesUserService } from '../../../services/dishes-user.service';



@Component({
  selector: 'app-initial',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
  ],
  templateUrl: './initial.component.html',
  styleUrl: './initial.component.css',
})
export class InitialComponent {

  listDishes: DishAdmin[] = [];

  longText = `Lorem fistrum ese que llega no te digo trigo por no llamarte Rodrigor llevame al sircoo se calle ustée. Amatomaa jarl va usté muy cargadoo qué dise usteer a gramenawer no te digo trigo por no llamarte Rodrigor.`;

  serverDishes = inject(DishesUserService);

  ngOnInit(): void {
    this.serverDishes.getDishes().subscribe((dishes) => {
      this.listDishes = dishes;
    });
  }
 // 
}
