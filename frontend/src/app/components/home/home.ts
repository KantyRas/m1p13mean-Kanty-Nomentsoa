import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Auth} from '../../services/auth';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  constructor(
    private router: Router,
    private authService: Auth
  ) {}

  get role(): string | null {
    return this.authService.getRole();
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
  }

  goToDashboard() {
    this.router.navigate(['/admin/dashboard']);
  }
}
