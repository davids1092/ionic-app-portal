import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { NavBarComponent } from '../components/nav-bar/nav-bar.component';
import { AppMaterialModule } from '../app-material/app-material.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    AppMaterialModule,
  ],
  declarations: [TabsPage , NavBarComponent]
})
export class TabsPageModule {}
