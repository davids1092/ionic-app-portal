import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AppMaterialModule } from './app-material/app-material.module';
import { LoginComponent } from './components/login/login.component';
import { RecuperarContrasenaComponent } from './components/recuperar-contrasena/recuperar-contrasena.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LottieModule } from 'ngx-lottie';
import { ChangePasswordComponent } from './components/login/change-password/change-password.component';

export function playerFactory() { // add this line
  return import('lottie-web'); // add this line
} // add this line
@NgModule({
  declarations: [AppComponent, LoginComponent, RecuperarContrasenaComponent,ChangePasswordComponent ],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, BrowserAnimationsModule, AppMaterialModule, HttpClientModule,FormsModule,ReactiveFormsModule,
    LottieModule.forRoot({ player: playerFactory })],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule { }
