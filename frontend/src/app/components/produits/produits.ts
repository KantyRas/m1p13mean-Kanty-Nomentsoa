import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { ProduitService } from '../../services/produit.service';
import { BoutiqueService } from '../../services/boutique.service';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-produits',
  standalone: false,
  templateUrl: './produits.html',
  styleUrl: './produits.css'
})
export class Produits implements OnInit {

  produits: any[] = [];
  categories: any[] = [];
  boutiques: any[] = [];

  selectedProduit: any = null;
  selectedBoutiqueId: string = '';
  selectedFile: File | null = null;

  isNewCategorie = false;
  newCategorieName = '';

  produitForm: any = {
    nomproduit: '',
    boutiqueOwner: '',
    categorieproduit: '',
    prix: '',
    description: '',
    quantite: '',
    seuilquantite: '',
    statut: 0,
    promotion: ''
  };

  constructor(
    private produitService: ProduitService,
    private boutiqueService: BoutiqueService,
    private authService: Auth,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadBoutiquesByOwner();
    this.cdr.detectChanges();
  }
  onCategorieChange() {
    this.isNewCategorie = this.produitForm.categorieproduit === 'new';
    this.cdr.detectChanges();
  }

  createCategorie() {

    if (!this.newCategorieName.trim()) return;

    this.produitService.createCategorie({ nom: this.newCategorieName })
      .subscribe((newCat: any) => {

        // Ajouter dans la liste
        this.categories.push(newCat);
        this.cdr.detectChanges();

        // Sélectionner automatiquement la nouvelle catégorie
        this.produitForm.categorieproduit = newCat._id;

        // Reset UI
        this.newCategorieName = '';
        this.isNewCategorie = false;

      });
    this.cdr.detectChanges();
  }
  loadBoutiquesByOwner() {
    const userId = this.authService.getIdUserLogged();
    if (!userId) return;

    this.boutiqueService.getByOwner(userId).subscribe(data => {
      this.boutiques = data;
      this.cdr.detectChanges();
    });
  }

  onBoutiqueChange() {
    if (!this.selectedBoutiqueId) {
      this.produits = [];
      return;
    }
    this.resetForm();
    this.loadProduitsByBoutique();
    this.cdr.detectChanges();
  }

  loadProduitsByBoutique() {
    this.produitService
      .getByBoutique(this.selectedBoutiqueId)
      .subscribe(data => {
        this.produits = data;
        this.cdr.detectChanges();
      });
  }

  loadCategories() {
    this.produitService.getCategories().subscribe(data => {
      this.categories = data;
      this.cdr.detectChanges();
    });
  }

createProduit() {
  if (!this.selectedBoutiqueId) {
    alert("Choisir une boutique");
    return;
  }

  // Utilisation de FormData pour envoyer texte + fichier
  const formData = new FormData();
  formData.append('nomproduit', this.produitForm.nomproduit);
  formData.append('boutiqueOwner', this.selectedBoutiqueId);
  formData.append('categorieproduit', this.produitForm.categorieproduit);
  formData.append('prix', this.produitForm.prix);
  formData.append('description', this.produitForm.description);
  formData.append('quantite', this.produitForm.quantite);
  formData.append('seuilquantite', this.produitForm.seuilquantite);
  formData.append('promotion', this.produitForm.promotion);
  
  if (this.selectedFile) {
    formData.append('image', this.selectedFile); // 'image' doit correspondre au nom dans Multer
  }

  this.produitService.create(formData).subscribe(() => {
    this.resetForm();
    this.selectedFile = null; // Reset le fichier
    this.loadProduitsByBoutique();
    this.cdr.detectChanges();
  });
}

  editProduit(p: any) {
    this.selectedProduit = p;

    this.produitForm = {
      ...p,
      categorieproduit: p.categorieproduit?._id || p.categorieproduit,
      boutiqueOwner: p.boutiqueOwner?._id || p.boutiqueOwner
    };

    this.selectedBoutiqueId = this.produitForm.boutiqueOwner;
  }

  updateProduit() {

    this.produitForm.boutiqueOwner = this.selectedBoutiqueId;

    this.produitService
      .update(this.selectedProduit._id, this.produitForm)
      .subscribe(() => {
        this.resetForm();
        this.loadProduitsByBoutique();
        this.cdr.detectChanges();
      });
  }

  deleteProduit(id: string) {
    if (!confirm('Confirmer suppression ?')) return;

    this.produitService.delete(id).subscribe(() => {
      this.loadProduitsByBoutique();
    });
  }

  resetForm() {
    this.selectedProduit = null;

    this.produitForm = {
      nomproduit: '',
      boutiqueOwner: '',
      categorieproduit: '',
      prix: '',
      description: '',
      quantite: '',
      seuilquantite: '',
      statut: 0,
      promotion: ''
    };
  }

  onFileSelected(event: any) {
  this.selectedFile = event.target.files[0];
  }
}
