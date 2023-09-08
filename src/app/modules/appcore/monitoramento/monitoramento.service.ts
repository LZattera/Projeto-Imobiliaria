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
    return this.http.post(environment.apiUrl + 'Monitoramento/list', filtros);
  }
  
  dashboard(idCliente : any, idSetor: any): Observable<any> {
    console.log("DASHBOARD")
    let params = new HttpParams();
    params = params.append('idCliente', idCliente);
    params = params.append('idSetor', idSetor);
    return this.http.get(environment.apiUrl + 'Monitoramento/dashboard', { params :params});
  }
  
  dashboardgraficos(idCliente : any, idSetor: any): Observable<any> {
    console.log("DASHBOARD")
    let params = new HttpParams();
    params = params.append('idCliente', idCliente);
    params = params.append('idSetor', idSetor);
    return this.http.get(environment.apiUrl + 'Monitoramento/dashboardgraficos', { params :params});
  }

  ExportMonitoramento(monitoramentoExport : any): Observable<any> { 
    return this.http.post(environment.apiUrl + 'Monitoramento/exportarMonitoramento', monitoramentoExport);
  }
}
