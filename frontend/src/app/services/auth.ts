import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {

  private apiUrl = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) {}

  login(data: any) {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  register(data: any) {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;

    return !this.isTokenExpired(token);
  }

  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp;

      if (!exp) return true;

      return Date.now() >= exp * 1000;

    } catch {
      return true;
    }
  }

  getRole(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));

      if (payload.roles && payload.roles.length > 0) {
        return payload.roles[0];
      }

      return null;

    } catch {
      return null;
    }
  }

  isAdmin(): boolean {
    const role = this.getRole();
    return role === 'admin-boutique' || role === 'admin-centre';
  }

  
}
