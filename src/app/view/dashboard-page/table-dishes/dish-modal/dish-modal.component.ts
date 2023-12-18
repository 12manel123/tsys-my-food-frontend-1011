import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DishesDbService } from '../../../../services/dishes-db.service';
import { FormsModule } from '@angular/forms';
import { DishAdmin } from '../../../../models/dish-admin';

@Component({
  selector: 'app-dish-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './dish-modal.component.html',
  styleUrl: './dish-modal.component.css'
})


export class DishModalComponent {

  newDish: DishAdmin = { id: 0, name: '', description: '', image: '', price: 0, category: '', attributes: [],visible: false};


  

  constructor(private dialogRef: MatDialogRef<DishModalComponent>, private dishesDbService: DishesDbService) {}

  addDish() {

    const newDish: DishAdmin =  { ...this.newDish };  
    console.log(newDish);

    this.dishesDbService.addDish(newDish).subscribe(
      (result) => {
        console.log('Dish added successfully:', result);
        this.dialogRef.close();
      },
      (error) => {
        console.error('Error adding dish:', error);
      }
    );
  }
}