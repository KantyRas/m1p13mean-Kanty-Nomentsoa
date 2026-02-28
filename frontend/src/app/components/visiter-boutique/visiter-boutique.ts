import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoutiqueService } from '../../services/boutique.service';
import { ProduitService } from '../../services/produit.service';

@Component({
  selector: 'app-visiter-boutique',
  standalone: false,
  templateUrl: './visiter-boutique.html',
  styleUrl: './visiter-boutique.css'
})
export class VisiterBoutique implements OnInit {

  categories: any[] = [];
  boutique: any = null;
  produits: any[] = [];
  selectedCategorie: string = 'all';
  selectedPrixMax: string = '';
  selectedSort: string = '';

  boutiqueId!: string;

  constructor(
    private route: ActivatedRoute,
    private boutiqueService: BoutiqueService,
    private produitService: ProduitService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.boutiqueId = this.route.snapshot.paramMap.get('id')!;
    this.loadCategories();
    this.loadBoutique();
    this.loadProduits();
  }

  loadBoutique() {
    this.boutiqueService.getById(this.boutiqueId)
      .subscribe(data => {
        this.boutique = data;
        this.cdr.detectChanges();
      });
  }

  loadProduits() {
    this.produitService.getDisponibles(this.boutiqueId)
      .subscribe(data => {
        this.produits = data;
        this.cdr.detectChanges();
      });
  }
  applyFilters() {
    const params: any = {
      categorie: this.selectedCategorie,
      prixMax: this.selectedPrixMax,
      sort: this.selectedSort
    };

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
