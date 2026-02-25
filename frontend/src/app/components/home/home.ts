import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {

  constructor(private router: Router) {}

  role: string | null = null;
  token: string | null = null;

  ngOnInit() {
    this.role = localStorage.getItem('role');
    this.token = localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('role');
    localStorage.removeItem('token');

    this.role = null;
  }

  goToDashboard() {
    this.router.navigate(['/admin/dashboard']);
  }
}
