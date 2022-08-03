import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ServicesService } from '../services/services.service';
import { ConverterService } from '../services/converter.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage extends ConverterService implements OnInit{
  cliente:any
  menus=[
    {
      'name':'tab1',
      'icon':'bag',
      'label':'Productos'
    },
    {
      'name':'tab2',
      'icon':'document-text',
      'label':'Documentos'
    },
    // {
    //   'name':'tab3',
    //   'icon':'mail-open',
    //   'label':'PQR'
    // },
  ]
productos=true
  constructor(
    private router:Router,
    private activatedRoute: ActivatedRoute,
    private loadingController: LoadingController,
    private services: ServicesService
  ) {
    super()
  }

  ngOnInit() {
    let temp:any = sessionStorage.getItem('cliente')
    let temp2 =JSON.parse(temp)
    this.cliente = JSON.parse(this.decrypt(temp2['data']))
    this.router.navigate(['tab1'], {relativeTo: this.activatedRoute});
   this.services.subject.subscribe({
    next:(x:any)=>{
      
      if(x == 1){
        this.productos = false
      }else{
        this.productos = true
      }
    }
   })
  }
 

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: null,
      duration: 5000,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
  }
  
}
