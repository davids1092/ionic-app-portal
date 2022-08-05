import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { ServicesService } from 'src/app/services/services.service';
import { ConverterService } from '../../../services/converter.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent extends ConverterService implements OnInit {
  formRecover1:FormGroup
  constructor(
    private router:Router,
    private _formBuilder:FormBuilder,
    private services : ServicesService,
    private loadingCtrl: LoadingController,
    private alertController: AlertController,
    private modalCtrl: ModalController,
  ) { 
    super()
   
  }
  cliente:any
  identificacion:any
  tipoIdentificacion
  ngOnInit() {
    this.formRecover1 = this._formBuilder.group({
      password1:  ['', [Validators.required]],
      password2: ['', [Validators.required]],
    });
    let temp:any = sessionStorage.getItem('cliente')
    let temp2 =JSON.parse(temp)
    this.cliente = JSON.parse(this.decrypt(temp2['data']))
    this.identificacion = this.cliente.identification
    this.tipoIdentificacion = this.cliente.typeDocument
  }
  cancel(){
    this.router.navigateByUrl('login')
  }
  recovery(){
    // console.log('dddd', this.formRecover1.value, this.formRecover1.valid)
    if(this.formRecover1.valid){
      if(this.formRecover1.controls['password1'].value == this.formRecover1.controls['password2'].value){
        this.showLoading('Un momento por favor..')
        let data :any={}
        data['identificacion'] = this.identificacion
        data['newPassword']= this.formRecover1.controls['password1'].value 
        
        this.services.cambioContrasenia(data).subscribe({
          next:(x:any)=>{
            this.loadingCtrl.dismiss()
            this.presentAlert()
          },
          error:(error:any)=>{
            let errorDesencriptado = JSON.parse(this.decrypt(error.error['data']))
            this.loadingCtrl.dismiss()
            this.presentAlertError(errorDesencriptado.descripcion)
            this.formRecover1.reset()
          }
        })
      }else{
        this.presentAlertError1('Las contraseñas ingresadas no coinciden')
        this.formRecover1.reset()
      }
    }else{
      this.presentAlertError1('Completa los campos por favor')
    }
    
  }
  async showLoading(message) {
    const loading = await this.loadingCtrl.create({
      message: message,
      // duration: 3000
    });
    
    loading.present();
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: '¡¡Contraseña cambiada con exito!!',
      // message: '¡recuerda cambiar está contraseña!',
      buttons: [{
        text : 'Ok',
        handler: () => {
          this.router.navigate(['/home']);
          this.modalCtrl.dismiss();
        },
      }],
    });

    await alert.present();
  }
  async presentAlertError(message) {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: message,
      message: 'Intentalo nuevamente',
      buttons: [{
        text : 'Ok',
        handler: () => {
          this.router.navigateByUrl('login')
        },
      }],
    });

    await alert.present();
  }
  async presentAlertError1(message) {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: message,
      message: 'Intentalo nuevamente',
      buttons: ['OK']
    });

    await alert.present();
  }
prueba(event){
  console.log(this.formRecover1.value , event)
}
}
