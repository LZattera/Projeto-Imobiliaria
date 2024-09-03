import { NgModule } from '@angular/core';

import { AppcoreComponent } from './appcore.component';
import { Routes, RouterModule } from '@angular/router';
import {ListImoveisComponent} from '../list-imoveis/list-imoveis/list-imoveis.component'
import { DescricaoImoveisComponent } from '../desccricao-imoveis/descricao-imoveis/descricao-imoveis.component';

const routes: Routes = [ {
  path: '',
  component: AppcoreComponent,
},
{
  path: 'appcore',
  component: AppcoreComponent,
},
{
  path: 'listagem',
  component: ListImoveisComponent,
},
{
  path: 'descricao',
  component: DescricaoImoveisComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppcoreRoutingModule { }
 