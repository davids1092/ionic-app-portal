import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.scss'],
})
export class MovimientosComponent implements OnInit {

  constructor(private modalCtrl: ModalController) { }
  name: string;
  movimientos=[
    {
      'fecha':'22/22/22',
      'descripcion':'pago PSE',
      'monto':'500000'
    },
    {
      'fecha':'22/22/22',
      'descripcion':'pago PSE',
      'monto':'500000'
    },
    {
      'fecha':'22/22/22',
      'descripcion':'pago PSE',
      'monto':'500000'
    },
    {
      'fecha':'22/22/22',
      'descripcion':'pago PSE',
      'monto':'500000'
    },
  ]
  ngOnInit() {}
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.name, 'confirm');
  }
}
