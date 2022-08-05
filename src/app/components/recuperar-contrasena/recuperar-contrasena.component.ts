import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.component.html',
  styleUrls: ['./recuperar-contrasena.component.scss'],
})
export class RecuperarContrasenaComponent implements OnInit {
  formRecover:FormGroup
  constructor(
    private router:Router,
    private _formBuilder:FormBuilder,
    private services : ServicesService,
    private loadingCtrl: LoadingController,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
    this.formRecover = this._formBuilder.group({
      user: ["", [Validators.required]],
      email: ["", [Validators.required]],
      /* captcha: ["", [Validators.required]] */
    });
  }
  cancel(){
    this.router.navigateByUrl('login')
  }
  recovery(){
    this.showLoading('Un momento por favor..')
    let data :any={}
    data['identificacion']=this.formRecover.controls['user'].value
      data['email'] = this.formRecover.controls['email'].value
    this.services.recuperarContrasenia(data).subscribe({
      next:(x:any)=>{
        this.loadingCtrl.dismiss()
        this.presentAlert()
      },
      error:(error:any)=>{
        this.loadingCtrl.dismiss()
        this.presentAlertError()
      }
    })
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
      subHeader: 'Al correo electrónico se enviará una clave temporal con vigencia de 5 minutos',
      message: '¡recuerda cambiar está contraseña!',
      buttons: [{
        text : 'Ok',
        handler: () => {
          this.router.navigateByUrl('login')
        },
      }],
    });

    await alert.present();
  }
  async presentAlertError() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Error al recuperar contraseña',
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
}
