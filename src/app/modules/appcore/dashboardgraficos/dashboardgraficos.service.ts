import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardgraficosService {

  constructor( private httpCliente : HttpClient) { }
}
