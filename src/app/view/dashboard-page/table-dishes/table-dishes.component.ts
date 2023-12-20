import { Component, OnInit } from '@angular/core';
import { DishesDbService } from '../../../services/dishes-db.service';
import { DishAdmin } from '../../../models/dish-admin';
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DishModalComponent } from './dish-modal/dish-modal.component'; 
import Swal from 'sweetalert2';


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
      this.dataSource.data = this.dishes;
    });
  }

  deleteDish(dishId: number): void {
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
        this.dishesService.deleteDish(dishId).subscribe(() => {
          Swal.fire(
            'Deleted!',
            'The dish has been deleted.',
            'success'
          ).then(() => {
            this.loadDishes();
            this.totalPages = Math.ceil(this.totalEntities / this.selectedPageSize);
          });
        });
      }
    });
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

  editName(dish: DishAdmin): void {
    Swal.fire({
      title: "Edit name",
      input: "text",
      inputValue: dish.name,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value || value.trim() === '') {
          return "You need to enter a valid name!";
        } else {
          return null;
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const newName = result.value.trim();
        dish.name = newName;
  
        this.dishesService.updateDish(dish).subscribe(
          () => {
            this.loadDishes();
  
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Your change has been saved',
              showConfirmButton: false,
              timer: 1000
            });
          }
        );
      } else {
        console.log('Operation canceled by the user.');
      }
    });
  }

  editDescription(dish: DishAdmin): void {
    Swal.fire({
      title: "Edit description",
      input: "text",
      inputValue: dish.description,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value || value.trim() === '') {
          return "You need to enter a valid description!";
        } else {
          return null;
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const newDescription = result.value.trim();
        dish.description = newDescription;
  
        this.dishesService.updateDish(dish).subscribe(() => {
          this.loadDishes();
  
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your change has been saved',
            showConfirmButton: false,
            timer: 1000
          });
        });
      } else {
        console.log('Operation canceled by the user.');
      }
    });
  }

  editImage(dish: DishAdmin): void {
    Swal.fire({
      title: 'Edit Image',
      text: 'Current Image:',
      imageUrl: dish.image,
      imageWidth: 400,
      imageHeight: 200,
      showCancelButton: true,
      confirmButtonText: 'Update Image',
      cancelButtonText: 'Cancel',
      input: 'text',
      inputValue: dish.image,
      inputPlaceholder: 'Enter new image URL',
      showLoaderOnConfirm: true,
      preConfirm: (newImageUrl) => {
        return new Promise<void>((resolve, reject) => {
          if (newImageUrl && newImageUrl.trim() !== '') {
            dish.image = newImageUrl.trim();
            this.dishesService.updateDish(dish).subscribe(
              () => {
                resolve();
              }
            );
          } else {
            reject('Invalid image URL.');
          }
        });
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.loadDishes();

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Your change has been saved',
          showConfirmButton: false,
          timer: 1000
        });
      } else if (result.isDismissed && result.dismiss === Swal.DismissReason.cancel) {
        console.log('Operation canceled by the user.');
      }
    }).catch((error) => {
      Swal.fire('Error', error, 'error');
    });
  }
  

  editPrice(dish: DishAdmin): void {
    Swal.fire({
      title: "Edit price",
      input: "text",
      inputValue: dish.price.toString(),
      showCancelButton: true,
      inputValidator: (value) => {
        const parsedPrice = parseFloat(value);
        if (isNaN(parsedPrice) || parsedPrice <= 0) {
          return "You need to enter a valid positive price!";
        }
        return null;
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const newPrice = parseFloat(result.value.trim());
        dish.price = newPrice;
  
        this.dishesService.updateDish(dish).subscribe(() => {
          this.loadDishes();
          
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your change has been saved",
            showConfirmButton: false,
            timer: 1000
          });
        });
      } else {
        console.log('Operation canceled by the user.');
      }
    });
  }
  

  editCategory(dish: DishAdmin): void {
    const allowedCategories = ['APPETIZER', 'FIRST', 'SECOND', 'DESSERT'];
  
    Swal.fire({
      title: "Edit category",
      input: "select",
      inputOptions: {
        'APPETIZER': 'APPETIZER',
        'FIRST': 'FIRST',
        'SECOND': 'SECOND',
        'DESSERT': 'DESSERT'
      },
      inputValue: dish.category.toUpperCase(),
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value || !allowedCategories.includes(value.toUpperCase())) {
          return "Please select a valid category!";
        }
        return null;
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const newCategory = result.value.toUpperCase();
        dish.category = newCategory;
  
        this.dishesService.updateDish(dish).subscribe(() => {
          this.loadDishes();
  
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your change has been saved",
            showConfirmButton: false,
            timer: 1000
          });
        });
      } else {
        console.log('Operation canceled by the user.');
      }
    });
  }
  
  toggleVisibility(dish: DishAdmin): void {
    this.dishesService.changeDishVisibility(dish.id).subscribe(
      () => {
        this.loadDishes();
      } 
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

  addAttribute(dishId: number): void {
    const allowedAttributes = ['CELIAC', 'NUTS', 'VEGAN', 'VEGETARIAN', 'LACTOSE'];
  
    Swal.fire({
      title: 'Add Attribute',
      input: 'select',
      inputOptions: {
        'CELIAC': 'CELIAC',
        'NUTS': 'NUTS',
        'VEGAN': 'VEGAN',
        'VEGETARIAN': 'VEGETARIAN',
        'LACTOSE': 'LACTOSE'
      },
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value || !allowedAttributes.includes(value.toUpperCase())) {
          return 'Please select a valid attribute!';
        }
        return null;
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const newAttribute = result.value.toUpperCase();
        const idAt = this.checkAttribute(newAttribute);
        
        if (idAt !== 0) {
          this.dishesService.addRelationAttribute(idAt, dishId).subscribe(
            () => {
              this.loadDishes();
  
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Your change has been saved',
                showConfirmButton: false,
                timer: 1000
              });
  
              this.totalPages = Math.ceil(this.totalEntities / this.selectedPageSize);
            }
            
          );
        }
      } else {
        console.log('Operation canceled by the user.');
      }
    });
  }

  deleteAttribute(attribute: string, dishId: number): void {
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
        let idAt: number = 0;
        idAt = this.checkAttribute(attribute);
        if (idAt !== 0) {
          this.dishesService.deleteRelationAttribute(idAt, dishId).subscribe(() => {
            Swal.fire(
              'Deleted!',
              'The attribute ' + attribute + ' has been deleted.',
              'success'
            ).then(() => {
              this.loadDishes();
              this.totalPages = Math.ceil(this.totalEntities / this.selectedPageSize);
            });
          });
        } else {
          Swal.fire('Error', 'Incorrectly selected attribute', 'error');
        }
      }
    });
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
