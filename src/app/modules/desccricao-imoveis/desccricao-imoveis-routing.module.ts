import { DescricaoImoveisComponent } from './descricao-imoveis/descricao-imoveis.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path:'descricao',
  component: DescricaoImoveisComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesccricaoImoveisRoutingModule { }
