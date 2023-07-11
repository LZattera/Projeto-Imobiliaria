import { environment } from './../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CidadeService {

  constructor(
    private http: HttpClient
  ) { }
  listar(idEmpresa,page,limit,search): Observable<any> {
    let params = new HttpParams();
    
    
    params = params.append('pagina', page);
    params = params.append('limite', limit);
    params = params.append('pesquisa', search);
    params = params.append('idEmpresa', idEmpresa);
  
    return this.http.get(environment.apiUrl +'cidade/list', { params: params } );
  }

  listAtivo(): Observable<any> {
    return this.http.get(environment.apiUrl +'cidade/listAtivo');
  }

  buscar(id: number): Observable<any> { 
    return this.http.get(environment.apiUrl+'cidade/get/'+id);
  }
 
  adicionar(data: any): Observable<any> {
    return this.http.post(environment.apiUrl+'cidade/new',data);
  }

  editar(id: number, data: any): Observable<any> {
  
    return this.http.put(environment.apiUrl+'cidade/update',data);
  }
  delete(id: number): Observable<any> {
    
    return this.http.delete(environment.apiUrl+'cidade/delete/'+id);
  }
}
