import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  menus=[
    {
      'name':'tab1',
      'icon':'bag-outline',
      'label':'Productos'
    },
    {
      'name':'tab2',
      'icon':'document-text-outline',
      'label':'Documentos'
    },
    {
      'name':'tab3',
      'icon':'mail-open-outline',
      'label':'PQR'
    },
  ]

  constructor(
    private router:Router,
    private activatedRoute: ActivatedRoute,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.router.navigate(['tab1'], {relativeTo: this.activatedRoute});
    this.presentLoading()
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando Productos...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
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
