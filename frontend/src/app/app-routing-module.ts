import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './components/login/login';
import { AdminLayout } from './components/admin-layout/admin-layout';
import { Dashboard } from './components/dashboard/dashboard';
import { Users } from './components/users/users';
import { Home } from './components/home/home';
import {GestionCompte} from './components/gestion-compte/gestion-compte';
import {GestionBudget} from './components/gestion-budget/gestion-budget';


const routes: Routes = [
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
