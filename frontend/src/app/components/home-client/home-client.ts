import { ChangeDetectorRef, Component } from '@angular/core';
import { BoutiqueService } from '../../services/boutique.service';
import {ProduitService} from '../../services/produit.service';

@Component({
  selector: 'app-home-client',
  standalone: false,
  templateUrl: './home-client.html',
  styleUrl: './home-client.css',
})
export class HomeClient {
   boutiques: any[] = [];
  produitsALaUne: any[] = [];
constructor(private BoutiqueService: BoutiqueService,
            private produitService: ProduitService,private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getBoutiques();
    this.getProduitsALaUne();
  }

   getBoutiques(){
    this.BoutiqueService.getByStatut(1).subscribe({
      next: (data) => {
        this.boutiques = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  getProduitsALaUne() {
    this.produitService.getProduitsALaUne().subscribe({
      next: (data) => {
        this.produitsALaUne = data;
        console.log(data);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erreur produits à la une:', err);
      }
    });
  }
}
