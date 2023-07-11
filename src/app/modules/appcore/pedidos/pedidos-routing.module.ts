import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PedidosListComponent } from './pedidos-list/pedidos-list.component';
import { PedidosViewComponent } from './pedidos-view/pedidos-view.component';

const routes: Routes = [
  {
    path: '',
    component: PedidosListComponent
  },
  {
    path: 'view',
    component: PedidosViewComponent
  },
  {
    path: 'view/:id',
    component: PedidosViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidosRoutingModule { }
