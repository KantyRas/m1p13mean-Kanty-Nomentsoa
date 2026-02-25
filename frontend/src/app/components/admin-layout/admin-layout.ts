import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  standalone: false,
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css',
})
export class AdminLayout implements OnInit {

  constructor(private router: Router) {}
  role: 'admin-boutique' | 'admin-centre' = 'admin-boutique';

  ngOnInit() {
    const savedRole = localStorage.getItem('role');

    if (savedRole === 'admin-boutique' || savedRole === 'admin-centre') {
      this.role = savedRole;
    } else {
      // Client ou non connecté → interdit
      this.router.navigate(['/']);
    }
  }

  logout() {
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  get menuLinks() {
    if (this.role === 'admin-boutique') {
      return [
        { label: 'Dashboard', path: 'dashboard' },
        { label: 'Produits', path: 'users' }
      ];
    } else {
      return [
        { label: 'Dashboard', path: 'dashboard' },
        { label: 'Gestion Utilisateurs', path: 'users' },
        { label: 'Gestion Comptes', path: 'accounts' },
        { label: 'Gestion Budgets', path: 'budgets' },
      ];
    }
  }
}
