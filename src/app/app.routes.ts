import { AuthGuard } from './app.authguard';
import { Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
