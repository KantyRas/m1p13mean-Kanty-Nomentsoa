import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Roleservice {
  // private apiUrl = 'http://localhost:3000/roles';
  private apiUrl = 'https://m1p13mean-kanty-nomentsoa.onrender.com/roles';

  constructor(private http: HttpClient) {}

  getRoles(): Observable<any> {
    // return this.http.get<any>(this.apiUrl);
    return this.http.get<any>(this.apiUrl + '/getrole');
  }

}
