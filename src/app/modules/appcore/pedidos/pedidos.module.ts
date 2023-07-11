import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedidosRoutingModule } from './pedidos-routing.module';
import { PedidosViewComponent } from './pedidos-view/pedidos-view.component';
import { PedidosListComponent } from './pedidos-list/pedidos-list.component';
import { FiltrospedidoComponent } from './pedidos-list/filtrospedido/filtrospedido.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TreeModule } from '@circlon/angular-tree-component';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataTablesModule } from 'angular-datatables';
import { NgPopupsModule } from 'ng-popups';
import { NgxMaskModule } from 'ngx-mask';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from 'src/app/shared/shared.module';
import { PedidoItemComponent } from './pedidos-view/pedido-item/pedido-item.component';
import { AbaPedidoItemComponent } from './pedidos-view/aba-pedido-item/aba-pedido-item.component';
import { FlatpickrComponent } from 'src/app/shared/components/flatpickr-component/flatpickr.component';
import { NgxCurrencyModule } from 'ngx-currency';


@NgModule({
  declarations: [
    PedidosViewComponent,
    PedidosListComponent,
    FiltrospedidoComponent,
    PedidoItemComponent,
    AbaPedidoItemComponent,
  ],
  imports: [
    CommonModule,
    PedidosRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    NgxMaskModule.forRoot(),
    RouterModule,
    NgSelectModule,
    FlatpickrComponent,
    NgPopupsModule.forRoot({
      okButtonText: 'Sim',
      cancelButtonText: 'Não',
      titles: {
        alert: 'Aviso!',
        confirm: 'Confirmação',
        // prompt: 'Website asks...'
      }
    }),
    DataTablesModule,
    TreeModule,
    NgxCurrencyModule,
    SharedModule,
  ]
})
export class PedidosModule { }
