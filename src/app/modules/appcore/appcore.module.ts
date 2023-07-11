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
    DataTablesModule
  ],
  providers: [],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppcoreModule { }
