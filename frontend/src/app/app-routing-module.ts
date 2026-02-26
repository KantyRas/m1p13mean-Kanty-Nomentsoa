import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayout } from './components/admin-layout/admin-layout';
import { Dashboard } from './components/dashboard/dashboard';
import { Users } from './components/users/users';
import { Home } from './components/home/home';
import {GestionCompte} from './components/gestion-compte/gestion-compte';
import {GestionBudget} from './components/gestion-budget/gestion-budget';
import { Login } from './components/login/login';
import {Register} from './components/register/register';
import {Produits} from './components/produits/produits';
import {RegisterBoutique} from './components/register-boutique/register-boutique';

const routes: Routes = [

  // page d’accueil e-commerce
  {
    path: '',
    component: Home,
    children: [
      {path: '', component: Produits},
    ]
  },
  { path: 'login', component: Login }, // page login accessible via /login
  { path: 'register', component: Register },

  {
    path: 'admin',
    component: AdminLayout,
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'users', component: Users },
      { path: 'accounts', component: GestionCompte },
      { path: 'budgets', component: GestionBudget },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'register-boutique', component: RegisterBoutique },
    ]
  },

  { path: '**', redirectTo: '' } // fallback vers page d'accueil
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
