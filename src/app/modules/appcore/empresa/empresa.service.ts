import { environment } from './../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(
    private http: HttpClient
  ) { }
  

  buscar(id: number): Observable<any> { 
    return this.http.get(environment.apiUrl+'empresa/get/'+id);
  }
 
  editar(id: number, data: any): Observable<any> {
  
    return this.http.put(environment.apiUrl+'empresa/update',data);
  }
}
