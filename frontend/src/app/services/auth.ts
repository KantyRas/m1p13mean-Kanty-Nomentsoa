import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private apiUrl = 'http://localhost:3000/auth';
  private user: any = null;

  constructor(private http: HttpClient) { }

  login(data: any) {
    this.user = data;
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  register(data: any) {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  getUser(){
    return this.user;
  }

  getRole() {

    const token = localStorage.getItem('token');
    if (!token) return null;

    const payload = JSON.parse(atob(token.split('.')[1]));
    // console.log("PAYLOAD :",payload);
    console.log(payload.roles[0]);
    return payload.roles ? payload.roles[0] : null;
  }
}
