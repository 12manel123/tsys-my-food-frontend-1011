import { Component } from '@angular/core';
import { MenusDbService } from '../../../services/menus-db.service';
import { DishesDbService } from '../../../services/dishes-db.service';
import { DishAdmin } from '../../../models/dish-admin';
import { AsyncPipe,SlicePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-table-menu',
  standalone: true,
  imports: [FormsModule,AsyncPipe,SlicePipe],
  templateUrl: './table-menu.component.html',
  styleUrl: './table-menu.component.css'
})
export class TableMenuComponent {
  menus: Menu[] = [];
  newMenu: Menu = { id: 0, categoryAppetizer: 0, categoryFirst: 0, categorySecond: 0, categoryDessert: 0, visible: true };
  dishes: DishAdmin[] = [];
  dishCategories: string[] = [];
  addingMenu: boolean = false;
  editingMenuId: number | null = null;
  editingMenu: Menu | null = null;
  dishNames: { [key: number]: string } = {};

  constructor(private menusService: MenusDbService, private dishesService: DishesDbService) {}

  loadDishNames() {
    for (const menu of this.menus) {
      this.getDishNameById(menu.categoryAppetizer).subscribe(name => {
        this.dishNames[menu.categoryAppetizer] = name;
      });

      this.getDishNameById(menu.categoryFirst).subscribe(name => {
        this.dishNames[menu.categoryFirst] = name;
      });

      this.getDishNameById(menu.categorySecond).subscribe(name => {
        this.dishNames[menu.categorySecond] = name;
      });

      this.getDishNameById(menu.categoryDessert).subscribe(name => {
        this.dishNames[menu.categoryDessert] = name;
      });
    }
  }

  getDishNameById(dishId: number): Observable<string> {
    return this.dishesService.getDishNameById(dishId);
  }


  getDishDetailsByIds(dishId: number): Observable<DishAdmin[]> {
    console.log(dishId);
    return this.dishesService.getDishById(dishId);
  }






  ngOnInit() {
    this.dishesService.getDishes().subscribe((dishes) => {
      this.dishes = dishes;
    });

    this.menusService.getMenus().subscribe((menus) => {
      this.menus = menus;
    });
    forkJoin([this.dishesService.getDishes(), this.menusService.getMenus()]).subscribe(
      ([dishes, menus]) => {
        this.dishes = dishes;
        this.menus = menus;
        this.loadDishNames();
      }
    );
  }

  editMenu(menu: Menu) {
    this.editingMenu = { ...menu };
    this.addingMenu = true;
  }

  deleteMenu(menuId: number) {
    this.menusService.deleteMenu(menuId);
  }

  addMenu() {
    this.addingMenu = true;
  }


  submitMenuForm() {
    if (this.validateNewMenu()) {
      if (this.editingMenu) {
        // Editar menú existente
        this.editingMenu.categoryAppetizer = this.newMenu.categoryAppetizer;
        this.editingMenu.categoryFirst = this.newMenu.categoryFirst;
        this.editingMenu.categorySecond = this.newMenu.categorySecond;
        this.editingMenu.categoryDessert = this.newMenu.categoryDessert;
        this.menusService.updateMenu(this.editingMenu);
      } else {
        // Agregar nuevo menú
        const newMenu: Menu = {
          id: 0,
          categoryAppetizer: this.newMenu.categoryAppetizer,
          categoryFirst: this.newMenu.categoryFirst,
          categorySecond: this.newMenu.categorySecond,
          categoryDessert: this.newMenu.categoryDessert,
          visible: true,
        };

        this.menusService.addMenu(newMenu);
      }
      this.resetNewMenu();
      this.addingMenu = false;
      this.editingMenu = null;
      console.log("Test");
      alert('Menú guardado exitosamente.');
      this.menusService.getMenus().subscribe((menus) => {
        this.menus = menus;
      });

    } else {
      alert('Por favor, complete todos los campos del formulario.');
    }
  }


  reloadPage() {
    location.reload();
  }


  private validateNewMenu(): boolean {
    return (
      this.newMenu.categoryAppetizer > 0 &&
      this.newMenu.categoryFirst > 0 &&
      this.newMenu.categorySecond > 0 &&
      this.newMenu.categoryDessert > 0
    );
  }

  private resetNewMenu() {
    this.newMenu = { id: 0, categoryAppetizer: 0, categoryFirst: 0, categorySecond: 0, categoryDessert: 0, visible: true };
  }


  toggleVisibility(menu: Menu) {
    menu.visible = !menu.visible;
    this.menusService.updateMenu(menu);
  }

  getMenuItemsDetails(itemIds: number[]): DishAdmin[] {
    return this.dishesService.getDishDetailsByIds(itemIds);
  }

  getDishesAppetizer(): Observable<DishAdmin[]> {
    return this.getDishesCategory("appetizer");
  }
  getDishesFirst(): Observable<DishAdmin[]> {
    return this.getDishesCategory("first");
  }
  getDishesSecond(): Observable<DishAdmin[]> {
    return this.getDishesCategory("second");
  }
  getDishesDessert(): Observable<DishAdmin[]> {
    return this.getDishesCategory("dessert");
  }
  getDishesCategory(categoryType: string): Observable<DishAdmin[]> {
    return this.dishesService.getDishes().pipe(
      map(dishes => dishes.filter(dish => dish.category === categoryType))
    );
  }

}

interface Menu {
  id: number;
  categoryAppetizer: number;
  categoryFirst: number;
  categorySecond: number;
  categoryDessert: number;
  visible: boolean;
}
