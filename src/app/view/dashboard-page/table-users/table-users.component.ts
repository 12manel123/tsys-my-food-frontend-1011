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

@Component({
  selector: 'app-table-users',
  standalone: true,
  imports: [    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule
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
  currentPage: number = 1;
  totalPages: number = 0;
  public selectedPageSize: number = 10;

  constructor(public userDbService: UserDbService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    const startIndex = (this.currentPage - 1) * this.selectedPageSize;
    const endIndex = this.currentPage * this.selectedPageSize;
  
    this.userDbService.getUsers().subscribe(users => {
      this.users = users.slice(startIndex, endIndex);
      this.totalPages = Math.ceil(this.userDbService.getTotalUsersCount() / this.selectedPageSize);
    });
  }
  
  deleteUser(userId: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario con ID: '+ userId+"?")) {
      this.userDbService.deleteUser(userId).subscribe(() => {
        this.loadUsers();
        this.totalPages = Math.ceil(this.userDbService.getTotalUsersCount() / this.selectedPageSize);
      });
    }
    this.loadUsers();
  }

  closeRoleModal(): void {
    this.showRoleModal = false;
    this.selectedUser = undefined;
    this.newRole = '';
  }

  updateRole(userId: number): void {
    this.selectedUserId = userId;
    this.userDbService.updateRole(userId).subscribe(() => {
      this.loadUsers();
    });
  }

  onChange(event: any): void {
    this.selectedPageSize = event.pageSize;
    this.currentPage = 1;
    this.loadUsers();
    this.currentPage = event.pageIndex + 1;
    this.loadUsers();
  }
}