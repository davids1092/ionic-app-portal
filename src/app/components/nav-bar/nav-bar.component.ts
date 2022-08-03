import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ServicesService } from '../../services/services.service';
import { ConverterService } from '../../services/converter.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent extends ConverterService implements OnInit {
darkMode:any
roleMessage =''
cliente:any
  constructor(
    private router:Router,
    private alertController: AlertController,
    private services: ServicesService
  ) {
    super()
   }

  ngOnInit() {
    let temp:any = sessionStorage.getItem('cliente')
    let temp2 =JSON.parse(temp)
    this.cliente = JSON.parse(this.decrypt(temp2['data']))
  }
  
salir(){

this.router.navigateByUrl('login')
sessionStorage.clear()
this.services.saveCredits([])

}
async presentAlert() {
  const alert = await this.alertController.create({
    header: 'Alert!',
    message: 'Desea salir',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {  }
      },
      {
        text: 'Si',
        role: 'confirm',
        handler: () => { this.salir()}
      }
    ]
  });

  await alert.present();

  const { role } = await alert.onDidDismiss();
  this.roleMessage = `Dismissed with role: ${role}`;
}


}
