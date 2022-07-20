import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.router.navigate(['tab1'], {relativeTo: this.activatedRoute});
  }
}
