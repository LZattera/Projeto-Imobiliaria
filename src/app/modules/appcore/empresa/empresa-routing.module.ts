import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmpresaViewComponent } from './empresa-view/empresa-view.component';
import { EmpresaModule } from './empresa.module';

const routes: Routes = [
  {
    path: '',
    component: EmpresaViewComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  
exports: [RouterModule]
})
export class EmpresaRoutingModule { }
