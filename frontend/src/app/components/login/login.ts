import { ChangeDetectorRef, Component } from '@angular/core';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  username = '';
  password = '';
  errorMessage = '';

  constructor(
    private authService: Auth,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  onLogin() {

    this.errorMessage = '';

    const data = {
      username: this.username,
      password: this.password
    };

    this.authService.login(data).subscribe({

      next: (res: any) => {

        // On stocke seulement le token
        localStorage.setItem('token', res.token);

        const role = this.authService.getRole();

        if (role === 'client') {
          this.router.navigate(['/']);
        } else if (role === 'admin-boutique' || role === 'admin-centre') {
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.router.navigate(['/']);
        }
      },

      error: (err) => {
        this.errorMessage = err.error?.error || 'Identifiants invalides';
        this.cdr.detectChanges();
      }

    });
  }
}
