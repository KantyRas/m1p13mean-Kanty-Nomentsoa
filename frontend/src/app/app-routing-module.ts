import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
