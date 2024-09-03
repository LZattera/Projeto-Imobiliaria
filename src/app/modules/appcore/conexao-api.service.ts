import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConexaoApiService {

  key:string = '67c675f8307af31f02d494e21bda6470';
  apiUrl:string = 'http://cli42332-rest.vistahost.com.br/';
  constructor(
    private http :HttpClient
  ) { }

  listarImoveis(bairros: any, vlrVenda:any, fields: any): Observable<any> {
    const cidades = ["Caxias do Sul"];
    const postFields = JSON.stringify({ 
      "filter":{ "Bairro": bairros, "ValorVenda": vlrVenda, "Cidade": cidades}, 
      "fields":fields,
      "paginacao":{"pagina":"1","quantidade":"50"}
     });
    console.log("postFields", postFields)
  
    const url = `${this.apiUrl}imoveis/listar?key=${this.key}&pesquisa=${encodeURIComponent(postFields)}`;

    console.log("asdasda", url)
    const headers = new HttpHeaders({
      'Accept': 'application/json'
    });

    return this.http.get(url, { headers });
  }
  
  listarImoveisDestaque(filter: any, fields: any): Observable<any> {
    const bairros = [];
    const vlrVenda = [250000, 1000000];
    const cidades = ["Caxias do Sul"];
    const postFields = JSON.stringify({ 
      "filter":{}, 
      "fields": fields,
      "paginacao":{"pagina":"1","quantidade":"50"}
     });
    console.log("postFields", postFields)
  
    const url = `${this.apiUrl}imoveis/destaques?key=${this.key}&pesquisa=${encodeURIComponent(postFields)}`;

    console.log("asdasda", url)
    const headers = new HttpHeaders({
      'Accept': 'application/json'
    });

    return this.http.get(url, { headers });
  }
  
  descricaoImovel(codigoImovel:any):Observable<any>{
    const url = `${this.apiUrl}imoveis/detalhes?key=${this.key}&imovel=${codigoImovel}&pesquisa={
    "fields": ["Codigo",
    "Endereco",
    "BanheiroSocialQtd",
    "Bairro",
    "AreaTotal", 
    "Dormitorios",
    "ValorCondominio", 
    "FotoDestaque",
    "ValorIptu",
    "DescricaoEmpreendimento",
    "DescricaoWeb", "DestaquePetropolisImoveis", "DestaqueWeb", "ValorVenda",
    {"Foto":["ImagemCodigo", "Destaque", "Destaque", "Foto", "FotoPequena"]}],"filter":{"Referencia":["${codigoImovel}"]}, "order":{"Corretor" : "ASC"}}`;
  
    const headers = new HttpHeaders({
      'Accept': 'application/json'
    });
  
    return this.http.get(url, { headers });
    
    
  }

  campos():Observable<any>{
    const url = `${this.apiUrl}imoveis/listarcampos?key=${this.key}`;
  
    const headers = new HttpHeaders({
      'Accept': 'application/json'
    });
  
    return this.http.get(url, { headers });
    
  }

}
