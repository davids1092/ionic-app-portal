import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { NavBarComponent } from '../components/nav-bar/nav-bar.component';
import { AppMaterialModule } from '../app-material/app-material.module';
import { LottieModule } from 'ngx-lottie';

export function playerFactory() { // add this line
  return import('lottie-web'); // add this line
} // add this line
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    AppMaterialModule,
    LottieModule.forRoot({ player: playerFactory })
    
  ],
  declarations: [TabsPage , NavBarComponent],
  providers:[DatePipe]
})
export class TabsPageModule {}
