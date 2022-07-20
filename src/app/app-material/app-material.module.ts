import { NgModule } from '@angular/core';

import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import {MatSidenavModule} from '@angular/material/sidenav'; 
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import {MatListModule} from '@angular/material/list'; 
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu'; 
import {MatTabsModule} from '@angular/material/tabs';
import {MatDatepickerModule} from '@angular/material/datepicker'; 
import { MatNativeDateModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select'; 
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatPaginatorModule} from '@angular/material/paginator'; 
import {MatTableModule} from '@angular/material/table'; 
import {MatAutocompleteModule} from '@angular/material/autocomplete'; 
import {MatExpansionModule} from '@angular/material/expansion'; 
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatStepperModule} from '@angular/material/stepper'; 

import {MatRadioModule} from '@angular/material/radio'; 
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSidenavModule,
    MatDialogModule,
    MatListModule,
    MatToolbarModule,
    MatMenuModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatExpansionModule,
    MatTooltipModule,
    MatStepperModule ,
   
    MatRadioModule,
    MatSlideToggleModule
    
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSidenavModule,
    MatDialogModule,
    MatListModule,
    MatToolbarModule,
    MatMenuModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatExpansionModule,
    MatTooltipModule,
    MatStepperModule,
    
    MatRadioModule,
    MatSlideToggleModule 
    
  
  ],
  providers: [],
})
export class AppMaterialModule { }
