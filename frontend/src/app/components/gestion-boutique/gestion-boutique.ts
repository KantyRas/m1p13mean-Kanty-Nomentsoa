import { Component, OnInit } from '@angular/core';
import { BoutiqueService } from '../../services/boutique.service';
import { Auth } from '../../services/auth';
import { ChangeDetectorRef } from '@angular/core';
import {Userservice} from '../../services/userservice';

@Component({
  selector: 'app-gestion-boutique',
  standalone: false,
  templateUrl: './gestion-boutique.html',
  styleUrl: './gestion-boutique.css',
})
export class GestionBoutique implements OnInit {

  boutiques: any[] = [];
  selectedBoutique: any = null;
  isEditing: boolean = false;
  stats: any = null;

  role: string | null = null;

  // Formulaire boutique
  boutiqueForm: any = {
    reference: '',
    nomboutique: '',
    description: '',
    surface: '',
    loyer: '',
    nombrepiece: '',
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
  detailsModalVisible = false;
  selectedDetails: any = null;

  constructor(
    private boutiqueService: BoutiqueService,
    private authService: Auth,
    private userService: Userservice,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.role = this.authService.getRole();
    this.loadBoutiques();
    this.loadUsers();
  }
  loadUsers() {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
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
  showDetails(boutique: any) {
    this.selectedDetails = boutique.details || {}; // au cas où details = null
    this.detailsModalVisible = true;
  }
  closeDetails() {
    this.detailsModalVisible = false;
    this.selectedDetails = null;
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
    this.isEditing = true;
  }

  // Mettre à jour boutique
  updateBoutique() {
    if (!this.selectedBoutique) return;
    if (this.boutiqueForm.statut === 1 &&
      this.selectedBoutique.statut !== 1) {

      this.showDetailsModal = true;
      return; // stop update normal
    }
    this.boutiqueService
      .update(this.selectedBoutique._id, this.boutiqueForm)
      .subscribe({
        next: () => {
          this.resetForm();
          this.loadBoutiques();
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Erreur update', err);
        }
      });
  }
  saveDetails() {
    this.detailsForm.date_activation = new Date();
    this.detailsForm.date_resilliation = null;

    this.boutiqueService.updateDetails(
      this.selectedBoutique._id,
      { details: this.detailsForm }
    ).subscribe(() => {

      this.showDetailsModal = false;
      this.resetForm();
      this.loadBoutiques();
      this.cdr.detectChanges();
    });
  }

  // Supprimer boutique
  deleteBoutique(id: string) {
    if (!confirm('Confirmer suppression ?')) return;

    this.boutiqueService.delete(id).subscribe({
      next: () => {
        this.loadBoutiques();
        this.cdr.detectChanges();
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
    this.isEditing = false;
    this.boutiqueForm = {
      reference: '',
      nomboutique: '',
      description: '',
      surface: '',
      loyer: '',
      nombrepiece: '',
      localisation: '',
      statut: 0
    };
  }

}
