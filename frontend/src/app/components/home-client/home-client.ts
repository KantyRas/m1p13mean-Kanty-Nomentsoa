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
  produits: any[] = [];
  categories: any[] = [];
  selectedCategorie: string = 'all';
  selectedPrixMax: string = '';
  selectedSort: string = '';
constructor(private BoutiqueService: BoutiqueService,
            private produitService: ProduitService,private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getBoutiques();
    this.getProduitsALaUne();
    this.loadCategories();
    this.loadAllProduits();
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
  loadAllProduits() {
    this.produitService.filterProduits({}).subscribe({
      next: (data) => {
        this.produits = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
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
  applyFilters() {
    const params: any = {};

    if (this.selectedCategorie && this.selectedCategorie !== 'all') {
      params.categorie = this.selectedCategorie;
    }

    if (this.selectedPrixMax) {
      params.prixMax = this.selectedPrixMax;
    }

    if (this.selectedSort) {
      params.sort = this.selectedSort;
    }

    this.produitService.filterProduits(params).subscribe({
      next: (data) => {
        this.produits = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }
  loadCategories() {
    this.produitService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }
}
