import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardgraficosRoutingModule } from './dashboardgraficos-routing.module';
import { DashboardgraficosComponent } from './dashboardgraficos/dashboardgraficos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgPopupsModule } from 'ng-popups';
import { NgxMaskModule } from 'ngx-mask';
import { NgxPaginationModule } from 'ngx-pagination';
import { FlatpickrComponent } from 'src/app/shared/components/flatpickr-component/flatpickr.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    DashboardgraficosComponent
  ],
  imports: [
    CommonModule,
    DashboardgraficosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    NgSelectModule,
    NgxPaginationModule,
    NgPopupsModule.forRoot(),
    FlatpickrComponent,
    SharedModule
  ]
})
export class DashboardgraficosModule { }
