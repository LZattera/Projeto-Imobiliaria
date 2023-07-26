import { SharedModule } from './../../../shared/shared.module';
import { LoadingComponent } from './../../../shared/components/loading/loading.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CadastrosRoutingModule } from './cadastros-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxMaskModule } from 'ngx-mask';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgPopupsModule } from 'ng-popups';
import { DataTablesModule } from "angular-datatables";
import { TreeModule } from '@circlon/angular-tree-component';
import { CondicaopagamentoComponent } from './condicaopagamento/condicaopagamento.component';
import { NcmComponent } from './ncm/ncm.component';
import { RepresentanteComponent } from './representante/representante.component';
import { ProdutoComponent } from './produto/produto.component';
import { ClientesComponent } from './clientes/clientes.component';
import { TabelaComponent } from './tabela/tabela.component';
import { TabelaProdutoComponent } from './tabela/tabela-produto/tabela-produto.component';
import { ProdutosViewComponent } from './produto/produtos-view/produtos-view.component';
import { IntegracaoerpComponent } from './integracaoerp/integracaoerp.component';
import { VariavelComponent } from './variavel/variavel.component';
import { SetorComponent } from './setor/setor.component';
import { TipoComponent } from './tipo/tipo.component';
import { ClientesVwComponent } from './clientes/clientes-vw/clientes-vw.component';
import { AbaVariaveisComponent } from './clientes/clientes-vw/aba-variaveis/aba-variaveis.component';


@NgModule({
  declarations: [
    CondicaopagamentoComponent,
    NcmComponent,
    RepresentanteComponent,
    ProdutoComponent,
    ClientesComponent,
    TabelaComponent,
    TabelaProdutoComponent,
    ProdutosViewComponent,
    IntegracaoerpComponent,
    VariavelComponent,
    SetorComponent,
    TipoComponent,
    ClientesVwComponent,
    AbaVariaveisComponent,
    
  ],
  imports: [
    CommonModule,
    CadastrosRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    NgxMaskModule.forRoot(),
    RouterModule,
    NgSelectModule,
    
    NgPopupsModule.forRoot({
      okButtonText: 'Sim',
      cancelButtonText: 'Não',
      titles: {
        alert: 'Aviso!',
        confirm: 'Confirmação',
        // prompt: 'Website asks...'
      }
    }),
    DataTablesModule,
    TreeModule,
    SharedModule,
    
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class CadastrosModule { }
