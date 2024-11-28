import { FormGroup } from '@angular/forms';
import { Injectable, inject } from '@angular/core';
import User from '../models/user';
import { HttpClient } from '@angular/common/http';
import IUser from '../interfaces/user';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // users: User[] = [];
  // currentId: number = 0;

  private BASE_URL = 'http://localhost:3000/user/';
  private BASE_COUNT_URL = 'http://localhost:3000/count/user/';
  private http = inject(HttpClient);

  constructor() {}

  getAll(): Observable<User[]> {
    return this.http.get<IUser[]>(this.BASE_URL).pipe(
      map((usersArray) => {
        return usersArray.map<User>((userJson) => User.fromJson(userJson));
      })
    );
  }
  add(user: User): Observable<void> {
    return this.http.put<void>(this.BASE_URL, user.toJson());
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.BASE_URL + id);
  }
  get(id: number): Observable<User> {
    return this.http
      .get<IUser[]>(this.BASE_URL + id)
      .pipe(map((userJson) => User.fromJson(userJson[0])));
  }
  update(user: User): Observable<void> {
    return this.http.put<void>(this.BASE_URL + user.id, user.toJson());
  }

  count(): Observable<Number> {
    return this.http
      .get<any>(this.BASE_COUNT_URL)
      .pipe(map((countJson) => countJson['count(id)']));
  }
}
