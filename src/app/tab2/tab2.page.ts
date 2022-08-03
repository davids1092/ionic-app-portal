import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

import { filter } from 'rxjs/operators';
import { ServicesService } from '../services/services.service';
import { AnimationOptions } from 'ngx-lottie';
import { ConverterService } from '../services/converter.service';
import * as FileSaver from 'file-saver';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  // animations:[
  //   trigger('enterState',[
  //     state('void',style({
  //       transform:'traslateX(-100%)',
  //       opacity:1
  //     })),
  //     transition(':enter',[
  //       animate(300, style({
  //         transform:'translateX(0)',
  //         opacity:1
  //       }))
  //     ])
  //   ])
  // ]
})
export class Tab2Page extends ConverterService implements OnInit{
  // @ViewChild('accordionGroup', { static: true }) accordionGroup: IonAccordionGroup;
  mesActual:any
  anioActual:any
  options: AnimationOptions = {
  
    path: './assets/lottie.json', // download the JSON version of animation in your project directory and add the path to it like ./assets/animations/example.json
  };
  monthList = [
    {
      disabled: false,
      type: "Enero",
      number: "01",
    },
    {
      disabled: false,
      type: "Febrero",
      number: "02",
    },
    {
      disabled: false,
      type: "Marzo",
      number: "03",
    },
    {
      disabled: false,
      type: "Abril",
      number: "04",
    },
    {
      disabled: false,
      type: "Mayo",
      number: "05",
    },
    {
      disabled: false,
      type: "Junio",
      number: "06",
    },
    {
      disabled: false,
      type: "Julio",
      number: "07",
    },
    {
      disabled: false,
      type: "Agosto",
      number: "08",
    },
    {
      disabled: false,
      type: "Septiembre",
      number: "09",
    },
    {
      disabled: false,
      type: "Octubre",
      number: "10",
    },
    {
      disabled: false,
      type: "Noviembre",
      number: "11",
    },
    {
      disabled: false,
      type: "Diciembre",
      number: "12",
    },
  ];
  years:any = [];
  formDate:FormGroup
  creditos:any
  spinner=false
  file:any
  fileURL:any
  btn1= true
  cliente:any
  tipoIdentificacion:any
  identificacion:any
  productoCertificado: FormControl
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };
  constructor(
    private router:Router,
    private _formBuilder: FormBuilder,
    private alertController: AlertController,
    private services :ServicesService,
    private loadingCtrl: LoadingController
  ) {
    super()
    // this.router.events.pipe(
    //   filter(event => event instanceof NavigationEnd)
    // ).subscribe((event) => {
    //    this.formDate.reset()
    //    this.toggleAccordion()
    //    this.creditos = this.services.getCredits()
      
    // });
  }
  ionViewDidEnter(){
    // const nativeEl = this.accordionGroup;
    // nativeEl.value = 'second'
    this.creditos = this.services.getCredits()
    console.log('entre a tab2', this.creditos)
 
  }

  ngOnInit(): void {
    let temp:any = sessionStorage.getItem('cliente')
    let temp2 =JSON.parse(temp)
    this.cliente = JSON.parse(this.decrypt(temp2['data']))
    this.identificacion = this.cliente.identification
    this.tipoIdentificacion = this.cliente.typeDocument
    this.productoCertificado = new FormControl
    this.productoCertificado.setValidators([Validators.required]);
console.log('tab2')
    this.formDate = this._formBuilder.group({
      mes: ["", Validators.required],
      anio: ["", Validators.required],
    });
 

   
    
  this.rangeYear()
  
  }
  rangeYear() {
    const max = new Date().getFullYear();
    const min = max - 100;

    for (let i = max; i >= min; i--) {
    
      this.years.push(i);
    }
    return this.years;
  }
 

  // toggleAccordion = () => {
  //   // const nativeEl = this.accordionGroup;
  //   if (nativeEl.value === 'second') {
  //     nativeEl.value = undefined;
  //   } 
  //   else if (nativeEl.value === 'first') {
  //     nativeEl.value = undefined;
  //   } 
   
   
  // }
  
  async presentAlert(message) {
    const alert = await this.alertController.create({
      header: 'Alert',
      // subHeader: 'Important message',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
  generar(numero:any){
    if(this.formDate.invalid){
      this.presentAlert('Selecciona fecha para generar extracto!')
    }else{
      this.showLoading('consultando Extracto')
      let data:any={}
      data['tipoDocumentoCliente']= this.tipoIdentificacion
      data['identificationCliente']= this.identificacion
      data['anioConsulta']=this.formDate.controls['anio'].value
      data['mesConsulta']=this.formDate.controls['mes'].value
      data['numeroProducto']=numero

      this.services.generateExtracto(data).subscribe({
        next:(x:any)=>{
     
      this.file = new Blob([x], { type: 'application/pdf' });
      // this.pdfTerminos = new Blob([x]), {type: 'text/html'}
       this.fileURL = URL.createObjectURL(this.file);
      // window.open(this.fileURL);
      FileSaver.saveAs(this.file,'Extracto');
    this.loadingCtrl.dismiss()
        },error:(error:any)=>{
          this.formDate.reset()
          this.loadingCtrl.dismiss()

        }
      })
    }
   
  }

  async showLoading(message) {
    const loading = await this.loadingCtrl.create({
      message: message,
      // duration: 3000
    });
    
    loading.present();
  }

  generarCertificado()
{
  if(this.productoCertificado.valid){
    this.showLoading('Generando certificado')
    let data:any={}
    data['tipoDocumentoCliente']=this.tipoIdentificacion
    data['identificationCliente']=this.identificacion
    data['numeroProducto']=this.productoCertificado.value
    this.services.generateCertification(data).subscribe({
      next:(x:any)=>{
      // console.log('entre a success')
    this.file = new Blob([x], { type: 'application/pdf' });
    // this.pdfTerminos = new Blob([x]), {type: 'text/html'}
     this.fileURL = URL.createObjectURL(this.file);
    // window.open(this.fileURL);
    this.loadingCtrl.dismiss()
    FileSaver.saveAs(this.file,'Certificado producto');
      },error:(error:any)=>{
        this.loadingCtrl.dismiss()
        // console.log('me fui por el error')
      }
    })
  }else{
    this.presentAlert('Selecciona un producto para generar certificado')
  }
 
}
documentos(){
  this.router.navigateByUrl('tab3')
}
SeleccionDoc(id:any){
if(id ==1){
  this.btn1 = true
}else{
  this.btn1= false
}
}

fechas(){
  console.log('entra avalidar fecha')
  const fecha = new Date();
  this.mesActual= new Date().getMonth() + 1;
  this.anioActual = fecha.getFullYear();
console.log('mes', this.anioActual, this.mesActual)

 for(let m of this.monthList){
  if(this.formDate.controls['anio'].value < this.anioActual){
    m.disabled = false
  }else if(this.formDate.controls['anio'].value == this.anioActual){
    if(m.number > this.mesActual){
      m.disabled =true
    }
  }
 }
}
}
