import { Component, OnInit } from '@angular/core';
import { DishesDbService } from '../../../services/dishes-db.service';

@Component({
  selector: 'app-table-dishes',
  standalone: true,
  imports: [],
  templateUrl: './table-dishes.component.html',
  styleUrl: './table-dishes.component.css'
})
export class TableDishesComponent implements OnInit {
  dishes: Dish[] = [];
  newDish: Dish = { id: 0, name: '', description: '', image: '', price: 0, category: '', attributes: [] };
  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 0;

  constructor(private dishesService: DishesDbService) {}

  ngOnInit() {
    this.dishesService.getDishes().subscribe((dishes) => {
      this.dishes = dishes;
      this.calculateTotalPages();
      this.currentPage = 1;
    });
  }

  calculateTotalPages() {
    this.totalPages = Math.ceil(this.dishes.length / this.itemsPerPage);
  }
  
  getDisplayedDishes(): Dish[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.dishes.slice(startIndex, endIndex);
  }
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    const totalPages = Math.ceil(this.dishes.length / this.itemsPerPage);
    if (this.currentPage < totalPages) {
      this.currentPage++;
    }
  }

  addDish() {
    const newDish: Dish = { ...this.newDish }; // Create a copy to avoid modifying the original newDish directly

    // Request user input through alerts
    newDish.name = prompt('Nombre del nuevo plato') || '';
    newDish.description = prompt('Descripción del nuevo plato') || '';
    newDish.image = prompt('URL de la imagen del nuevo plato') || '';
    newDish.price = parseFloat(prompt('Precio del nuevo plato') || '0');
    newDish.category = prompt('Nueva categoría, solo (appetizer, first, second, dessert)') || '';

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

  editDish(dish: Dish) {
    const updatedDish = { ...dish }; // Create a copy to avoid modifying the original dish directly

    updatedDish.name = prompt('Nuevo nombre', dish.name) || dish.name;
    updatedDish.description = prompt('Nueva descripción', dish.description) || dish.description;
    updatedDish.image = prompt('Nueva imagen', dish.image) || dish.image;
    updatedDish.price = parseFloat(prompt('Nuevo precio', dish.price.toString()) || dish.price.toString());
    updatedDish.category = prompt('Nueva categoría, solo (appetizer, first, second, dessert)', dish.category) || dish.category;

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

  private validateDish(dish: Dish): boolean {
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
    this.newDish = { id: 0, name: '', description: '', image: '', price: 0, category: '', attributes: [] };
  }



  deleteDish(dishId: number) {
    this.dishesService.deleteDish(dishId);
  }
}

interface Dish {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  attributes: string[];
}