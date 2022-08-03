import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { MovimientosComponent } from '../components/movimientos/movimientos.component';
import { PagarComponent } from '../components/pagar/pagar.component';
import { LottieModule } from 'ngx-lottie';
export function playerFactory() { // add this line
  return import('lottie-web'); // add this line
} // add this line
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    LottieModule.forRoot({ player: playerFactory }),
    Tab1PageRoutingModule
  ],
  declarations: [Tab1Page, MovimientosComponent,PagarComponent]
})
export class Tab1PageModule {}
