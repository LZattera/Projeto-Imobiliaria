import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardgraficosComponent } from './dashboardgraficos/dashboardgraficos.component';

const routes: Routes = [{
  path: '',
  component: DashboardgraficosComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardgraficosRoutingModule { }
