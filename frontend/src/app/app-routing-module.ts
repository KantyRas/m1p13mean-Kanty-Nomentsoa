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
import { RegisterClient } from './components/register-client/register-client';
import { HomeClient } from './components/home-client/home-client';
import {GestionBoutique} from './components/gestion-boutique/gestion-boutique';

const routes: Routes = [

  // page d’accueil e-commerce
  {
    path: '',
    component: Home,
    children: [
      {path: '', component: HomeClient},
    ]
  },
  { path: 'login', component: Login }, // page login accessible via /login
  { path: 'register', component: Register },
  { path: 'register-client', component: RegisterClient },

  {
    path: 'admin',
    component: AdminLayout,
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'boutiques', component: GestionBoutique },
      { path: 'users', component: Users },
      { path: 'accounts', component: GestionCompte },
      { path: 'budgets', component: GestionBudget },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'register-boutique', component: RegisterBoutique },
      { path: 'produits', component: Produits }
    ]
  },

  { path: '**', redirectTo: '' } // fallback vers page d'accueil
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
