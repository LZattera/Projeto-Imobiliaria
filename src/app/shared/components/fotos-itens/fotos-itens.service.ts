import { environment } from './../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FotosItensService {

  constructor(  private http: HttpClient) { }

  buscarFotosItemObra(idObraItem: number): Observable<any> { 
    return this.http.get(environment.apiUrl+'veiculo/get/'+idObraItem);
  }

  buscarFotosItemOS(idOsItem: number): Observable<any> { 
    return this.http.get(environment.apiUrl+'ositem/listFotosItem/'+idOsItem);
  }
}
