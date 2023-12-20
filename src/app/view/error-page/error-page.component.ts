import { Component } from '@angular/core';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-error-page',
  standalone: true,
  imports: [],
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.css'
})

export class ErrorPageComponent {
  constructor(private location: Location) {}
  ngOnInit(): void {
    Swal.fire({
        icon: 'error',
        title: 'Error Route',
        text: 'You are being redirected to the previous page.',
        timer: 2000,
        showConfirmButton: false,
    }).then(() => {
      this.location.back();
    });
  }
}
