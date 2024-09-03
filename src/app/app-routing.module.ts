import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [

  {
    path: 'appcore',
    loadChildren:  () => import('./modules/appcore/appcore.module').then(m => m.AppcoreModule),
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
