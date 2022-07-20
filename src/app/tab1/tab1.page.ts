import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MovimientosComponent } from '../components/movimientos/movimientos.component';
import { PagarComponent } from '../components/pagar/pagar.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  creditos=[
    {
      'estado':'activo',
      'numero':'12345',
      'pagoM':'99999',
      'pagoT':'8888',
      'fecha':'2'
      
    },
    {
      'estado':'activo',
      'numero':'12345',
      'pagoM':'5555',
      'pagoT':'8888',
      'fecha':'2'
      
    },
  ]
  theme='dark'
  valueBar:any
  cupoDisponible:any = 50000  
  cupoUtilizado:any= 30000
  constructor(private modalCtrl: ModalController) {}
  ngOnInit(){
  this.valueBar = ((this.cupoUtilizado * 100)/this.cupoDisponible) / 100
  
}
async openModalMov() {
  const modal = await this.modalCtrl.create({
    component: MovimientosComponent,
  });
  modal.present();

  const { data, role } = await modal.onWillDismiss();

}
async openModalPago(numero:any,pagoM:any,pagoT:any) {
  console.log(pagoT)
  const modal = await this.modalCtrl.create({
    component: PagarComponent,
    componentProps:{
      'numero':numero,
      'pagoM':pagoM,
      'pagoT':pagoT
    }
  });
  modal.present();

  const { data, role } = await modal.onWillDismiss();

}

}
