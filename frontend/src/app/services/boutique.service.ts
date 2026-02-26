import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoutiqueService {

  private apiUrl = 'http://localhost:3000/admin/gestboutiques';

  constructor(private http: HttpClient) {}

  // GET toutes les boutiques
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // GET boutique par ID
  getById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // POST créer boutique
  create(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  // PUT modifier boutique
  update(id: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  // DELETE supprimer boutique
  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  // GET boutiques par statut
  getByStatut(statut: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/statut/${statut}`);
  }

  // GET boutiques par propriétaire
  getByOwner(ownerId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/owner/${ownerId}`);
  }

  // PUT update details
  updateDetails(id: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/details/${id}`,  data );
  }

  // GET boutiques actives avec propriétaire
  getActiveWithOwner(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/active-owner`);
  }

  // GET statistiques
  getStats(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/stats`);
  }

}
