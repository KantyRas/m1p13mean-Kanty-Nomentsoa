import { ChangeDetectorRef, Component } from '@angular/core';
import { ProduitService } from '../../services/produit.service';
import { ActivatedRoute } from '@angular/router';
import { Produits } from '../produits/produits';
import { Panierservice } from '../../services/panierservice';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-produit-detail',
  standalone: false,
  templateUrl: './produit-detail.html',
  styleUrl: './produit-detail.css',
})
export class ProduitDetail {
  produitId!: string;
  produits: any[] = [];
  paniers: any[] = [];
  quantite: number = 1;

  panierForm: any = {
    proprietaire: null,
    guestId: null,
    details: [
      {
        produit: '',
        prix: '',
        quantite: '',
        subtotal: ''
      }
    ],
    totalAmount: ''
  };

  constructor(private ProduitService: ProduitService, private cdr: ChangeDetectorRef, private route: ActivatedRoute, private PanierService: Panierservice, private authService: Auth) {}

  ngOnInit(): void {
    this.produitId = this.route.snapshot.paramMap.get('id')!;
    this.getProduitById();
    this.increment();
    this.decrement();
    this.getPanier();
  }

  getProduitById(){
    this.ProduitService.getById(this.produitId).subscribe({
      next: (data) => {
        this.produits = Array.isArray(data) ? data : [data];
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  // Augmenter la quantité
  increment() {
    this.quantite += 1;
  }

  // Diminuer la quantité
  decrement() {
    if (this.quantite > 1) {
      this.quantite -= 1;
    }
  }

  // partie panier
 addPanier(produitId: string, prix: number) {

  const connected = this.authService.isLoggedIn();

  let userId: string | null = null;
  let guestId: string | null = null;

  if (connected) {
    console.log('user connected');
    userId = this.authService.getIdUserLogged();
    console.log(userId);
  } else {
    guestId = localStorage.getItem('guestId');

    if (!guestId) {
      guestId = crypto.randomUUID();
      localStorage.setItem('guestId', guestId);
    }
  }

  const data = {
    userId,
    guestId,
    produitId,
    prix,
    quantite: this.quantite
  };

  this.PanierService.ajouterAuPanier(data)
    .subscribe(res => {
      console.log('Ajouté au panier');
      this.getPanier();
    });
}

getPanier() {

  const connected = this.authService.isLoggedIn();

  let proprietaire: string | null = null;
  let guestId: string | null = null;

  if (connected) {
    proprietaire = this.authService.getIdUserLogged();
    console.log("user is connected (getpanier)");
  } else {
    guestId = localStorage.getItem('guestId');
    console.log("user is not connected (getpanier)");
    console.log(guestId);
  }

  this.PanierService.getPanier(proprietaire, guestId)
    .subscribe(res => {
      this.paniers = [res];
      this.cdr.detectChanges();
      console.log(res);
    });
}

  removeItem(produitId: string) {

    const connected = this.authService.isLoggedIn();

    let userId: string | null = null;
    let guestId: string | null = null;

    if (connected) {
      userId = this.authService.getIdUserLogged();
    } else {
      guestId = localStorage.getItem('guestId');
    }

    this.PanierService.removeFromCart({
      userId,
      guestId,
      produitId
    }).subscribe(res => {
      this.getPanier(); 
    });
  }

}
