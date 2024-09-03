import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListImoveisRoutingModule } from './list-imoveis-routing.module';
import { ListImoveisComponent } from './list-imoveis/list-imoveis.component';
import { ConexaoApiService } from '../appcore/conexao-api.service';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxMaskModule } from 'ngx-mask';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [
    ListImoveisComponent,
  ],
  imports: [
    CommonModule,
    ListImoveisRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxMaskModule.forRoot(),
    RouterModule,
    NgSelectModule,
    DataTablesModule,
    ReactiveFormsModule,
    NgSelectModule, 
    FormsModule
  ],
  exports:[ListImoveisComponent]
})
export class ListImoveisModule { }
