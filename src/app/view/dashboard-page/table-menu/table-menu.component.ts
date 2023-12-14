import { Component } from '@angular/core';
import { MenusDbService } from '../../../services/menus-db.service';
import { DishesDbService } from '../../../services/dishes-db.service';
import { DishAdmin } from '../../../models/dish-admin';
import { AsyncPipe,SlicePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, catchError, forkJoin, map, of } from 'rxjs';
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
import { JsonPipe } from '@angular/common';
@Component({
  selector: 'app-table-menu',
  standalone: true,
  imports: [JsonPipe,FormsModule,AsyncPipe,SlicePipe,MatCardModule,
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
  newMenuIds: {
    categoryAppetizer: number | null,
    categoryFirst: number | null,
    categorySecond: number | null,
    categoryDessert: number | null
  } = {
    categoryAppetizer: null,
    categoryFirst: null,
    categorySecond: null,
    categoryDessert: null
  };
  
  newMenu: {
    categoryAppetizer: DishAdmin | null,
    categoryFirst: DishAdmin | null,
    categorySecond: DishAdmin | null,
    categoryDessert: DishAdmin | null
  } = {
    categoryAppetizer: null,
    categoryFirst: null,
    categorySecond: null,
    categoryDessert: null
  };

  appetizers$: Observable<DishAdmin[]> = this.getDishesCategory('appetizer');
  firstDishes$: Observable<DishAdmin[]> = this.getDishesCategory('first');
  secondDishes$: Observable<DishAdmin[]> = this.getDishesCategory('second');
  dessertDishes$: Observable<DishAdmin[]> = this.getDishesCategory('dessert');
  
  appetizertest: any={};

  dishes: DishAdmin[] = [];
  dishCategories: string[] = [];
  addingMenu: boolean = false;
  editingMenuId: number | null = null;
  editingMenu: Menu | null = null;
  dataSource: MatTableDataSource<Menu> = new MatTableDataSource<Menu>([]);
  displayedColumns: string[] = ['id', 'dishes', 'visible', 'actions'];

  firstDishes: number[] = [];
  secondDishes: number[] = [];
  appetizerDishes: number[] = [];
  dessertDishes: number[] = [];

  currentPage: number = 1;
  itemsPerPage: number = 5;
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

  }

  addMenu() {
    
    const appetizer$ = this.getDishById(this.newMenuIds.categoryAppetizer)
    console.log(appetizer$)
    alert (appetizer$)
    const first$ = this.getDishById(this.newMenuIds.categoryFirst);
    const second$ = this.getDishById(this.newMenuIds.categorySecond);
    const dessert$ = this.getDishById(this.newMenuIds.categoryDessert);

    forkJoin([appetizer$, first$, second$, dessert$]).subscribe(
      ([appetizer, first, second, dessert]) => {
        console.log(appetizer);
        if (appetizer && first && second && dessert) {
          const newMenu: Menu = {
            id: 0,
            categoryAppetizer: appetizer,
            categoryFirst: first,
            categorySecond: second,
            categoryDessert: dessert,
            visible: true
          };

          this.menusService.addMenu(newMenu);

          this.newMenuIds = {
            categoryAppetizer: null,
            categoryFirst: null,
            categorySecond: null,
            categoryDessert: null
          };

          this.loadMenus();
        } else {
          console.error('No se pudieron obtener todos los platos seleccionados.');
        }
      }
    );
  }

  

  private getDishById(dishId: number | null): Observable<DishAdmin | null> {
    if (dishId === null) {
      return of(null);
    }
    return this.dishesService.getDishById(dishId).pipe(
      catchError(() => of(null))
    );
  }
  
  
  

  deleteMenu(menuId: number) {
    this.menusService.deleteMenu(menuId);
  }

  getDishesCategory(categoryType: string): Observable<DishAdmin[]> {
    return this.dishesService.getDishes().pipe(
      map(dishes => dishes.filter(dish => dish.category === categoryType))
    );
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

}