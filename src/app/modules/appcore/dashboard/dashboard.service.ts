import { environment } from './../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private http: HttpClient
  ) { }
  
  
  retornaTotaisDashboard(filtros: any): Observable<any> {
    return this.http.post(environment.apiUrl+'dashboard/retornaDashboard', filtros);
  }

  listaResumoCustoEmpresa(filtros: any): Observable<any> { 
    return this.http.post(environment.apiUrl+'dashboard/listResumoCustosEmpresa', filtros);
  }
  
  
}
