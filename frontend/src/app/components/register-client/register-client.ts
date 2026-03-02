import { Component } from '@angular/core';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-client',
  standalone: false,
  templateUrl: './register-client.html',
  styleUrl: './register-client.css',
})
export class RegisterClient {
  name = '';
  username = '';
  password = '';
  confirmPassword = '';
  role = 'client';
  adresse = '';
  dateNaissance = '';
  genre = '';
  phone = '';
  email = '';
  errorMessage = '';
  successMessage = '';


  constructor(private authService: Auth, private router: Router) {}

    OnRegisterClient() {
    // Vérification simple des champs requis
    if (!this.username || !this.name || !this.password || !this.confirmPassword || !this.adresse || !this.dateNaissance || !this.genre) {
      this.errorMessage = 'Tous les champs sont requis';
      this.successMessage = '';
      return;
    }

    // ✅ Vérification que les mots de passe correspondent
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Les mots de passe ne correspondent pas';
      this.successMessage = '';
      return;
    }

    this.authService.register({ username: this.username, name: this.name, password: this.password, role: this.role, adresse: this.adresse, genre: this.genre, dateNaissance:this.dateNaissance })
      .subscribe({
        next: (res) => {
          this.successMessage = 'Inscription réussie !';
          this.errorMessage = '';
          this.username = this.name = this.password = this.adresse = this.genre ='';
          // Redirection optionnelle
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.errorMessage = err.error?.error || 'Erreur serveur';
          this.successMessage = '';
        }
      });
  }

}
