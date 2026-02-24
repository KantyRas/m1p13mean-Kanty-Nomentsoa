import { Component, OnInit } from '@angular/core';
import { Roleservice } from '../../services/roleservice';

@Component({
  selector: 'app-role',
  standalone: false,
  templateUrl: './role.html',
  styleUrl: './role.css',
})
export class Role {
  roles: any[] = [];

  constructor(private RoleService: Roleservice) {}

  ngOnInit(): void {
    this.RoleService.getRoles().subscribe({
      next: (data) => {
        console.log(data);
        this.roles = data;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}