import { Component, HostListener, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { MovimientosComponent } from '../components/movimientos/movimientos.component';
import { PagarComponent } from '../components/pagar/pagar.component';
import { ServicesService } from '../services/services.service';
import { ConverterService } from '../services/converter.service';
import { DetallesComponent } from '../components/detalles/detalles.component';
import { AnimationOptions } from 'ngx-lottie';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page extends ConverterService implements OnInit {
  date1:any
  options: AnimationOptions = {
  
    path: './assets/lottie.json', // download the JSON version of animation in your project directory and add the path to it like ./assets/animations/example.json
  };
  identificacion:any
  tipoIdentificacion:any
  cliente:any
  creditos=[
   
  ]
  theme='dark'
  valueBar:any
  cupoDisponible:any = 0
  cupoUtilizado:any= 0
  cupoTotal = 0
  estado:any
  spinner=false
  scroll = true
  constructor(private modalCtrl: ModalController,
    private services: ServicesService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private date: DatePipe,
    private router:Router
    ) {
      super()
    }
  //   ionViewDidEnter(){
  //     console.log("entrando")
  //     let temp:any = sessionStorage.getItem('cliente')
  //   let temp2 =JSON.parse(temp)
  //   this.cliente = JSON.parse(this.decrypt(temp2['data']))
  //   this.identificacion = this.cliente.identification
  //   this.tipoIdentificacion = this.cliente.typeDocument
   
  //   this.getCredits()
  // }
  // ionViewDidEnter(){
  //   let credits =this.services.getCredits()
  //   console.log('entre a revisar productos', credits)
  //   if(credits == null){
  //     this.getCredits()
  //   }
   
  // }
  ngOnInit(){
    console.log('entre tab1')
    let temp:any = sessionStorage.getItem('cliente')
    let temp2 =JSON.parse(temp)
    this.cliente = JSON.parse(this.decrypt(temp2['data']))
    this.identificacion = this.cliente.identification
    this.tipoIdentificacion = this.cliente.typeDocument
   
    this.getCredits()
  
  console.log('entre a tab1')
}

//consulta d ecreditos
getCredits(){
  
  // this.presentLoading()
  this.spinner= true

  let data={}
  data['documentType']=this.tipoIdentificacion 
    data['identification'] =this.identificacion
   
  this.services.creditos(data).subscribe({
    next:(x:any)=>{
      let response = JSON.parse(this.decrypt(x['data']))
   
      for(let c of response){
        c.FECHAPAGO = this.date.transform(this.transformDate( c.FECHAPAGO.toString()),'dd/MM/yyyy')
        this.creditos.push(c)
      }
      console.log('respuesta creditos', this.creditos)
      
      this.getCupo()
      this.services.saveCredits(this.creditos)
      this.services.subject.next(1)
    },
    error:(error:any)=>{
      this.spinner=false
      // this.loadingController.dismiss()
      this.presentAlert()
    }
  })
}
getCredits1(event:any){
  // this.presentLoading()
  this.spinner= true

  let data={}
  data['documentType']=this.tipoIdentificacion 
    data['identification'] =this.identificacion
   
  this.services.creditos(data).subscribe({
    next:(x:any)=>{
      let response = JSON.parse(this.decrypt(x['data']))
   
      for(let c of response){
        c.FECHAPAGO = this.date.transform(this.transformDate( c.FECHAPAGO.toString()),'dd/MM/yyyy')
        this.creditos.push(c)
      }
      console.log('respuesta creditos', this.creditos)
      
      this.getCupo1(event)
      this.services.saveCredits(this.creditos)
      this.services.subject.next(1)
    },
    error:(error:any)=>{
      this.spinner=false
      this.presentAlert()
    }
  })
}
transformDate(date) {
  if (date !== null && date !== undefined && (date + "").length < 7) {
    return date;
  }
  let transoformed =
    (date + "").substring(0, 4) +
    "-" +
    (date + "").substring(4, 6) +
    "-" +
    (date + "").substring(6);
  return transoformed;
}
//traer cupo total
getCupo(){
  let data={}
  data['documentType']=this.tipoIdentificacion
    data['identification'] =this.identificacion
  this.services.cupo(data).subscribe({
    next:(x:any)=>{
      let response = JSON.parse(this.decrypt(x['data']))
      console.log('respusta de cupo', response)
      this.cupoDisponible = response.cupoDisponible
      this.cupoTotal= response.cupoTotal
      this.cupoUtilizado = this.cupoTotal - this.cupoDisponible
      this.estado = response.estadoCupo
      this.valueBar = ((this.cupoUtilizado * 100)/this.cupoTotal) / 100
      // this.loadingController.dismiss()
   
        this.spinner=false
       
         
      
     
    },
    error:(error:any)=>{

    }
  })
}
getCupo1(event){
  let data={}
  data['documentType']='1'
    data['identification'] ='71195366' 
  this.services.cupo(data).subscribe({
    next:(x:any)=>{
      let response = JSON.parse(this.decrypt(x['data']))
      console.log('respusta de cupo', response)
      this.cupoDisponible = response.cupoDisponible
      this.cupoTotal= response.cupoTotal
      this.cupoUtilizado = this.cupoTotal - this.cupoDisponible
      this.estado = response.estadoCupo
      this.valueBar = ((this.cupoUtilizado * 100)/this.cupoTotal) / 100
      // this.loadingController.dismiss()
   
        this.spinner=false
       
          event.target.complete();
      
     
    },
    error:(error:any)=>{

    }
  })
}
async openModalMov() {
  const modal = await this.modalCtrl.create({
    component: MovimientosComponent,
  });
  modal.present();

  const { data, role } = await modal.onWillDismiss();

}
async openModalDetalles(credito:any) {
  const modal = await this.modalCtrl.create({
    component: DetallesComponent,
    cssClass: 'my-custom-class',
    componentProps:{
      'credito':credito,
    
    }
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

//FUNCION DE CARGA
async presentLoading() {
  const loading = await this.loadingController.create({
    message: 'Cargando Productos...',
    // duration: 2000
  });
  await loading.present();

  const { role, data } = await loading.onDidDismiss();

  console.log('Loading dismissed!');
}
card(credito:any){
 this.openModalDetalles(credito)
}

async presentAlert() {
  const alert = await this.alertController.create({
    header: 'Alert',
    // subHeader: 'Important message',
    message: 'No cuentas con productos actualmente!',
    buttons: ['OK']
  });

  await alert.present();
}

doRefresh(event) {
  console.log('Begin async operation');
  this.services.subject.next(0)
this.getCredits1(event)
  
}
onScroll(event) {
  if (event.detail.deltaY > 0) {
      // console.log('scrolling down...');
this.scroll=false
  } else if (event.detail.deltaY < 0) {
      // console.log('scrolling up...');
      this.scroll=true
  }
}
documentos(){
  this.router.navigateByUrl('tab3')
}
  
}
