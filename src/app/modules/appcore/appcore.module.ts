import { ListImoveisModule } from './../list-imoveis/list-imoveis.module';
import { DesccricaoImoveisModule } from './../desccricao-imoveis/desccricao-imoveis.module';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppcoreRoutingModule } from './appcore-routing.module';
import { AppcoreComponent } from './appcore.component';

import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxMaskModule } from 'ngx-mask';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataTablesModule } from "angular-datatables";
import { ConexaoApiService } from './conexao-api.service';

@NgModule({
  declarations: [
    AppcoreComponent,
  ],
  imports: [
    AppcoreRoutingModule,
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    NgxMaskModule.forRoot(),
    RouterModule,
    NgSelectModule,
    DataTablesModule,
    ReactiveFormsModule,
    NgSelectModule, 
    ListImoveisModule,
    DesccricaoImoveisModule
  ],
  providers: [ConexaoApiService],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppcoreModule { }
