import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page implements OnInit {
  peticion=[
  {
    'valor':'Peticion',
    'visual':'Petición'
  },
  {
    'valor':'Queja',
    'visual':'Queja'
  },
  {
    'valor':'Felicitacion',
    'visual':'Felicitación'
  },
  ]
  nameFile='Selecciona documento(opcional)'
  constructor() {}
  ngOnInit(): void {}
}
