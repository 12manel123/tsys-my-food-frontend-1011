import { Component } from '@angular/core';
import { UserforAdmin, UserDbService } from '../../../services/user-db.service';

@Component({
  selector: 'app-table-users',
  standalone: true,
  imports: [],
  templateUrl: './table-users.component.html',
  styleUrl: './table-users.component.css'
})
export class TableUsersComponent {
  users: UserforAdmin[] = [];
  showRoleModal = false;
  selectedUser: UserforAdmin | undefined;
  selectedUserId: number | undefined;
  newRole = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;

  constructor(private userDbService: UserDbService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = this.currentPage * this.itemsPerPage;

    this.userDbService.getUsers().subscribe(users => {
      this.users = users.slice(startIndex, endIndex);
      this.totalPages = Math.ceil(this.userDbService.getTotalUsersCount() / this.itemsPerPage);
    });
  }

  deleteUser(userId: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario con ID: '+ userId+"?")) {
      this.userDbService.deleteUser(userId).subscribe(() => {
        this.loadUsers();
        this.totalPages = Math.ceil(this.userDbService.getTotalUsersCount() / this.itemsPerPage);
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

  nextPage(): void {
    const startIndex = this.currentPage * this.itemsPerPage;
    if (startIndex < this.userDbService.getTotalUsersCount()) {
      this.currentPage++;
      this.loadUsers();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadUsers();
    }
  }
}
