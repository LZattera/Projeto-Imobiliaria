import { FlatpickrComponent } from './../../../shared/components/flatpickr-component/flatpickr.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgPopupsModule } from 'ng-popups';
import { PrincipalComponent } from './principal/principal.component';
@NgModule({
  declarations: [
    PrincipalComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    NgSelectModule,
    NgxPaginationModule,
    NgPopupsModule.forRoot(),
    FlatpickrComponent,
    
  ]
})
export class DashboardModule { }
