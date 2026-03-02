import { ChangeDetectorRef, Component } from '@angular/core';
import { Panierservice } from '../../services/panierservice';
import { ActivatedRoute } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-panier-liste',
  standalone: false,
  templateUrl: './panier-liste.html',
  styleUrl: './panier-liste.css',
})
export class PanierListe {
  
  userId!: string;
  paniers: any[] = [];

   panierForm: any = {
      produit: '',
      prix: '',
      quantite: '',
      subtotal: ''
    };
  totalProduits: any;

constructor(private PanierService: Panierservice, private cdr: ChangeDetectorRef, private route: ActivatedRoute, private authService: Auth) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id')!;
    this.getPanier();
    this.getTotalProduits();
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
      this.getPanier(); // rafraîchir panier
    });
  }

  getTotalProduits() {
    const connected = this.authService.isLoggedIn();

    let userId: string | null = null;
    let guestId: string | null = null;

    if (connected) {
      userId = this.authService.getIdUserLogged();
    } else {
      guestId = localStorage.getItem('guestId');
    }

    this.PanierService.getTotalProduits(userId, guestId)
      .subscribe(res => {
        this.totalProduits = res.totalProduits;
      });
  }
}
