import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss'],
})
export class DetallesComponent implements OnInit {
credito:any
  constructor(private modalCtrl: ModalController, private navParams: NavParams,) { }
name:string
  ngOnInit() {
    this.credito = this.navParams.get('credito')
    console.log('creditos detales', this.credito)
  }
  cancel() {
    return this.modalCtrl.dismiss(this.name, 'confirm');
  }
}
