import { environment } from './../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CadastrosService {
  listaAtivoSistemas() {
    throw new Error('Method not implemented.');
  }

  constructor(
    private http: HttpClient
  ) { }

  
  listarVariavel(page,limit,filter): Observable<any> {
    let params = new HttpParams();
    params = params.append('page', page);
    params = params.append('count', limit);
    params = params.append('search', filter);
    if(filter != ""){
      params = params.append('filter', filter);
    } 
    return this.http.get(environment.apiUrl +'variavel/list', { params: params } );
  }
  
  ativarVariavel(id: number): Observable<any> {
    return this.http.put(environment.apiUrl+'variavel/ativar/'+id,{});
  }

  saveVariavel(dados): Observable<any> {
    return this.http.post(environment.apiUrl +'variavel/save', dados);
  }

  buscarVariavel(id): Observable<any> {
    return this.http.get(environment.apiUrl +'variavel/get/'+id);
  }

    
  listaAtivoVariavel(): Observable<any> {
    return this.http.get(environment.apiUrl +'variavel/listAtivo');
  }



  listarTipo(page,limit,filter): Observable<any> {
    let params = new HttpParams();
    params = params.append('page', page);
    params = params.append('count', limit);
    params = params.append('search', filter);
    if(filter != ""){
      params = params.append('filter', filter);
    } 
    return this.http.get(environment.apiUrl +'tipo/list', { params: params } );
  }
  
  ativarTipo(id: number): Observable<any> {
    return this.http.put(environment.apiUrl+'tipo/ativar/'+id,{});
  }

  saveTipo(dados): Observable<any> {
    return this.http.post(environment.apiUrl +'tipo/save', dados);
  }

  buscarTipo(id): Observable<any> {
    return this.http.get(environment.apiUrl +'tipo/get/'+id);
  }

  deleteTipo(id): Observable<any> {
    return this.http.delete(environment.apiUrl +'tipo/delete/'+id);
  }

    
  listaAtivoTipo(): Observable<any> {
    return this.http.get(environment.apiUrl +'tipo/listAtivo');
  }
  
  
  
  
  listarSetor(page,limit,filter): Observable<any> {
    let params = new HttpParams();
    params = params.append('page', page);
    params = params.append('count', limit);
    params = params.append('search', filter);
    if(filter != ""){
      params = params.append('filter', filter);
    } 
    return this.http.get(environment.apiUrl +'setor/list', { params: params } );
  }
  
  ativarSetor(id: number): Observable<any> {
    return this.http.put(environment.apiUrl+'setor/ativar/'+id,{});
  }

  saveSetor(dados): Observable<any> {
    return this.http.post(environment.apiUrl +'setor/save', dados);
  }

  buscarSetor(id): Observable<any> {
    return this.http.get(environment.apiUrl +'setor/get/'+id);
  }

  deleteSetor(id): Observable<any> {
    return this.http.delete(environment.apiUrl +'setor/delete/'+id);
  }

    
  listaAtivoSetor(): Observable<any> {
    return this.http.get(environment.apiUrl +'setor/listAtivo');
  }


  // //CADASTROS DE ATIVIDADES
  
  listarCondicaoPagamento(idEmpresa, page,limit,filter): Observable<any> {
    let params = new HttpParams();
    params = params.append('idEmpresa', idEmpresa);
    params = params.append('page', page);
    params = params.append('count', limit);
    params = params.append('search', filter);
    if(filter != ""){
      params = params.append('filter', filter);
    } 
    return this.http.get(environment.apiUrl +'condicaopagamento/list', { params: params } );
  }
  
  
  
  
  
  listaAtivoCondicaoPagamento(): Observable<any> {
    return this.http.get(environment.apiUrl +'condicaopagamento/listAtivo');
  }

  listarNcm(idEmpresa, page,limit,filter): Observable<any> {
    let params = new HttpParams();
    params = params.append('idEmpresa', idEmpresa);
    params = params.append('page', page);
    params = params.append('count', limit);
    params = params.append('search', filter);
    if(filter != ""){
      params = params.append('filter', filter);
    } 
    return this.http.get(environment.apiUrl +'ncm/list', { params: params } );
  }
  listNcm(idEmpresa): Observable<any> {
    return this.http.get(environment.apiUrl +'ncm/listarNcm/'+idEmpresa);
  }
  
  listarRepresentantes(idEmpresa, page,limit,filter): Observable<any> {
    let params = new HttpParams();
    params = params.append('idEmpresa', idEmpresa);
    params = params.append('page', page);
    params = params.append('count', limit);
    params = params.append('search', filter);
    if(filter != ""){
      params = params.append('filter', filter);
    } 
    return this.http.get(environment.apiUrl +'representantes/list', { params: params } );
  }
  listRepresentantes(idEmpresa): Observable<any> {
    let params = new HttpParams();
    params = params.append('idEmpresa', idEmpresa);

    return this.http.get(environment.apiUrl +'representantes/listarRepresentantes', { params: params } );
  }
  
  buscarClientes(id): Observable <any>{
    return this.http.get(environment.apiUrl + 'Clientes/get/'+id);
  }

  listarClientes(idEmpresa, page,limit,filter): Observable<any> {
    let params = new HttpParams();
    params = params.append('idEmpresa', idEmpresa);
    params = params.append('page', page);
    params = params.append('count', limit);
    params = params.append('search', filter);
    if(filter != ""){
      params = params.append('filter', filter);
    } 
    return this.http.get(environment.apiUrl +'Clientes/list', { params: params } );
  }

  listarClientesAll(idEmpresa): Observable<any> {
    let params = new HttpParams();
    params = params.append('idEmpresa', idEmpresa);
    return this.http.get(environment.apiUrl +'Clientes/listAll', { params: params } );
  }

  listClientesRepresentante(idEmpresa, idUsuario): Observable<any> {
    let params = new HttpParams();
    params = params.append('idEmpresa', idEmpresa);
    params = params.append('idUsuario', idUsuario);
    return this.http.get(environment.apiUrl +'Clientes/listClientesRepresentante', { params: params } );
  }

  saveCliente(dados): Observable<any> {
    return this.http.post(environment.apiUrl +'Clientes/save', dados);
  }

  listarTabela(idEmpresa, page,limit,filter): Observable<any> {
    let params = new HttpParams();
    params = params.append('idEmpresa', idEmpresa);
    params = params.append('page', page);
    params = params.append('count', limit);
    params = params.append('search', filter);
    if(filter != ""){
      params = params.append('filter', filter);
    } 
    return this.http.get(environment.apiUrl +'tabela/list', { params: params } );
  }
  listaAtivoTabela(idUsuario): Observable<any> {
    return this.http.get(environment.apiUrl +'tabela/listAtivo/'+ idUsuario );
  }

  listarTabelaProduto(idTabela, pesquisa): Observable<any> {
    let params = new HttpParams();
    console.log(pesquisa);  

    params = params.append('idTabela', idTabela);
    if(pesquisa != ""){
      params = params.append('pesquisa', pesquisa);
    } 
    return this.http.get(environment.apiUrl +'tabelaProduto/list', { params: params } );
  }
  
  listarProdutos(idEmpresa, page,limit,filter): Observable<any> {
    let params = new HttpParams();
    params = params.append('idEmpresa', idEmpresa);
    params = params.append('page', page);
    params = params.append('count', limit);
    params = params.append('search', filter);
    if(filter != ""){
      params = params.append('filter', filter);
    } 
    return this.http.get(environment.apiUrl +'produto/list', { params: params } );
  }

  ativarTabela(id: number): Observable<any> {
    return this.http.put(environment.apiUrl+'tabela/ativar/'+id,{});
  }

  saveTabela(dados): Observable<any> {
    return this.http.post(environment.apiUrl +'tabela/save', dados);
  }
  saveProduto(dados): Observable<any> {
    return this.http.post(environment.apiUrl +'produto/save', dados);
  }


  buscarProduto(idProduto): Observable<any> {
    return this.http.get(environment.apiUrl +'produto/get/'+idProduto);
  }

//==========================================================================================================
  //  IMPORTAÇÃO ERP

  importarNCM(idEmpresa): Observable<any> {
    return this.http.get(environment.apiUrl +'integracao/ImportarNcm/'+idEmpresa);
  }

  importarCondicaoPagamento(idEmpresa): Observable<any> {
     return this.http.get(environment.apiUrl +'integracao/ImportarCondicaoPagamento/'+idEmpresa);
  }
  importarRepresentante(idEmpresa): Observable<any> {
    return this.http.get(environment.apiUrl +'integracao/ImportarRepresentante/'+idEmpresa);
  }

  importarCliente(idEmpresa): Observable<any> {
    return this.http.get(environment.apiUrl +'integracao/ImportarCliente/'+idEmpresa);
  }
  
  importarProdutosTabelaPreco(idEmpresa): Observable<any> {
    return this.http.get(environment.apiUrl +'integracao/ImportarProdutosTabelaPreco/'+idEmpresa);
  }

  verificaPedidosFaturados(idEmpresa): Observable<any> {
    return this.http.get(environment.apiUrl +'integracao/VerificaPedidosFaturados/'+idEmpresa);
  }

  listAtivoStatus(): Observable<any> {
    return this.http.get(environment.apiUrl + 'status/listAtivo');
  }

  //    CIENTE VARIAVEL
  saveClienteSistemaVariavel(dados): Observable<any> {
    return this.http.post(environment.apiUrl +'ClienteSistemaVariavel/save', dados);
  }
 
  listClienteSistemaVariavel(idClienteSistema): Observable<any> {
    return this.http.get(environment.apiUrl +'ClienteSistemaVariavel/list/'+idClienteSistema);
  }
  deleteClienteSistemaVariavel(id): Observable<any> {
    return this.http.delete(environment.apiUrl +'ClienteSistemaVariavel/delete/'+id);
  }
  
  //    CIENTE SISTEMA
  saveClienteSistema(dados): Observable<any> {
    return this.http.post(environment.apiUrl +'ClienteSistema/save', dados);
  }
 
  listClienteSistema(idCliente): Observable<any> {
    return this.http.get(environment.apiUrl +'ClienteSistema/list/'+idCliente);
  }
  listaAtivoSistema(): Observable<any> {
    return this.http.get(environment.apiUrl +'ClienteSistema/listAtivo');
  }
  deleteClienteSistema(id): Observable<any> {
    return this.http.delete(environment.apiUrl +'ClienteSistema/delete/'+id);
  }
}
