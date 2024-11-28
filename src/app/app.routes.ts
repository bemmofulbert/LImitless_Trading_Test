import { AuthGuard } from './app.authguard';
import { Routes } from '@angular/router';
import { UserListComponent } from './home/user-list/user-list.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UserComponent } from './home/user/user.component';
import { UserUpdateComponent } from './home/user-update/user-update.component';

export const routes: Routes = [
  {
    path: 'private',
    children: [
      {
        path: '',
        component: UserListComponent,
      },
      {
        path: ':id',
        component: UserUpdateComponent,
      },
      {
        path: 'add',
        component: UserUpdateComponent,
      },
    ],
    canActivate: [AuthGuard],
  },
  {
    path: 'public',
    redirectTo: '**',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
