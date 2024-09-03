import { NgModule } from '@angular/core';

import { DesccricaoImoveisRoutingModule } from './desccricao-imoveis-routing.module';
import { DescricaoImoveisComponent } from './descricao-imoveis/descricao-imoveis.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxMaskModule } from 'ngx-mask';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataTablesModule } from 'angular-datatables';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [
    DescricaoImoveisComponent
  ],
  imports: [
    CommonModule,
    DesccricaoImoveisRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxMaskModule.forRoot(),
    RouterModule,
    NgSelectModule,
    DataTablesModule,
    ReactiveFormsModule,
    NgSelectModule,
    FormsModule, 
    IonicModule,
  ],

})
export class DesccricaoImoveisModule { }
