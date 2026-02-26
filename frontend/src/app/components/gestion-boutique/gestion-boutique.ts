import { Component, OnInit } from '@angular/core';
import { BoutiqueService } from '../../services/boutique.service';
import { Auth } from '../../services/auth';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-gestion-boutique',
  standalone: false,
  templateUrl: './gestion-boutique.html',
  styleUrl: './gestion-boutique.css',
})
export class GestionBoutique implements OnInit {

  boutiques: any[] = [];
  selectedBoutique: any = null;
  stats: any = null;

  role: string | null = null;

  // Formulaire boutique
  boutiqueForm: any = {
    reference: '',
    nomboutique: '',
    description: '',
    surface: 0,
    loyer: 0,
    nombrepiece: 0,
    localisation: '',
    statut: 0
  };
  showDetailsModal = false;
  detailsForm: any = {
    proprietaire: '',
    categorie: '',
    date_activation: null,
    date_resilliation: null
  };

  users: any[] = [];

  constructor(
    private boutiqueService: BoutiqueService,
    private authService: Auth,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.role = this.authService.getRole();
    this.loadBoutiques();
    this.loadStats();
  }

  // Charger toutes les boutiques
  loadBoutiques() {
    this.boutiqueService.getAll().subscribe({
      next: (data) => {
        this.boutiques = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erreur chargement boutiques', err);
      }
    });
  }

  // Charger statistiques
  loadStats() {
    this.boutiqueService.getStats().subscribe({
      next: (data) => {
        this.stats = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erreur stats', err);
      }
    });
  }

  // Créer boutique
  createBoutique() {
    this.boutiqueService.create(this.boutiqueForm).subscribe({
      next: () => {
        this.resetForm();
        this.loadBoutiques();
        this.loadStats();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erreur création', err);
      }
    });
  }

  // Sélectionner boutique à modifier
  editBoutique(boutique: any) {
    this.selectedBoutique = boutique;
    this.boutiqueForm = { ...boutique };
  }

  // Mettre à jour boutique
  updateBoutique() {
    if (!this.selectedBoutique) return;

    this.boutiqueService
      .update(this.selectedBoutique._id, this.boutiqueForm)
      .subscribe({
        next: () => {
          this.resetForm();
          this.loadBoutiques();
          this.loadStats();
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Erreur update', err);
        }
      });
  }

  // Supprimer boutique
  deleteBoutique(id: string) {
    if (!confirm('Confirmer suppression ?')) return;

    this.boutiqueService.delete(id).subscribe({
      next: () => {
        this.loadBoutiques();
        this.loadStats();
      },
      error: (err) => {
        console.error('Erreur suppression', err);
      }
    });
  }

  // Filtrer par statut
  filterByStatut(statut: number) {
    this.boutiqueService.getByStatut(statut).subscribe({
      next: (data) => {
        this.boutiques = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erreur filtre statut', err);
      }
    });
  }

  // Reset formulaire
  resetForm() {
    this.selectedBoutique = null;
    this.boutiqueForm = {
      reference: '',
      nomboutique: '',
      description: '',
      surface: 0,
      loyer: 0,
      nombrepiece: 0,
      localisation: '',
      statut: 0
    };
  }

}
