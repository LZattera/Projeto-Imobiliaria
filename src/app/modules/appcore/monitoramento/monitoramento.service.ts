import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

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
}
