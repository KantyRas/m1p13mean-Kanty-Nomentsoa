import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { Userservice } from '../../services/userservice';
import {Auth} from '../../services/auth';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
users: any[] = [];

  constructor(private authservice: Auth, private Userservice: Userservice, private cdr: ChangeDetectorRef){
  }

  role: string | null = null;

  ngOnInit() {
    this.role = this.authservice.getRole();

    this.Userservice.getUsers().subscribe({
      next: (data) => {
        console.log(data);
        this.users = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

}
