import { ChangeDetectorRef, Component } from '@angular/core';
import { BoutiqueService } from '../../services/boutique.service';

@Component({
  selector: 'app-home-client',
  standalone: false,
  templateUrl: './home-client.html',
  styleUrl: './home-client.css',
})
export class HomeClient {
   boutiques: any[] = [];
constructor(private BoutiqueService: BoutiqueService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getBoutiques();
  }

   getBoutiques(){
    this.BoutiqueService.getByStatut(1).subscribe({
      next: (data) => {
        console.log(data);
        this.boutiques = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
