import { Component } from '@angular/core';
import { UserforAdmin, UserDbService } from '../../../services/user-db.service';
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { JsonPipe } from '@angular/common';
import { UserDTO } from '../../../models/user';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal, { SweetAlertOptions, SweetAlertResult } from 'sweetalert2';
@Component({
  selector: 'app-table-users',
  standalone: true,
  imports: [    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    JsonPipe,
    MatTooltipModule,
  ],
  templateUrl: './table-users.component.html',
  styleUrl: './table-users.component.css'
})
export class TableUsersComponent {

  users: UserforAdmin[] = [];
  displayedColumns: string[] = ['id', 'username', 'email', 'role', 'actions'];

  showRoleModal = false;
  selectedUser: UserforAdmin | undefined;
  selectedUserId: number | undefined;
  newRole = '';
  currentPage: number = 0;
  totalPages: number = 0;
  totalEntities: number = 0;
  public selectedPageSize: number = 10;

  constructor(public userDbService: UserDbService,private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    const startIndex = this.currentPage - 1;
    const endIndex = this.selectedPageSize;
    this.userDbService.getUsers(startIndex,endIndex).subscribe((users:any) => {
      const {totalElements,totalPages,content,size}=users;
      this.totalPages = totalPages;
      this.totalEntities=totalElements;
      this.selectedPageSize=size
      this.users = content;
    });
  }
  
  deleteUser(userId: number): void {
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
        this.userDbService.deleteUser(userId).subscribe(() => {
          Swal.fire(
            'Deleted!',
            'The user' + userId + ' has been deleted.',
            'success'
          ).then(() => {
            this.loadUsers();
            this.totalPages = Math.ceil(this.totalEntities / this.selectedPageSize);
          });
        }, (error) => {
          Swal.fire('Error', 'An error occurred while deleting the user.', 'error');
        });
      }
    });
  }
  

  closeRoleModal(): void {
    this.showRoleModal = false;
    this.selectedUser = undefined;
    this.newRole = '';
  }

  updateRole(userId: number,user: UserDTO): void {
    this.selectedUserId = userId;
    this.userDbService.updateUser(userId,user).subscribe(() => {
      this.loadUsers();
    });
  }
  
  onChange(event: any): void {
    this.selectedPageSize = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    this.loadUsers();
  }

  getTotalUsersCount():any{
    return this.userDbService.getTotalUsersCount();
  }

  copyToClipboard(content: string): void {
    const el = document.createElement('textarea');
    el.value = content;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    this.showCopiedMessage();
  }

  showCopiedMessage(): void {
    this.snackBar.open('Copied', 'Close', {
      duration: 2000,
      panelClass: ['copied-snackbar'],
    });
  }
}