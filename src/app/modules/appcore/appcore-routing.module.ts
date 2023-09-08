import { NgModule } from '@angular/core';

import { AppcoreComponent } from './appcore.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [ {
  path: '',
  component: AppcoreComponent,
  children: [
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) 
  },
  {
    path: 'empresa',
    loadChildren: () => import('./empresa/empresa.module').then(m => m.EmpresaModule) 
  },

  {
    path: 'usuario',
    loadChildren: () => import('./usuario/usuario.module').then(m => m.UsuarioModule) 
  },
  {
    path: 'cadastros',
    loadChildren: () => import('./cadastros/cadastros.module').then(m => m.CadastrosModule) 
  },
  {
    path: 'pedidos',
    loadChildren: () => import('./pedidos/pedidos.module').then(m => m.PedidosModule) 
  },
  {
    path: 'monitoramento',
    loadChildren: () => import('./monitoramento/monitoramento.module').then(m => m.MonitoramentoModule) 
  },
  {
    path: 'dashboardgraficos',
    loadChildren: () => import('./dashboardgraficos/dashboardgraficos.module').then(m => m.DashboardgraficosModule) 
  },

]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppcoreRoutingModule { }
 