import { Component } from '@angular/core';
import { KeycloakAngularModule } from 'keycloak-angular';

@Component({
  selector: 'app-not-found',
  imports: [KeycloakAngularModule],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css',
})
export class NotFoundComponent {}
