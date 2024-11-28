import { Component, computed, inject, model, signal } from '@angular/core';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { UserComponent } from '../user/user.component';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import User from '../../models/user';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { toSignal } from '@angular/core/rxjs-interop';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-list',
  imports: [SearchBarComponent, UserComponent, CommonModule, MatButtonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent {
  searchCount: number = 0;
  searchText = model('');

  userService = inject(UserService);

  users = toSignal(this.userService.getAll());
  private router = inject(Router);

  filteredUsers = computed(() => {
    return (
      this.users()?.filter((user) =>
        user.username.includes(this.searchText().toLocaleLowerCase())
      ) ?? []
    );
  });
  constructor() {
    //this.reloadUsers();
  }
  // reloadUsers() {
  //   this.users.set(this.userService.getAll());
  // }
  openUser(user: User) {
    this.router.navigate([`user/${user.id}`]);
  }
  addUser() {
    this.router.navigate([`user/add`]);
  }
  deleteUser(id: number) {
    let deleteSubcription = this.userService.delete(id).subscribe(() => {
      this.router
        .navigateByUrl('/refreshComponent', { skipLocationChange: true })
        .then(() => {
          this.router.navigate(['/user']);
        });
    });
    //this.reloadUsers();
  }

  onSearchEvent() {
    this.searchCount++;
  }
}
