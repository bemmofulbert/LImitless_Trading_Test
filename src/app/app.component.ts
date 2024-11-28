import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'LT_Test';
  private readonly keycloak = inject(KeycloakService);
  isLoggedIn = false;
  userProfile: KeycloakProfile | null = null;

  async ngOnInit() {
    this.isLoggedIn = this.keycloak.isLoggedIn();

    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();
    }
  }

  login() {
    this.keycloak.login();
  }

  logout() {
    this.keycloak.logout();
  }
}
