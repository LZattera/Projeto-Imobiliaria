import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonitoramentoRoutingModule } from './monitoramento-routing.module';
import { MonitoramentoComponent } from './monitoramento/monitoramento.component';
import { FiltrosmonitoramentoComponent } from './monitoramento/filtrosmonitoramento/filtrosmonitoramento.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxCurrencyModule } from 'ngx-currency';
import { DataTablesModule } from 'angular-datatables';
import { NgPopupsModule } from 'ng-popups';
import { FlatpickrComponent } from 'src/app/shared/components/flatpickr-component/flatpickr.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { RouterModule } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    MonitoramentoComponent,
    FiltrosmonitoramentoComponent
  ],
  imports: [
    CommonModule,
    MonitoramentoRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
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
    SharedModule,
    NgxCurrencyModule,
    NgxMaskModule.forRoot(),
  ],
})
export class MonitoramentoModule { }
