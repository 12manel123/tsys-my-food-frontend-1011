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
  totalPages: number = 0;
  displayedColumns: string[] = ['id', 'name', 'description', 'image', 'price', 'category', 'attributes', 'visible', 'actions'];
  dataSource: MatTableDataSource<DishAdmin> = new MatTableDataSource<DishAdmin>([]);
  public selectedPageSize: number = 10;
  totalEntities: number = 0;

  constructor(public dishesService: DishesDbService) {}

  ngOnInit(): void {
    this.loadDishes();
  }

  loadDishes(): void {
    const startIndex = this.currentPage - 1;
    const endIndex = this.selectedPageSize;
    this.dishesService.getDishesFromApi(startIndex,endIndex).subscribe((dishes:any) => {
      const {totalElements,totalPages,content,size}=dishes;
      this.totalPages = totalPages;
      this.totalEntities=totalElements;
      this.selectedPageSize=size
      this.dishes = content;
    });
  }

  deleteDish(dishId: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este plato con ID: '+ dishId+"?")) {
      this.dishesService.deleteDish(dishId).subscribe(() => {
        this.loadDishes();
        this.totalPages = Math.ceil(this.totalEntities / this.selectedPageSize);
      });
    }
    this.loadDishes();
  }

  onChange(event: any): void {
    this.selectedPageSize = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    this.loadDishes();
  }



  addDish() {
    const newDish: DishAdmin = { ...this.newDish };
    newDish.name = prompt('Nombre del nuevo plato') || '';
    newDish.description = prompt('Descripción del nuevo plato') || '';
    newDish.image = prompt('URL de la imagen del nuevo plato') || '';
    newDish.price = parseFloat(prompt('Precio del nuevo plato') || '0');
    newDish.category = prompt('Nueva categoría, solo (appetizer, first, second, dessert)') || '';
    newDish.visible= confirm('Visible?');
    const attributesInput = prompt(
      'Atributos del nuevo plato (opcional, separados por comas): celiac, nuts, vegan, vegetarian, lactose'
    ) || '';
    newDish.attributes = this.validateAttributes(attributesInput);

    if (this.validateDish(newDish)) {
      this.dishesService.addDish(newDish).subscribe(() => {
        this.loadDishes();
      });
      this.resetNewDish();
      alert('Plato añadido exitosamente.');
    } else {
      alert('Por favor, complete todos los campos correctamente antes de añadir el plato.');
    }
  }

  editDish(dish: DishAdmin) {
    const updatedDish = { ...dish };

    updatedDish.name = prompt('Nuevo nombre', dish.name) || dish.name;
    updatedDish.description = prompt('Nueva descripción', dish.description) || dish.description;
    updatedDish.image = prompt('Nueva imagen', dish.image) || dish.image;
    updatedDish.price = parseFloat(prompt('Nuevo precio', dish.price.toString()) || dish.price.toString());
    updatedDish.category = prompt('Nueva categoría, solo (appetizer, first, second, dessert)', dish.category) || dish.category;
    updatedDish.visible= confirm('Visible?');


    if (this.validateDish(updatedDish)) {
      this.dishesService.updateDish(updatedDish).subscribe(() => {
        this.loadDishes();
      });
      alert('Plato actualizado exitosamente.');
    } else {
      alert('Por favor, complete todos los campos correctamente antes de actualizar el plato.');
    }
  }

  private validateAttributes(attributesInput: string): string[] {
    const allowedAttributes = ['celiac', 'nuts', 'vegan', 'vegetarian', 'lactose',''];
    const attributes = attributesInput.split(',').map((attr) => attr.trim());
    return attributes.filter((attr) => allowedAttributes.includes(attr));
  }

  private validateDish(dish: DishAdmin): boolean {
    const allowedCategories = ['APPETIZER', 'FIRST', 'SECOND', 'DESSERT'];
    return (
      dish.name.trim() !== '' &&
      dish.description.trim() !== '' &&
      dish.image.trim() !== '' &&
      dish.price > 0 &&
      allowedCategories.includes(dish.category.trim().toUpperCase()) &&
      dish.attributes.length > 0
    );
  }

  private resetNewDish() {
    this.newDish = { id: 0, name: '', description: '', image: '', price: 0, category: '', attributes: [],visible: false };
  }

  enlargeImage(event: any): void {
    const imageElement = event.target;
    imageElement.classList.toggle('enlarged');
  }


}
