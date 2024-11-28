import { Component, computed, inject, model, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule, UpperCasePipe } from '@angular/common';
import { SearchBarComponent } from './home/search-bar/search-bar.component';
import { UserComponent } from './home/user/user.component';
import { UserService } from './services/user.service';
import User from './models/user';
import { KeycloakAngularModule } from 'keycloak-angular';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, KeycloakAngularModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'LT_Test';
}
