import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioListComponent } from './usuario-list/usuario-list.component';
import { UsuarioViewComponent } from './usuario-view/usuario-view.component';
const routes: Routes = [
  {
    path: '',
    component: UsuarioListComponent
  },
  {
    path: 'view',
    component: UsuarioViewComponent
  },
  {
    path: 'view/:id',
    component: UsuarioViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  
exports: [RouterModule]
})
export class UsuarioRoutingModule { }
