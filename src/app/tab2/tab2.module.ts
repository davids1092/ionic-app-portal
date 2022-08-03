import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';

import { Tab2PageRoutingModule } from './tab2-routing.module';
import { LottieModule } from 'ngx-lottie';
export function playerFactory() { // add this line
  return import('lottie-web'); // add this line
} // add this line
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab2PageRoutingModule,
    LottieModule.forRoot({ player: playerFactory }),
    ReactiveFormsModule
  ],
  declarations: [Tab2Page]
})
export class Tab2PageModule {}
