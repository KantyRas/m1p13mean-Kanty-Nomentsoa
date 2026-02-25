import { Component, OnInit } from '@angular/core';
import { Roleservice } from '../../services/roleservice';
import { ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-role',
  standalone: false,
  templateUrl: './role.html',
  styleUrl: './role.css',
})
export class Role implements OnInit{
  roles: any[] = [];

  constructor(private RoleService: Roleservice, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.RoleService.getRoles().subscribe({
      next: (data) => {
        console.log(data);
        this.roles = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}