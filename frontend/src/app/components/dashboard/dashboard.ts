import {Component, OnInit} from '@angular/core';
import {Auth} from '../../services/auth';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {

  constructor(private authservice: Auth) {
  }
  role: string | null = null;
  ngOnInit() {
    this.role = this.authservice.getRole();
  }

}
