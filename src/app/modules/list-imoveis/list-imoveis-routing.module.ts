import { DescricaoImoveisComponent } from './../desccricao-imoveis/descricao-imoveis/descricao-imoveis.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListImoveisComponent } from './list-imoveis/list-imoveis.component';

const routes: Routes = [{
  path:'listagem',
  component: ListImoveisComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListImoveisRoutingModule { }
