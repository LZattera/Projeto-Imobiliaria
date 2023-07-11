import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FotosComponent } from './fotos/fotos.component';


@NgModule({
  declarations: [FotosComponent],
  imports: [
    CommonModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports: [
    FotosComponent
    
  ],
})
export class FotosItensModule { }
