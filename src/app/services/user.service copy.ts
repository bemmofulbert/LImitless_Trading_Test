import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import User from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: User[] = [];
  currentId: number = 0;

  constructor() {
    // this.add('arol', 'assets/person.png');
    // this.add('incognito', 'assets/world.png');
    // this.add('alain', 'favicon.ico');
    // this.add('intri', 'assets/world.png');
    this.load();
  }

  getAll(): User[] {
    return this.users.map((user) => user.copy());
  }
  add(username = 'unknown', photo = 'assets/world.png') {
    this.users.push(
      new User({
        id: this.currentId,
        username,
        photo,
      })
    );
    this.currentId++;
    this.save();
  }

  delete(id: number) {
    let todelete = this.users.findIndex((user) => user.id === id);
    if (todelete != -1) {
      this.users.splice(todelete, 1);
    }
    this.save();
  }
  get(id: number): User | undefined {
    const found = this.users.find((user) => user.id === id);
    return found ? Object.assign(new User(), found) : undefined;
  }
  update(newUser: User) {
    let foundIndex = this.users.findIndex((user) => user.id === newUser.id);
    if (foundIndex != -1)
      this.users[foundIndex] = Object.assign(this.users[foundIndex], newUser);
    this.save();
  }

  save() {
    localStorage.setItem('users', JSON.stringify(this.users));
  }
  load() {
    let usersData = localStorage.getItem('users');
    if (usersData) {
      this.users = JSON.parse(usersData).map((userData: any) =>
        Object.assign(new User(), userData)
      );
      this.currentId = Math.max(...this.users.map((user) => user.id)) + 1;
    } else {
      this.currentId = 0;
    }
  }
}
