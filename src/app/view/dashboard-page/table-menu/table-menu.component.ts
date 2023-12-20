import { Component } from '@angular/core';
import { MenusDbService } from '../../../services/menus-db.service';
import { DishesDbService } from '../../../services/dishes-db.service';
import { DishAdmin } from '../../../models/dish-admin';
import { AsyncPipe,SlicePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Menu, MenuUser, MenuUserNew } from '../../../models/menu-admin';
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { JsonPipe } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table-menu',
  standalone: true,
  imports: [FormsModule,AsyncPipe,SlicePipe,MatCardModule,
    MatIconModule,JsonPipe,
    MatButtonModule,
    MatToolbarModule,
    MatDialogModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,MatFormFieldModule,MatOptionModule],
  templateUrl: './table-menu.component.html',
  styleUrl: './table-menu.component.css'
})
export class TableMenuComponent {

  menus: Menu[] = [];
  menusApi: MenuUser[] = [];
  dishesAppetizer: DishAdmin[] = [];
  dishesFirst: DishAdmin[] = [];
  dishesSecond: DishAdmin[] = [];
  dishesDessert: DishAdmin[] = [];
  newMenuApi:MenuUserNew={
    appetizer:{ id:0, name:'', description:'', image:'', price: 0, category:'', visible: true},
    first:{ id:0, name:'', description:'', image:'', price: 0, category:'', visible: true},
    second:{ id:0, name:'', description:'', image:'', price: 0, category:'', visible: true},
    dessert:{ id:0, name:'', description:'', image:'', price: 0, category:'', visible: true},
    visible:true
  }
  newMenu: Menu = { id: 0, categoryAppetizer: 0, categoryFirst: 0, categorySecond: 0, categoryDessert: 0, visible: true };
  dishes: DishAdmin[] = [];
  dishNames: { [key: number]: string } = {};
  dishCategories: string[] = [];
  addingMenu: boolean = false;
  editingMenuId: number | null = null;
  editingMenu: Menu | null = null;

  displayedColumns: string[] = ['id','appetizer','first','second','dessert','visible', 'actions'];
  currentPage: number = 1;
  itemsPerPage: number = 2;
  totalPages: number = 0;
  dataSource: MatTableDataSource<MenuUser> = new MatTableDataSource<MenuUser>([]);
  public selectedPageSize: number = 10;
  totalEntities: number = 0;
  dataSourceDish: MatTableDataSource<DishAdmin> = new MatTableDataSource<DishAdmin>([]);

  constructor(public menusService: MenusDbService, private dishesService: DishesDbService) {}

  ngOnInit() {
    this.loadMenus();
    this.loadMenusApi();
    this.loadDishesCategoryApi();
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

  loadDishesCategoryApi(): void {
    this.dishesService.getDishesCategoryFromApi("APPETIZER",0,100).subscribe((dishes:any) => {
      const {content}=dishes;
      this.dishesAppetizer = content;
      this.dataSourceDish.data = this.dishes;
    });
    this.dishesService.getDishesCategoryFromApi("FIRST",0,100).subscribe((dishes:any) => {
      const {content}=dishes;
      this.dishesFirst = content;
      this.dataSourceDish.data = this.dishes;
    });
    this.dishesService.getDishesCategoryFromApi("SECOND",0,100).subscribe((dishes:any) => {
      const {content}=dishes;
      this.dishesSecond = content;
      this.dataSourceDish.data = this.dishes;
    });
    this.dishesService.getDishesCategoryFromApi("DESSERT",0,100).subscribe((dishes:any) => {
      const {content}=dishes;
      this.dishesDessert = content;
      this.dataSourceDish.data = this.dishes;
    });
  }

  loadMenusApi(): void {
    const startIndex = this.currentPage - 1;
    const endIndex = this.selectedPageSize;
    this.menusService.getMenusFromApi(startIndex,endIndex).subscribe((menus:any) => {
      const {totalElements,totalPages,content,size}=menus;
      this.totalPages = totalPages;
      this.totalEntities=totalElements;
      this.selectedPageSize=size
      this.menusApi = content;
      this.dataSource.data = this.menusApi;
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


  deleteMenu(menuId: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.menusService.deleteMenu(menuId).subscribe(() => {
          Swal.fire(
            'Deleted!',
            'The menu with ID ' + menuId + ' has been deleted.',
            'success'
          ).then(() => {
            this.loadMenusApi();
            this.totalPages = Math.ceil(this.totalEntities / this.selectedPageSize);
          });
        });
      }
    });
  }

  addMenu() {
    console.log(this.newMenuApi)
    this.menusService.addMenu(this.newMenuApi).subscribe(() => {
      this.loadMenusApi();
    });
    this.loadMenusApi()
  }

  submitMenuForm() {
    console.log(this.newMenuApi)
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

  toggleVisibility(menu: MenuUser): void {
    this.menusService.changeMenuVisibility(menu.id).subscribe(
      () => {
        this.loadMenusApi();
      }
    )
    this.loadMenusApi();
  }

  onChange(event: any): void {
    this.itemsPerPage = event.pageSize;
    this.currentPage = 1;
    this.loadMenus();
    this.currentPage = event.pageIndex + 1;
    this.loadMenus();
  }

  editAppetizer(menu: MenuUser): void {
    const newName = prompt('Editar nombre', menu.appetizer.name);
    if (newName !== null && newName.trim() !== '') {
      menu.appetizer.name = newName.trim();
      this.menusService.updateAppetizer(menu).subscribe(() => {
        this.loadMenusApi();
      });
      alert('Nombre actualizado exitosamente.');
    }
  }

}
