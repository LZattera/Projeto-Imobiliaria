import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CidadeComponent } from './cidade/cidade.component';

import { NgxMaskModule } from 'ngx-mask';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  declarations: [CidadeComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxMaskModule.forRoot()
  ],
  exports: [
    CidadeComponent,
    
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class CidadeModule { }
