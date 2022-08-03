import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { IngresoGuard } from './services/ingreso.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule),
    
  },
  {
    path: 'recuperar-contraseña',
    loadChildren: () => import('./components/recuperar-contrasena/recuperar-contrasena.module').then(m => m.RecuperarContrasenaModule),
      
  },
  {
    path: 'tab3',
    loadChildren: () => import('./tab3/tab3.module').then(m => m.Tab3PageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate:[IngresoGuard]
  },
  {path:'', pathMatch:'full', redirectTo:'login'},
  {path:'**', pathMatch:'full', redirectTo:'login'},
];
@NgModule({
 
    imports: [RouterModule.forRoot(routes, {useHash:true})],
    exports: [RouterModule]
  

})
export class AppRoutingModule {}
