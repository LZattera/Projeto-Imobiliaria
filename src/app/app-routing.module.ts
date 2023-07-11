import { AuthGuard } from './core/guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren:  () => import('./modules/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'appcore',
    loadChildren:  () => import('./modules/appcore/appcore.module').then(m => m.AppcoreModule),
    canActivate: [AuthGuard],
  },
  {
    path: '',
    redirectTo: '/appcore',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
