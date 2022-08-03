import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ConverterService } from './converter.service';
import { TokenService } from './token.service';
const sigla = "KPG"
var TOKEN: string = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiYmFua3Zpc2lvbiJdLCJ1c2VyX25hbWUiOiJLUEciLCJzY29wZSI6WyJ0cnVzdCIsInJlYWQiLCJ3cml0ZSJdLCJleHAiOjE2ODAxMDc4NjEsImF1dGhvcml0aWVzIjpbIlJPTEVfVVNFUiJdLCJqdGkiOiJlMGJmMjdjNy0wZGI2LTQ0YTgtOWMwNi1hYzYzODdjM2YzMWMiLCJjbGllbnRfaWQiOiJiYW5rdmlzaW9uIn0.WxobuMP98hS1c4jrwzcTfe-si1-Awny4i0nrAZMS9sIy54SaOuvnu_ektpBEFt4Uzjg44SiXpjOILpkKKLS_p4Xl-oIcrlsLawWA2kYCeh86rkDRZub8Lov17kCG8IsJkP7N5auTeRaFC1ww57ve99R5IT_RVBdL8Bj8VI-R0yo7T0dr_4YjXb0tm1yhy2OHMoih1_MRuS9mrcPf2BB-fQw9VG82JcKCkdb71ENpjEKuq9hPgn3OgW6RvANurjl5iHM-3nqyW0XRIelc_DA4fkZY68bbN0pFnPpUxeltLEueuuYH9dlgcL30SULBV4tO09eCzI_s4hBrYHdO1APbzQ';

var httpOptions = {
  headers: new HttpHeaders({
    Authorization: 'Bearer ' + TOKEN
  })
}

var httpOptions1:any = {
  headers: new HttpHeaders({
  
  'Authorization': `Bearer ${TOKEN}`,
  
  }),
  
  responseType: 'arraybuffer'
  
  };



@Injectable({
  providedIn: 'root'
})
export class ServicesService extends ConverterService {
  creditosProduct:any =''
  basicData:any;
  subject = new Subject<number>();
  HttpUrl: any = environment.HttpUrl;
  HttpUrl2: any = 'https://certificacion.bankvision.com/'
  constructor(private http: HttpClient, private tokenServ: TokenService) { 
    super()
    sessionStorage.setItem("token" + sigla, 'Bearer ' + TOKEN);
    this.getHttpOptions();
  }
  async setToken(_callback: any) {
    
    await this.tokenServ.getToken(sigla, (result: string) => {
      httpOptions.headers = new HttpHeaders({
        Authorization: `Bearer ${result}`
      });
      TOKEN = 'Bearer ' + result;
      sessionStorage.setItem("token" + sigla, result);
      _callback();
    });
  }
  async setToken1(_callback: any) {
   
    await this.tokenServ.getToken(sigla, (result: string) => {
      TOKEN = 'Bearer ' + result;
      httpOptions1.headers = new HttpHeaders({
        Authorization: `Bearer ${result}`,
      }),
        TOKEN = 'Bearer ' + result;
      sessionStorage.setItem("token" + sigla, result);

      _callback();

    });
  }

    getHttpOptions() {
      this.setToken(res => {}).then(() => {
        return httpOptions;
      });
      // } 
      return httpOptions;
    }
  
  getHttpOptions1() {
    this.setToken1(res => {}).then(() => {
      // console.log("entreaqui")
      return httpOptions;
    });
    
 
    
    return httpOptions1;
    
    }

  saveBasicData(option:any){
    this.basicData = option
  }

    getBasicData(){
      return this.basicData;
    }

  recuperarContrasenia(data: JSON) {
    let dataE = this.encrypt(JSON.stringify(data))
    return this.http.post(`${this.HttpUrl}keypago/kpg/recoveryPassword`, dataE, this.getHttpOptions())
  }

  login(data: JSON){
    let dataE = this.encrypt(JSON.stringify(data))
    return this.http.post(`${this.HttpUrl}keypago/kpg/login`, dataE, this.getHttpOptions())
  }

  cambioContrasenia(data: JSON){
    let dataE = this.encrypt(JSON.stringify(data))
    return this.http.post(`${this.HttpUrl}keypago/kpg/cambiarContrasena`, dataE, this.getHttpOptions())
  }

  guardarSolicitud(data: any, descripcion:string, tipo:string, identificacion:number){
    return this.http.post(`${this.HttpUrl}keypago-pqrs/solicitud-pqrs/guardarSolicitud?descripcionSolicitud=${descripcion}&tipoSolicitud=${tipo}&identificationClient=${identificacion}`, data, this.getHttpOptions())
  }

  cupo(data: any){
    let dataE = this.encrypt(JSON.stringify(data))
    return this.http.post(`${this.HttpUrl}keypago/kpg/getCupoUser`, dataE, this.getHttpOptions())
  }

  creditos(data:any){
    let dataE = this.encrypt(JSON.stringify(data))
    return this.http.post(`${this.HttpUrl}keypago/kpg/getCreditosUser`, dataE, this.getHttpOptions())
  }

  movimiento(data:any){
    let dataE = this.encrypt(JSON.stringify(data))
    return this.http.post(`${this.HttpUrl}keypago/kpg/getMovimientosCredito`, dataE, this.getHttpOptions())
  }

  generatePazysalvo(user:any){
    let dataE = this.encrypt(JSON.stringify(user))
    return this.http.post(`${this.HttpUrl}keypago/key-pago-files-url/generatePazysalvo`,dataE, this.getHttpOptions1());
    
    }
    
    generateCertification(user:any){
    let dataE = this.encrypt(JSON.stringify(user))
    return this.http.post(`${this.HttpUrl}keypago/key-pago-files-url/generateCertification`,dataE, this.getHttpOptions1());
  }
  saveCredits(productos:any){
    for (let index of this.creditosProduct) {
      this.creditosProduct.pop() 
      }
      this.creditosProduct = [];
    this.creditosProduct = productos
    console.log('creditos en servicio', this.creditosProduct)
  }
  getCredits(){
    return this.creditosProduct 
  }

  generateExtracto(user: any) {
    let dataE = this.encrypt(JSON.stringify(user))
    return this.http.post(`${this.HttpUrl}keypago/key-pago-files-url/generateExtracto`, dataE, this.getHttpOptions1());
  }

}
