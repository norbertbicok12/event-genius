import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(private authService: AuthService) {}

  isLoggedIn(): any {
    return this.authService.isLoggedIn();
    }

  logout() {
    this.authService.logout();
  }
}
