import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Role } from './components/role/role';


const routes: Routes = [
  { path: '', redirectTo: '/role', pathMatch: 'full' },
  { path: 'role', component: Role },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
