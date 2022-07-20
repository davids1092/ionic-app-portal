import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-pagar',
  templateUrl: './pagar.component.html',
  styleUrls: ['./pagar.component.scss'],
})
export class PagarComponent implements OnInit {
name:string
  constructor(private navParams: NavParams, private modalCtrl: ModalController) { }
numero:any
pagoMinimo:any
check1=false
check2=false
check3=false
PagoTotal:any
  ngOnInit() {
    console.log(this.navParams.get('numero'));
    this.numero = this.navParams.get('numero')
    this.pagoMinimo = this.navParams.get('pagoM')
    this.PagoTotal = this.navParams.get('pagoT')
  
  }
  confirm() {
    return this.modalCtrl.dismiss(this.name, 'confirm');
  }
  checkBox(){
    console.log('entrre1')
  if(this.check2){
    this.check2=!this.check2
  }if(this.check3){
    this.check3=!this.check3
  }
  }
  checkBox1(){
    console.log('entrre2')
    if(this.check1){
      this.check1=!this.check1
    }if(this.check3){
      this.check3=!this.check3
    }
    }
    checkBox2(){
      console.log('entrre3')
      if(this.check1){
        this.check1=!this.check1
      }if(this.check2){
        this.check2=!this.check2
      }
      }

}
