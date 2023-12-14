import { Component, OnInit, ViewChild } from '@angular/core';
import { DishesDbService } from '../../../services/dishes-db.service';
import { DishAdmin } from '../../../models/dish-admin';
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
@Component({
  selector: 'app-table-dishes',
  standalone: true,
  imports: [MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule],
  templateUrl: './table-dishes.component.html',
  styleUrl: './table-dishes.component.css'
})
export class TableDishesComponent implements OnInit {
  dishes: DishAdmin[] = [];
  newDish: DishAdmin = { id: 0, name: '', description: '', image: '', price: 0, category: '', attributes: [],visible: false};
  currentPage: number = 1;
  itemsPerPage: number = 5
  totalPages: number = 0;
  displayedColumns: string[] = ['id', 'name', 'description', 'image', 'price', 'category', 'attributes', 'visible', 'actions'];
  dataSource: MatTableDataSource<DishAdmin> = new MatTableDataSource<DishAdmin>([]);

  constructor(public dishesService: DishesDbService) {}

  ngOnInit(): void {
    this.loadDishes();
    /*this.calculateTotalPages();
    this.dataSource.data = this.getDisplayedDishes();
    this.dataSource.paginator = this.paginator;
    this.currentPage = 1;*/
    /*this.dishesService.getDishes().subscribe((dishes) => {
      this.dishes = dishes;
      this.calculateTotalPages();
      this.currentPage = 1;
    });*/
  }

  loadDishes(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = this.currentPage * this.itemsPerPage;

    this.dishesService.getDishes().subscribe(dishes => {
      this.dishes = dishes.slice(startIndex, endIndex);
      this.totalPages = Math.ceil(this.dishesService.getTotalDishesCount() / this.itemsPerPage);
    });
  }

  calculateTotalPages() {
    this.totalPages = Math.ceil(this.dishes.length / this.itemsPerPage);
  }
  
  getDisplayedDishes(): DishAdmin[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.dishes.slice(startIndex, endIndex);
  }
  prevPage() {
    alert("test");
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    alert("test2");
    this.calculateTotalPages();
    alert(this.totalPages);
    if (this.currentPage < this.totalPages) {
      alert(this.currentPage);
      this.currentPage++;
    }
  }

  onChange(event: any): void {
    this.itemsPerPage = event.pageSize;
    this.currentPage = 1;
    this.loadDishes();
    this.currentPage = event.pageIndex + 1;
    this.loadDishes();
  }


  addDish() {
    const newDish: DishAdmin = { ...this.newDish }; // Create a copy to avoid modifying the original newDish directly

    // Request user input through alerts
    newDish.name = prompt('Nombre del nuevo plato') || '';
    newDish.description = prompt('Descripción del nuevo plato') || '';
    newDish.image = prompt('URL de la imagen del nuevo plato') || '';
    newDish.price = parseFloat(prompt('Precio del nuevo plato') || '0');
    newDish.category = prompt('Nueva categoría, solo (appetizer, first, second, dessert)') || '';
    newDish.visible= confirm('Visible?');
    // Request user input for attributes, limiting to celiac, nuts, vegan, vegetarian, lactose
    const attributesInput = prompt(
      'Atributos del nuevo plato (opcional, separados por comas): celiac, nuts, vegan, vegetarian, lactose'
    ) || '';
    newDish.attributes = this.validateAttributes(attributesInput);

    if (this.validateDish(newDish)) {
      this.dishesService.addDish(newDish);
      this.resetNewDish();
      alert('Plato añadido exitosamente.');
    } else {
      alert('Por favor, complete todos los campos correctamente antes de añadir el plato.');
    }
  }

  editDish(dish: DishAdmin) {
    const updatedDish = { ...dish }; // Create a copy to avoid modifying the original dish directly

    updatedDish.name = prompt('Nuevo nombre', dish.name) || dish.name;
    updatedDish.description = prompt('Nueva descripción', dish.description) || dish.description;
    updatedDish.image = prompt('Nueva imagen', dish.image) || dish.image;
    updatedDish.price = parseFloat(prompt('Nuevo precio', dish.price.toString()) || dish.price.toString());
    updatedDish.category = prompt('Nueva categoría, solo (appetizer, first, second, dessert)', dish.category) || dish.category;
    updatedDish.visible= confirm('Visible?');

    const attributesInput = prompt(
      'Nuevos atributos (separados por comas): celiac, nuts, vegan, vegetarian, lactose',
      dish.attributes.join(', ')
    ) || '';
    updatedDish.attributes = this.validateAttributes(attributesInput);

    if (this.validateDish(updatedDish)) {
      this.dishesService.updateDish(updatedDish);
      alert('Plato actualizado exitosamente.');
    } else {
      alert('Por favor, complete todos los campos correctamente antes de actualizar el plato.');
    }
  }

  private validateAttributes(attributesInput: string): string[] {
    const allowedAttributes = ['celiac', 'nuts', 'vegan', 'vegetarian', 'lactose',''];
    const allowedCategories = ['appetizer', '', 'first', 'second', 'dessert'];
    const attributes = attributesInput.split(',').map((attr) => attr.trim());
    return attributes.filter((attr) => allowedAttributes.includes(attr));
  }

  private validateDish(dish: DishAdmin): boolean {
    const allowedCategories = ['appetizer', 'first', 'second', 'dessert'];
    return (
      dish.name.trim() !== '' &&
      dish.description.trim() !== '' &&
      dish.image.trim() !== '' &&
      dish.price > 0 &&
      allowedCategories.includes(dish.category.trim()) &&
      dish.attributes.length > 0
    );
  }

  private resetNewDish() {
    this.newDish = { id: 0, name: '', description: '', image: '', price: 0, category: '', attributes: [],visible: false };
  }



  deleteDish(dishId: number) {
    this.dishesService.deleteDish(dishId);
  }
}