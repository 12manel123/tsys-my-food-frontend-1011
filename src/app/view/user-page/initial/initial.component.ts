import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { DishesUserService } from '../../../services/dishes-user.service';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { DishAdmin } from '../../../models/dish-admin';
import { Router } from '@angular/router';
import { MenuUser } from '../../../models/menu-admin';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


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
    MatSidenavModule,
    MatButtonToggleModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './initial.component.html',
  styleUrl: './initial.component.css',
})
export class InitialComponent {


  private serverDishes = inject(DishesUserService);
  private router = inject(Router);

  listDishes: any[] = [];
  menus: MenuUser | null = {} as MenuUser;
  listDishesOrder: any[] = [];
  totalPrice = 0;

  showFiller = false;

  ngOnInit(): void {

    this.serverDishes.getMenusFromApi().subscribe((dishes: any) => {
      if (dishes.length > 0) {
        this.menus = dishes[0];
       // this.menus = null;
      } else {
        this.menus = null;
      }
    });


    this.serverDishes.getDishesFromApi().subscribe((dishes: any) => {
      const { content } = dishes;
      this.listDishes = content;
    });
  }

  fliterForAtrttibute(attribute: string) {
    this.serverDishes.getDishesByAttributeFromApi(attribute).subscribe((dishes: any) => {
      const { content } = dishes;
      this.listDishes = content;
    });
  }

  fliterForDesserts() {
    this.serverDishes.getDishesByCategoryFromApi('DESSERT').subscribe((dishes: any) => {
      const { content } = dishes;
      this.listDishes = content;
     });
  }
  fliterForSeconds() {
    this.serverDishes.getDishesByCategoryFromApi('SECOND').subscribe((dishes: any) => {
      const { content } = dishes;
      this.listDishes = content;
     });
  }
  fliterForFirsts() {
    this.serverDishes.getDishesByCategoryFromApi('FIRST').subscribe((dishes: any) => {
      const { content } = dishes;
      this.listDishes = content;
     });
  }
  fliterForApptizer() {
    this.serverDishes.getDishesByCategoryFromApi('APPETIZER').subscribe((dishes: any) => {
      const { content } = dishes;
      console.log(content);
      this.listDishes = content;
     });
  }

  addTotlaPrice(price: number) {
    this.totalPrice += price;
  }

  addMenu(menus: MenuUser) {
    console.log(menus);
    if (menus) {
      menus.appetizer.price = 0;
      menus.first.price = 0;
      menus.second.price = 0;
      menus.dessert.price = 0;
       this.listDishesOrder.push(menus.appetizer);
       this.listDishesOrder.push(menus.first);
       this.listDishesOrder.push(menus.second);
       this.listDishesOrder.push(menus.dessert);
      this.addTotlaPrice(8.90)
    }

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
    this.router.navigate(['user/order']);

  }


  removeCard(index: number) {
    const { price } = this.listDishesOrder[index];
    this.totalPrice -= price;
    this.listDishesOrder.splice(index, 1);

    if (this.listDishesOrder.length === 0) {
      this.totalPrice = 0;
    }
    if (this.listDishesOrder.length === 1) {
      this.totalPrice = this.listDishesOrder[0].price;
    }
  }

  allDishes() {
    this.serverDishes.getDishesFromApi().subscribe((dishes: any) => {
      const { content } = dishes;
      this.listDishes = content;
     });
    }

}
