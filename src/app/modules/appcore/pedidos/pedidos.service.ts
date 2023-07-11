import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(
    private http: HttpClient
  ) { }
  
  list(filtros : any): Observable<any> {
    return this.http.post(environment.apiUrl + 'pedido/list', filtros);
  }

 

  exportarPedido(pedidosExport : any): Observable<any> { 
    return this.http.post(environment.apiUrl + 'pedido/exportarPedido', pedidosExport);
  }
 




  deletePedidoItens(id: number): Observable<any> {
    return this.http.delete(environment.apiUrl + 'pedidoItem/delete/' + id);
  }


   // PEDIDO
   ListPedido(dados: any): Observable<any> {
    return this.http.get(environment.apiUrl +'pedido/list', dados );
  }
  savePedido(dados): Observable<any> {
    return this.http.post(environment.apiUrl +'pedido/save', dados);
  }
  buscarPedido(idPedido): Observable<any> {
    return this.http.get(environment.apiUrl +'pedido/get/'+idPedido);
  }

  relatorioPedido(idPedido): Observable<any> {
    return this.http.get(environment.apiUrl +'pedido/relatorioPedido/'+idPedido);
  }
  enviarPedido(idPedido): Observable<any> {
    return this.http.get(environment.apiUrl +'pedido/enivarEmailPedido/'+idPedido);
  }
 
  delete(idPedido): Observable<any> {
    return this.http.delete(environment.apiUrl +'pedido/delete/'+idPedido);
  }

  ListarPedidoItem(idPedido): Observable<any> {
    return this.http.get(environment.apiUrl +'pedidoItem/list/'+idPedido);
  }

  ListarProdutosItem(idPedido, filtro: string = ""): Observable<any> {
    console.log(filtro)
    let params = new HttpParams();
    params = params.append('idPedido', idPedido);
    if(filtro != ""){
      params = params.append('filtro', filtro);
    } 
    return this.http.get(environment.apiUrl +'pedidoItem/listProdutos', { params: params });
  }

  saveItemPedido(dados): Observable<any> {
    return this.http.post(environment.apiUrl +'pedidoItem/save', dados);
  }
  
  trocaStatusPedido(tipoStatus: number, idPedido:number): Observable<any> {
    let params = new HttpParams();
    params = params.append('idPedido', idPedido);
    params = params.append('tipoStatus', tipoStatus);
    return this.http.get(environment.apiUrl +'pedido/trocaStatus', { params: params });
  }
}