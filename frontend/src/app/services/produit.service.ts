import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  private apiUrl = 'http://localhost:3000/api/produits';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<any[]>(this.apiUrl);
  }
  getById(id: string) {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  create(data: any) {
    return this.http.post<any>(this.apiUrl, data);
  }
  update(id: string, data: any) {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }
  delete(id: string) {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
  getByBoutique(boutiqueId: string) {
    return this.http.get<any[]>(`${this.apiUrl}/boutique/${boutiqueId}`);
  }
  getByCategorie(categorieId: string) {
    return this.http.get<any[]>(`${this.apiUrl}/categorie/${categorieId}`);
  }
  getDisponibles(statutId: string) {
    return this.http.get<any[]>(`${this.apiUrl}/statut/${statutId}`);
  }

  getPromotion() {
    return this.http.get<any[]>(`${this.apiUrl}/promotion`);
  }

  getStockFaible() {
    return this.http.get<any[]>(`${this.apiUrl}/stock-faible`);
  }
  getCategories() {
    return this.http.get<any[]>(`${this.apiUrl}/categories`);
  }
  createCategorie(data: any) {
    return this.http.post<any>(`${this.apiUrl}/categories`, data);
  }
}
