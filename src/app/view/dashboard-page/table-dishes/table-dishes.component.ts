import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DishModalComponent } from './dish-modal/dish-modal.component'; 


@Component({
  selector: 'app-table-dishes',
  standalone: true,
  imports: [MatCardModule,
    CommonModule,
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
  editingImageId: number | null = null;
  private ngUnsubscribe = new Subject();


  constructor(public dishesService: DishesDbService, public dialog: MatDialog) {}

  // constructor(public dishesService: DishesDbService) {}

  ngOnInit(): void {
    this.loadDishes();
    // this.subscribeToVisibilityChanges();
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
      this.dataSource.data = this.dishes;
    });
  }

  // subscribeToVisibilityChanges(): void {
  //   this.dishesService.getDishVisibilityChanges()
  //     .pipe(takeUntil(this.ngUnsubscribe))
  //     .subscribe((changedDishId: number) => {
  //       const changedDish = this.dishes.find((dish) => dish.id === changedDishId);
  //       if (changedDish) {
  //         changedDish.visible = !changedDish.visible;
  //       }
  //     });
  // }

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
    
    const dialogRef = this.dialog.open(DishModalComponent, {
      width: '400px', 
    })
    dialogRef.afterClosed().subscribe(() => {
      
      this.loadDishes();
    });
  }


  addDishes() {
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

    if (this.validateCategory(newDish)) {
      console.log(newDish)
      this.dishesService.addDish(newDish).subscribe(() => {
        this.loadDishes();
      });
      this.resetNewDish();
      alert('Plato añadido exitosamente.');
    } else {
      alert('Por favor, complete todos los campos correctamente antes de añadir el plato.');
    }
  }

  // editDish(dish: DishAdmin) {
  //   const updatedDish = { ...dish };
  //   updatedDish.name = prompt('Nuevo nombre', dish.name) || dish.name;
  //   updatedDish.description = prompt('Nueva descripción', dish.description) || dish.description;
  //   updatedDish.image = prompt('Nueva imagen', dish.image) || dish.image;
  //   updatedDish.price = parseFloat(prompt('Nuevo precio', dish.price.toString()) || dish.price.toString());
  //   updatedDish.category = prompt('Nueva categoría, solo (appetizer, first, second, dessert)', dish.category) || dish.category;
  //   const attributesInput = prompt(
  //     'Atributos del nuevo plato (opcional, separados por comas): celiac, nuts, vegan, vegetarian, lactose'
  //   ) || '';
  //   updatedDish.attributes = this.validateAttributes(attributesInput);
  //   updatedDish.visible = confirm('Visible?');
  
  //   if (this.validateCategory(updatedDish)) {
  //     this.dishesService.updateDish(updatedDish).subscribe(() => {
  //       this.loadDishes();
  //     });
  //     alert('Plato actualizado exitosamente.');
  //   } else {
  //     alert('Por favor, complete todos los campos correctamente antes de actualizar el plato.');
  //   }
  // }
  
  editName(dish: DishAdmin): void {
    const newName = prompt('Editar nombre', dish.name);
    if (newName !== null && newName.trim() !== '') {
      dish.name = newName.trim();
      
      this.dishesService.updateDish(dish).subscribe(() => {
        this.loadDishes();
      });
      alert('Nombre actualizado exitosamente.');
    }
  }

  editDescription(dish: DishAdmin): void {
    const newDescription = prompt('Editar descripción', dish.description);
    if (newDescription !== null && newDescription.trim() !== '') {
      dish.description = newDescription.trim();
      this.dishesService.updateDish(dish).subscribe(() => {
        this.loadDishes();
      });
      alert('Descripción actualizada exitosamente.');
    }
  }

  editImage(dish: DishAdmin): void {
    const newImage = prompt('Editar imagen (URL)', dish.image);
    if (newImage !== null && newImage.trim() !== '') {
      dish.image = newImage.trim();
      this.dishesService.updateDish(dish).subscribe(() => {
        this.loadDishes();
      });
      alert('Imagen actualizada exitosamente.');
    }
  }

  

  editPrice(dish: DishAdmin): void {
    const newPrice = prompt('Editar precio', dish.price.toString());
  
    if (newPrice !== null) {
      const parsedPrice = parseFloat(newPrice);
      if (!isNaN(parsedPrice) && parsedPrice > 0) {
        dish.price = parsedPrice;
        this.dishesService.updateDish(dish).subscribe(() => {
          this.loadDishes();
        });
        alert('Precio actualizado exitosamente.');
      }
    }
  }
  

  editCategory(dish: DishAdmin): void {
    const allowedCategories = ['APPETIZER', 'FIRST', 'SECOND', 'DESSERT'];
    
    const newCategory = prompt('Editar categoría (appetizer, first, second, dessert)', dish.category);
    
    if (newCategory !== null && allowedCategories.includes(newCategory.toUpperCase())) {
      dish.category = newCategory.toUpperCase();
      this.dishesService.updateDish(dish).subscribe(() => {
        this.loadDishes();
      });
      alert('Categoría actualizada exitosamente.');
    } else {
      alert('Por favor, ingrese una categoría válida.');
    }
  }
  
  toggleVisibility(dish: DishAdmin): void {
    this.dishesService.changeDishVisibility(dish.id).subscribe(
      () => {
        this.loadDishes();
      },
      (error) => console.error('Error changing visibility:', error)
    )
    
  }
  

  private validateAttributes(attributesInput: string): string[] {
    const allowedAttributes = ['celiac', 'nuts', 'vegan', 'vegetarian', 'lactose',''];
    const attributes = attributesInput.split(',').map((attr) => attr.trim());
    return attributes.filter((attr) => allowedAttributes.includes(attr));
  }

  private validateCategory(dish: DishAdmin): boolean {
    const allowedCategories = ['APPETIZER', 'FIRST', 'SECOND', 'DESSERT'];
    const newCategory = prompt('Nueva categoría, solo (APPETIZER, FIRST, SECOND, DESSERT)', dish.category);
    return allowedCategories.includes(newCategory?.trim().toUpperCase() || '');
  }
  

  private resetNewDish() {
    this.newDish = { id: 0, name: '', description: '', image: '', price: 0, category: '', attributes: [],visible: false };
  }

  enlargeImage(dish: DishAdmin): void {
    if (this.editingImageId === null || this.editingImageId !== dish.id) {
      const imageElement = document.getElementById(`dish-image-${dish.id}`);
      if (imageElement) {
        imageElement.classList.add('enlarged');
      }
    }
  }

  resetImageSize(): void {
    const enlargedImages = document.querySelectorAll('.dish-image.enlarged');
    enlargedImages.forEach((image) => image.classList.remove('enlarged'));
  }




  addAttribute(dishId: number) {
    const attributesInput = prompt(
      'Añade un nuevo Atributo: celiac, nuts, vegan, vegetarian, lactose');
      console.log(attributesInput);
      if(attributesInput != null){
      const idAt = this.checkAttribute(attributesInput.toUpperCase());
      if(idAt!=0){
        this.dishesService.addRelationAttribute(idAt,dishId).subscribe(() => {
          this.loadDishes();
          this.totalPages = Math.ceil(this.totalEntities / this.selectedPageSize);
        }); 
      }
    }
  }

  deleteAttribute(attribute: string,dishId: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este plato con ID: '+ dishId+"?")) {
      let idAt:number=0;
      idAt = this.checkAttribute(attribute);
      if(idAt!=0){
      this.dishesService.deleteRelationAttribute(idAt,dishId).subscribe(() => {
        this.loadDishes();
        this.totalPages = Math.ceil(this.totalEntities / this.selectedPageSize);
      });}
      else{
        alert("Atributo mal selccionado")
      }
    }
    this.loadDishes();    
  }

  checkAttribute(attribute: string): number {
    switch (attribute) {
      case 'LACTOSE':
        return 1;
      case 'CELIAC':
        return 2;
      case 'VEGAN':
        return 3;
      case 'VEGETARIAN':
        return 4;
      case 'NUTS':
        return 5;
      default:
        return 0; 
    }
  }

}
