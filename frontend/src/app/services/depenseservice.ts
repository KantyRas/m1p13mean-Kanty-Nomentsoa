import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Depenseservice {
  private apiUrl = 'http://localhost:3000/depense';

  constructor(private http: HttpClient) {}

  getDepenses(): Observable<any> {
    // return this.http.get<any>(this.apiUrl);
    return this.http.get<any>(this.apiUrl + '/getDepense');
  }

  getDepensesByDate(dateDebut: string, dateFin: string) {
  return this.http.get<any[]>(
    this.apiUrl + `/getDepenseByDate?dateDebut=${dateDebut}&dateFin=${dateFin}`
  );
}

  create(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/newDepense', data);
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
