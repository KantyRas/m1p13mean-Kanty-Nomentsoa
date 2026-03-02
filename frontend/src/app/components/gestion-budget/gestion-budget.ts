import { ChangeDetectorRef, Component } from '@angular/core';
import { Depenseservice } from '../../services/depenseservice';

@Component({
  selector: 'app-gestion-budget',
  standalone: false,
  templateUrl: './gestion-budget.html',
  styleUrl: './gestion-budget.css',
})
export class GestionBudget {
    depenses: any[] = [];
    categories: string[] = [];
    role: string | null = null;
    // Formulaire depense
    depenseForm: any = {
      description: '',
      date: '',
      somme: '',
      categorie: ''
    };
  authService: any;

  dateDebut!: string;
  dateFin!: string;

 constructor(private DepenseService: Depenseservice, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    // this.role = this.authService.getRole();
    this.getDepenses();
    this.loadCategories();
    this.calculerTotal();
  }

  getDepenses(){
    this.DepenseService.getDepenses().subscribe({
      next: (data) => {
        console.log(data);
        this.depenses = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  loadCategories(){
    this.categories = ['Deplacement', 'Reparation', 'Fournitures', 'Marketing', 'Achat', 'Entretien', 'Urgence', 'Autre'];
  }

  createDepense(){
    this.DepenseService.create(this.depenseForm).subscribe({
      next: () => {
        this.depenseForm = {
          description: '',
          date: '',
          somme: '',
          categorie: ''
        };

        this.cdr.detectChanges();
        this.getDepenses();
      },
      error: (err) => {
        console.error('Erreur création dépense', err);
      }
    });
  }

  deleteDepense(id:string){

    if (!confirm('Confirmer suppression ?')) return;

    this.DepenseService.delete(id).subscribe({
      next: () => {
        this.getDepenses();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erreur suppression', err);
      }
    });
  }

  filtrerDepenses() {
  this.DepenseService.getDepensesByDate(this.dateDebut, this.dateFin)
    .subscribe({
      next: (data) => {
        this.depenses = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
      }
    })

  }

  calculerTotal(): number {
    return this.depenses.reduce((acc, current) => acc + current.somme, 0);
  }

}
