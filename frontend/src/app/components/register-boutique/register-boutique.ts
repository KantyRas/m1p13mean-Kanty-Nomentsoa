import { Component } from '@angular/core';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register-boutique',
  standalone: false,
  templateUrl: './register-boutique.html',
  styleUrl: './register-boutique.css',
})
export class RegisterBoutique {
  name = '';
  username = '';
  password = '';
  role = 'admin-boutique';
  confirmPassword = '';
  errorMessage = '';
  successMessage = '';

  constructor(private authService: Auth, private router: Router) {}


  OnRegisterBoutique() {
    // Vérification simple des champs requis
    if (!this.username || !this.name || !this.password) {
      this.errorMessage = 'Tous les champs sont requis';
      this.successMessage = '';
      return;
    }

    this.authService.register({ username: this.username, name: this.name, password: this.password, role: this.role })
      .subscribe({
        next: (res) => {
          this.successMessage = 'Inscription réussie !';
          this.errorMessage = '';
          this.username = this.name = this.password = '';
          // Redirection optionnelle
          this.router.navigate(['/admin/dashboard']);
        },
        error: (err) => {
          this.errorMessage = err.error?.error || 'Erreur serveur';
          this.successMessage = '';
        }
      });
  }
}
