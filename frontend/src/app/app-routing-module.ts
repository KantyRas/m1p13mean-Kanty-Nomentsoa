import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayout } from './components/admin-layout/admin-layout';
import { Dashboard } from './components/dashboard/dashboard';
import { Users } from './components/users/users';
import { Home } from './components/home/home';
import {GestionCompte} from './components/gestion-compte/gestion-compte';
import {GestionBudget} from './components/gestion-budget/gestion-budget';

import { Role } from './components/role/role';
import { Login } from './components/login/login';
import { authGuard } from './services/auth-guard';
import { Register } from './components/register/register';
import { AdminDash } from './components/admin-dash/admin-dash';
import { BoutiqueDash } from './components/boutique-dash/boutique-dash';

const routes: Routes = [
  // { path: '', redirectTo: 'login', pathMatch: 'full' },
  // { path: 'role', component: Role, canActivate: [authGuard]},
  // { path: 'login', component: Login },
  // { path: 'register', component: Register },

  // {
  // path: 'dashboard/admin',
  // component: AdminDash,
  // canActivate: [authGuard],
  // data: { roles: ['admin'] }
  // },
  // {
  //   path: 'dashboard/boutique',
  //   component: BoutiqueDash,
  //   canActivate: [authGuard],
  //   data: { roles: ['boutique', 'admin'] }
  // },
  { path: '', component: Home }, // page d’accueil e-commerce
  { path: 'login', component: Login }, // page login accessible via /login

  {
    path: 'admin',
    component: AdminLayout,
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'users', component: Users },
      { path: 'accounts', component: GestionCompte },
      { path: 'budgets', component: GestionBudget },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  { path: '**', redirectTo: '' } // fallback vers page d'accueil
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
