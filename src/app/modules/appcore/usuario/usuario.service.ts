import { environment } from './../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private http: HttpClient
  ) { }
  
  listar(idCliente, page, count, filter, ativos): Observable<any> {
    let params = new HttpParams();
    params = params.append('idCliente', idCliente);
    params = params.append('count', count);
    params = params.append('page', page);
    params = params.append('ativos', ativos);
    if(filter != ""){
      params = params.append('filter', filter);
    } 
    return this.http.get(environment.apiUrl +'usuario/list', { params: params } );
  }

  buscar(id: number): Observable<any> { 
    return this.http.get(environment.apiUrl+'usuario/get/'+id);
  }
 
  save(data: any): Observable<any> {
    console.log(data);
    return this.http.post(environment.apiUrl+'usuario/save',data);
  }

  verificausuario(data: any): Observable<any> {
    return this.http.post(environment.apiUrl+'usuario/existe', data);
  }
  
  delete(id: number): Observable<any> {
    return this.http.delete(environment.apiUrl+'usuario/delete/'+id);
  }

  ativar(id: number): Observable<any> {
    return this.http.put(environment.apiUrl+'usuario/ativar/' + id, {});
  }

  listarAdm(page, count, filter): Observable<any> {
    let params = new HttpParams();
    params = params.append('count', count);
    params = params.append('page', page);
    if(filter != ""){
      params = params.append('filter', filter);
    } 
    return this.http.get(environment.apiUrl +'usuario/listAdm', { params: params } );
  }


// Lista de Usuario Tabela


  listarUsuarioTabela(idUsuario): Observable<any> {
    let params = new HttpParams();
    params = params.append('idUsuario', idUsuario);
    return this.http.get(environment.apiUrl +'usuariotabela/list', { params: params } );
  }

  saveUsuarioTabela(data: any): Observable<any> {
    console.log(data);
    return this.http.post(environment.apiUrl+'usuariotabela/save',data);
  }


}
