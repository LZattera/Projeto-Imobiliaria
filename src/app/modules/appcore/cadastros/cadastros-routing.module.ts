import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NcmComponent } from './ncm/ncm.component';
import { RepresentanteComponent } from './representante/representante.component';
import { ProdutoComponent } from './produto/produto.component';
import { ClientesComponent } from './clientes/clientes.component';
import { TabelaComponent } from './tabela/tabela.component';
import { IntegracaoerpComponent } from './integracaoerp/integracaoerp.component';
import { VariavelComponent } from './variavel/variavel.component';
import { TipoComponent } from './tipo/tipo.component';
import { SetorComponent } from './setor/setor.component';

const routes: Routes = [
  

  {
    path: 'variavel',
    component: VariavelComponent
  },
  {
    path: 'tipo',
    component: TipoComponent
  },
  {
    path: 'setor',
    component: SetorComponent
  },
  {
    path: 'ncm',
    component: NcmComponent
  },
  {
    path: 'representantes',
    component: RepresentanteComponent
  },
  {
    path: 'produtos',
    component: ProdutoComponent
  },
  {
    path: 'clientes',
    component: ClientesComponent
  },
  {
    path: 'tabela',
    component: TabelaComponent
  },
  {
    path: 'integracaoerp',
    component: IntegracaoerpComponent
  }
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastrosRoutingModule { }
