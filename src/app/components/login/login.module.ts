import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { AppMaterialModule } from 'src/app/app-material/app-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LoginRoutingModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule
   
    
  ]
})
export class LoginModule { }
