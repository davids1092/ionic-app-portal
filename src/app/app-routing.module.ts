import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'recuperar-contraseña',
    loadChildren: () => import('./components/recuperar-contrasena/recuperar-contrasena.module').then(m => m.RecuperarContrasenaModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {path:'', pathMatch:'full', redirectTo:'login'},
  {path:'**', pathMatch:'full', redirectTo:'login'},
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
