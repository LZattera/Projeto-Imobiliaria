import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MonitoramentoService {

  constructor(
    private http: HttpClient
  ) { }

  listar(filtros : any): Observable<any> {
    return this.http.post(environment.apiUrl + 'monitoramento/list', filtros);
  }
  dashboard(idCliente : any, idSetor: any): Observable<any> {
    let params = new HttpParams();
    params = params.append('idCliente', idCliente);
    params = params.append('idSetor', idSetor);
    return this.http.get(environment.apiUrl + 'monitoramento/dashboard', { params :params});
  }
}
