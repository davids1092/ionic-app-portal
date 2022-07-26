import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServicesService } from 'src/app/services/services.service';
import { ConverterService } from '../../services/converter.service';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { Filesystem, Directory, Encoding, FilesystemDirectory, FilesystemEncoding } from '@capacitor/filesystem';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends ConverterService implements OnInit {
  formLogin:FormGroup
  spinner = false
  constructor(
    private router: Router,
    private _formBuilder:FormBuilder,
    private servicio : ServicesService,
    private navCtrl: NavController,
    private alertController: AlertController,
    private modalCtrl: ModalController,
    // private file: File
  ) {
    super()
   }

  ngOnInit() {
  
    // this.openModalChangePass()
    this.formLogin = this._formBuilder.group({
      cedula: ["", [Validators.required]],
      password: ["", [Validators.required]],
      /* captcha: ["", [Validators.required]] */
    });
  }
  // fileWrite() {
  //   try { 
  //     Filesystem.writeFile({
  //       path: 'pdffile.png',
  //       data: img,
  //       directory: Directory.Documents,
  //       encoding: Encoding.UTF8
  //     });
  //     alert('entro3')
  //   } catch(e) {
  //     alert('fallo')
  //     console.error('Unable to write file', e);
  //   }
  // }
  recuperarContrasena(){
    this.router.navigateByUrl('recuperar-contraseña')
  }
  goHome(){
    this.router.navigateByUrl('home')
  }
  login(){
    if(this.formLogin.valid){
      this.spinner = true
      let data: any = {};
      data['username']=this.formLogin.controls['cedula'].value
      data['password'] = this.formLogin.controls['password'].value

      this.servicio.login(data).subscribe({
        next:(x:any)=>{
          let response :any = JSON.parse(this.decrypt(x['data']));
          let autogenerada:any = response.cliente.passwordAutogenerada
          let cliente:any = response.cliente
          let cliente1:any=this.encrypt(JSON.stringify(cliente))

          this.servicio.saveBasicData(cliente)

          sessionStorage.setItem('cliente', JSON.stringify(cliente1))
          if(autogenerada == true){
            console.log('entre a autogenerada')
            this.openModalChangePass()
            this.formLogin.reset()
            this.spinner = false
          }else{
            console.log('entre fuera autogenerada')
            this.formLogin.reset()
            // this.router.navigateByUrl('home')
            this.router.navigate(['/home']);
            this.spinner = false
            // this.spinner=true
            //   setTimeout(() => {
            //     this.routing.navigateByUrl("portal-transaccional/productos")
            //     this.spinner=false
            //   }, 1000);
          }
        }, error:(error:any) =>{
          let errorDesencriptado = JSON.parse(this.decrypt(error.error['data']))
          this.spinner= false
          // this.alertCustomError(errorDesencriptado.descripcion);
          this.presentAlert(errorDesencriptado.descripcion)
          
        }
      })

    }else{
      this.presentAlert('Completa los campos')
    }
  }
  async presentAlert(message) {
    const alert = await this.alertController.create({
      header: 'Alert',
      // subHeader: 'Important message',
      message: message,
      buttons: ['OK']
    });
  
    await alert.present();
  }
  async openModalChangePass() {
    const modal = await this.modalCtrl.create({
      component: ChangePasswordComponent,
      
    });
    modal.present();
  
    const { data, role } = await modal.onWillDismiss();
  
  }
 
}
