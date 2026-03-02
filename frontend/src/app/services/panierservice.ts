import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Auth } from './auth';

@Injectable({
  providedIn: 'root',
})
export class Panierservice {
  private readonly STORAGE_KEY = 'panier_visiteur';

  private apiUrl = 'http://localhost:3000/api/panier';

  constructor(private http: HttpClient, private authService: Auth) {}

  create(data: any): Observable<any> {
      return this.http.post<any>(this.apiUrl , data);
  }

  ajouterAuPanier(data: any) {
    return this.http.post<any>(this.apiUrl , data);
  }

  getPanier(proprietaire: string | null, guestId: string | null) {
    return this.http.get<any>(this.apiUrl + '/getPanier', {
      params: {
        proprietaire: proprietaire || '',
        guestId: guestId || ''
      }
    });
  }

  removeFromCart(data: {
    userId: string | null,
    guestId: string | null,
    produitId: string
    }) {
    return this.http.post(this.apiUrl + '/remove', data);
  }

  getTotalProduits(userId: string | null, guestId: string | null) {
  return this.http.get<any>(this.apiUrl + '/total-produit' , {
    params: {
      userId: userId || '',
      guestId: guestId || ''
    }
  });
}

}