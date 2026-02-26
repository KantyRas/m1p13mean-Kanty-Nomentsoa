import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-admin-layout',
  standalone: false,
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css',
})
export class AdminLayout implements OnInit {

  role!: 'admin-boutique' | 'admin-centre';

  constructor(
    private router: Router,
    private authService: Auth
  ) {}

  ngOnInit() {

    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    const role = this.authService.getRole();

    if (role === 'admin-boutique' || role === 'admin-centre') {
      this.role = role;
    } else {
      this.router.navigate(['/']);
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  get menuLinks() {

    if (this.role === 'admin-boutique') {
      return [
        { label: 'Dashboard', path: 'dashboard' },
        { label: 'Produits', path: 'users' }
      ];
    }

    return [
      { label: 'Dashboard', path: 'dashboard' },
      { label: 'Gestion Utilisateurs', path: 'users' },
      { label: 'Gestion Comptes', path: 'accounts' },
      { label: 'Gestion Budgets', path: 'budgets' }
    ];
  }
}
