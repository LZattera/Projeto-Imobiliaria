import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioListComponent } from './usuario-list/usuario-list.component';
import { UsuarioViewComponent } from './usuario-view/usuario-view.component';
import { NgxMaskModule } from 'ngx-mask';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxCurrencyModule } from "ngx-currency";
import { NgSelectModule } from '@ng-select/ng-select';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [ UsuarioListComponent , UsuarioViewComponent],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxMaskModule.forRoot(),
    NgxCurrencyModule,
    NgSelectModule,
    DataTablesModule,
  ]
})
export class UsuarioModule { }
