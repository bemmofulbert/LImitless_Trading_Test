import { UserService } from './../../services/user.service';
import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import User from '../../models/user';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { toPascalCase } from '../../app.utils';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  @Input({
    transform: (value: User) => {
      return {
        id: value.id,
        username: toPascalCase(value.username),
        photo: value.photo,
      };
    },
  })
  user: User = new User();
}
