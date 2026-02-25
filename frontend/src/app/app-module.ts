import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';


import { HttpClient, HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { Role } from './components/role/role';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { AdminDash } from './components/admin-dash/admin-dash';
import { BoutiqueDash } from './components/boutique-dash/boutique-dash';

@NgModule({
  declarations: [
    App,
    Role,
    Login,
    Register,
    AdminDash,
    BoutiqueDash,
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
