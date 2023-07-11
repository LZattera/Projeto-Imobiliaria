import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { EmpresaRoutingModule } from './empresa-routing.module';
import { EmpresaViewComponent } from './empresa-view/empresa-view.component';
import { NgxMaskModule } from 'ngx-mask';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CidadeModule } from './../../../shared/components/cidade/cidade.module';
import { NgPopupsModule } from 'ng-popups';

@NgModule({
  declarations: [EmpresaViewComponent],
  imports: [
    CommonModule,
    EmpresaRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxMaskModule.forRoot(),
    RouterModule,
    CidadeModule,
    NgPopupsModule.forRoot(),
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  
})
export class EmpresaModule { }
