import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {

  role: string | null = null;

  ngOnInit() {
    this.role = localStorage.getItem('role');
  }

}
