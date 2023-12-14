import { Component } from '@angular/core';
import { MenusDbService } from '../../../services/menus-db.service';
import { DishesDbService } from '../../../services/dishes-db.service';
import { DishAdmin } from '../../../models/dish-admin';
import { AsyncPipe,SlicePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { Menu } from '../../../models/menu-admin';
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
@Component({
  selector: 'app-table-menu',
  standalone: true,
  imports: [FormsModule,AsyncPipe,SlicePipe,MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,MatFormFieldModule,MatOptionModule],
  templateUrl: './table-menu.component.html',
  styleUrl: './table-menu.component.css'
})
export class TableMenuComponent {
  menus: Menu[] = [];
  newMenu: Menu = { id: 0, categoryAppetizer: 0, categoryFirst: 0, categorySecond: 0, categoryDessert: 0, visible: true };
  dishes: DishAdmin[] = [];
  dishNames: { [key: number]: string } = {};
  dishCategories: string[] = [];
  addingMenu: boolean = false;
  editingMenuId: number | null = null;
  editingMenu: Menu | null = null;
  dataSource: MatTableDataSource<Menu> = new MatTableDataSource<Menu>([]);
  displayedColumns: string[] = ['id', 'dishes', 'visible', 'actions'];

  currentPage: number = 1;
  itemsPerPage: number = 2;
  totalPages: number = 0;

  constructor(public menusService: MenusDbService, private dishesService: DishesDbService) {}

  ngOnInit() {
    this.loadMenus();
  }

  loadMenus(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = this.currentPage * this.itemsPerPage;
    this.menusService.getMenus().subscribe((menus) => {
      this.menus = menus.slice(startIndex, endIndex);
      this.loadDishNames();
      this.totalPages = Math.ceil(this.menusService.getTotalMenus() / this.itemsPerPage);
    });
    this.dishesService.getDishes().subscribe((dishes) => {
      this.dishes = dishes;
    });
  }

  nextPage(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = this.currentPage * this.itemsPerPage;
    if (startIndex < this.totalPages) {
      this.currentPage++;
      this.loadMenus();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadMenus();
    }
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
        this.editingMenu.categoryAppetizer = this.newMenu.categoryAppetizer;
        this.editingMenu.categoryFirst = this.newMenu.categoryFirst;
        this.editingMenu.categorySecond = this.newMenu.categorySecond;
        this.editingMenu.categoryDessert = this.newMenu.categoryDessert;
        this.menusService.updateMenu(this.editingMenu);
      } else {
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
      alert('Menú guardado exitosamente.');
      this.loadMenus();
    } else {
      alert('Por favor, complete todos los campos del formulario.');
    }
  }

  validateNewMenu(): boolean {
    return (
      this.newMenu.categoryAppetizer > 0 &&
      this.newMenu.categoryFirst > 0 &&
      this.newMenu.categorySecond > 0 &&
      this.newMenu.categoryDessert > 0
    );
  }

  resetNewMenu() {
    this.newMenu = { id: 0, categoryAppetizer: 0, categoryFirst: 0, categorySecond: 0, categoryDessert: 0, visible: true };
  }

  toggleVisibility(menu: Menu) {
    menu.visible = !menu.visible;
    this.menusService.updateMenu(menu);
  }

  onChange(event: any): void {
    this.itemsPerPage = event.pageSize;
    this.currentPage = 1;
    this.loadMenus();
    this.currentPage = event.pageIndex + 1;
    this.loadMenus();
  }


  //For search the name of menu:

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

  getDishName(dishId: number): string {
    return this.dishNames[dishId] || 'Nombre no encontrado';
  }

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
}
