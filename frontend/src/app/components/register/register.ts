import { Component } from '@angular/core';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  name = '';
  username = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';
  successMessage = '';

  constructor(private authService: Auth, private router: Router) {}

  OnRegister() {
    // Vérification simple des champs requis
    if (!this.username || !this.name || !this.password) {
      this.errorMessage = 'Tous les champs sont requis';
      this.successMessage = '';
      return;
    }

    this.authService.register({ username: this.username, name: this.name, password: this.password })
      .subscribe({
        next: (res) => {
          this.successMessage = 'Inscription réussie !';
          this.errorMessage = '';
          this.username = this.name = this.password = '';
          // Redirection optionnelle
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.errorMessage = err.error?.error || 'Erreur serveur';
          this.successMessage = '';
        }
      });
  }
}
