import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Role } from './components/role/role';
import { Login } from './components/login/login';
import { AdminLayout } from './components/admin-layout/admin-layout';
import { Dashboard } from './components/dashboard/dashboard';
import { Users } from './components/users/users';
import { Home } from './components/home/home';
import { GestionBoutique } from './components/gestion-boutique/gestion-boutique';
import { GestionCompte } from './components/gestion-compte/gestion-compte';
import { GestionBudget } from './components/gestion-budget/gestion-budget';
import {Register} from './components/register/register';
import { Produits } from './components/produits/produits';
import { RegisterBoutique } from './components/register-boutique/register-boutique';
import { RegisterClient } from './components/register-client/register-client';
import { HomeClient } from './components/home-client/home-client';
import { VisiterBoutique } from './components/visiter-boutique/visiter-boutique';
import { PanierListe } from './components/panier-liste/panier-liste';
import { ProduitDetail } from './components/produit-detail/produit-detail';

@NgModule({
  declarations: [
    App,
    Role,
    Login,
    AdminLayout,
    Dashboard,
    Users,
    Home,
    GestionBoutique,
    GestionCompte,
    GestionBudget,
    Register,
    Produits,
    RegisterBoutique,
    RegisterClient,
    HomeClient,
    VisiterBoutique,
    PanierListe,
    ProduitDetail,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideClientHydration(withEventReplay()),
  ],
  bootstrap: [App]
})
export class AppModule { }
