import { Component, OnDestroy, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { DishesUserService } from '../../../services/dishes-user.service';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Menu } from '../../../models/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { Dish } from '../../../models/dihsh';
import { OrderUserService } from '../../../services/order-user.service';
import { Slot } from '../../../models/slots-admin';
import Swal from 'sweetalert2'

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
    MatProgressSpinnerModule,

  ],
  templateUrl: './initial.component.html',
  styleUrl: './initial.component.css',
})

export class InitialComponent implements OnDestroy {


  private servDishes = inject(DishesUserService);
  private router = inject(Router);
  private servOrder = inject(OrderUserService);

  protected listDishes: Dish[] = [];
  protected menus: Menu | null = {} as Menu;
  protected listDishesShow: Dish[] = [];
  protected totalPrice = 0;
  protected slots: Slot[] = [];

  ngOnInit(): void {

    this.getMenus();

    this.allDishes();

  }

  ngOnDestroy(): void {
    this.servOrder.totalPrice.set(this.totalPrice);
  }


  fliterForAtrttibute(attribute: string) {
    this.servDishes.getDishesByAttributeFromApi(attribute).subscribe((dishes: any) => {
      const { content } = dishes;
      this.listDishes = content;
    });
  }

  fliterForDesserts() {
    this.servDishes.getDishesByCategoryFromApi('DESSERT').subscribe((dishes: any) => {
      const { content } = dishes;
      this.listDishes = content;
    });
  }
  fliterForSeconds() {
    this.servDishes.getDishesByCategoryFromApi('SECOND').subscribe((dishes: any) => {
      const { content } = dishes;
      this.listDishes = content;
    });
  }
  fliterForFirsts() {
    this.servDishes.getDishesByCategoryFromApi('FIRST').subscribe((dishes: any) => {
      const { content } = dishes;
      this.listDishes = content;
    });
  }
  fliterForApptizer() {
    this.servDishes.getDishesByCategoryFromApi('APPETIZER').subscribe((dishes: any) => {
      const { content } = dishes;
      this.listDishes = content;
    });
  }

  addTotlaPrice(price: number) {
    this.totalPrice += price;
  }


  addMenu(menus: Menu) {
    if (menus) {
      this.listDishesShow.push(menus.appetizer)
      this.listDishesShow.push(menus.first);
      this.listDishesShow.push(menus.second);
      this.listDishesShow.push(menus.dessert);
      const totalPriceMenu = menus.appetizer.price + menus.first.price + menus.second.price + menus.dessert.price;
      const totalPriceWithDiscount = totalPriceMenu * 0.9;
      this.addTotlaPrice(totalPriceWithDiscount)
      this.servOrder.listMenusOrders.push(menus);
    }
  }

  addCard(dihs: Dish) {
    this.addTotlaPrice(dihs.price)
    this.listDishesShow.push(dihs);
    this.servOrder.listDishesOrders.push(dihs);
  }

  cancelPedido() {
    this.listDishesShow = [];
    this.totalPrice = 0;
  }

  aceptarOrden() {

    if (this.listDishesShow.length === 0) {
      Swal.fire('Your shopping list is empty, treat yourself and try our desserts! 😋')
      return;
    }

    this.servOrder.postCreateOrderApi().subscribe((order: any) => {
      const { id } = order;
      this.servOrder.idOrder.set(id)

      this.servOrder.listDishesOrders.forEach((dish: any) => {
        this.servOrder.postReferencesDishesApi(id, dish.id).subscribe({
          next: data => {
          
          },
          error: error => {
            console.error('There was an error!', error);
          }
        });
      });

      this.servOrder.listMenusOrders.forEach((menu: any) => {
        this.servOrder.postReferencesMenusApi(id, menu.id).subscribe({
          next: data => {
            console.log(data);
          },
          error: error => {
            console.error('There was an error!', error);
          }
        });
      });

    });

    this.router.navigate(['user/order']);
  }


  removeCard(index: number) {
    const { price } = this.listDishesShow[index];
    this.totalPrice -= price;
    this.listDishesShow.splice(index, 1);

    if (this.listDishesShow.length === 0) {
      this.totalPrice = 0;
    }
    if (this.listDishesShow.length === 1) {
      this.totalPrice = this.listDishesShow[0].price;
    }
  }

  allDishes() {
    this.servDishes.getDishesFromApi().subscribe((dishes: any) => {
      const { content } = dishes;
      this.listDishes = content;
    });
    }

    getMenus() {
      this.servDishes.getMenusFromApi().subscribe(
        (dishes: any) => {
          this.menus = dishes[0];
        },
        (error: any) => {
          console.error("Error al obtener menús:", error);
          this.menus = null;
        }
      );
    }


}