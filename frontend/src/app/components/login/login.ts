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

  constructor(private authService: Auth, private router: Router, private cdr: ChangeDetectorRef) {}
  

  onLogin() {

    this.errorMessage = ''; // réinitialiser le message avant chaque login

    const data = {
      username: this.username,
      password: this.password
    };


    this.authService.login(data).subscribe({
      next: (res: any) => {
        console.log('Login success', res);

        // Sauvegarde du token dans le localStorage
        localStorage.setItem('token', res.token);

        const role = this.authService.getRole();
        console.log('ROLE :', role);

        this.router.navigate([`/dashboard/${role}`]);

        // this.router.navigate(['/role']);
      },
      error: (err) => {
        console.log('Erreur login', err.status);
        console.log('Message backend :', err.error);
        this.errorMessage = err.error?.error || 'Erreur inconnue';
        this.cdr.detectChanges();
      }
    });
    
  }
}
