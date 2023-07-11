import { Injectable } from '@angular/core';
import * as _ from 'lodash-es';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import {  BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FuncoesService {

  constructor() { }

  //Prepara valores para gravação na API
  convAnytoFloat(dado: any): number {
    //Converte qualquer String, null para float
    if (typeof dado === 'number') {
      return dado
    } else {
      if (typeof dado === 'string') {
        dado = dado.replace(",", ".");
        return parseFloat(dado)
      } else {
        if (typeof dado === 'undefined') {
          return 0
        }
      }
    }
  }

  //Prepara valores da API para o Front
  convFloattoString(dado: number): string {
    var conv: string;
    if (typeof dado === 'number') {
      conv = dado.toString();
      return conv.replace(".", ",");
    } else {
      if (typeof dado === 'undefined') {
        return ""
      }
    }
  }

  //Converte data da API para o Front
  formatDateBR(data: string): any {
    //Converte qualquer String para data DD/MM/AAAA
    if (data) {
      var ano = data.substr(0, 4);
      var mes = data.substr(5, 2);
      var dia = data.substr(8, 2);

      return dia + mes + ano;
    } else {
      return data;
    }
  }
  //Converte data da API para o Front
  formatDateBRlist(data: string): any {
    //Converte qualquer String para data DD/MM/AAAA
    if (data) {
      var ano = data.substr(0, 4);
      var mes = data.substr(5, 2);
      var dia = data.substr(8, 2);

      return dia + '/' + mes + '/' + ano;
    } else {
      return data;
    }
  }

  //Converte data do Front para a API
  formatDateApi(data: string): any {
    //Converte qualquer String para data AAAA-MM-DD
    if (data) {
      var dia = data.substr(0, 2);
      var mes = data.substr(2, 2);
      var ano = data.substr(4, 4);

      return ano + '-' + mes + '-' + dia;
    } else {
      return null;
    }
  }



  loadExcel(fileInput: any): Promise<any> {
    return new Promise((resolve, reject) => {

      var ret = { "codigo": "OK", "arquivo": "", "msg": "" };
      if (fileInput.target.files && fileInput.target.files[0]) {
        // Size Filter Bytes
        const max_size = 20971520;
        //const allowed_types = ["application/csv"];

        if (fileInput.target.files[0].size > max_size) {
          ret.codigo = "ERROR";
          ret.msg = 'Imagem ultrapassa o tamanho máximo';
          resolve(ret);
        }
        // if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
        //   ret.codigo = "ERROR";
        //   ret.msg = 'Tipo de arquivo nao permitido';
        //   resolve(ret);
        // }

        const reader = new FileReader();
        reader.readAsDataURL(fileInput.target.files[0]);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      }
    })
  }



  //Arredonda um float para X casas decimais
  roundDecimals(valor: number, casas: number): number {

    return Number(valor.toFixed(casas));
  }

  //Valida Input Somente Currency
  validaCurrency(charCode): boolean {
    return ((charCode >= 48) && (charCode <= 57)) && (charCode == 44)
  }

  //Valida Input Somente Currency
  validaInteiro(charCode): boolean {
    return (charCode >= 48) && (charCode <= 57)
  }





  //Remove a hora da data da API
  formatDateTimeToDate(data: string): any {
    //Converte Data (AAAA/MM/DDT00:00:00)  para data AAAA-MM-DD
    if (data) {
      var ano = data.substr(0, 4);
      var mes = data.substr(5, 2);
      var dia = data.substr(8, 2);

      return ano + "-" + mes + "-" + dia;
    } else {
      return data;
    }
  }



  //Converte data Local  para a API
  formatLocalDateApi(data: string): any {
    //Converte Data DD/MM/AAAA para data AAAA-MM-DD
    if (data) {
      var dia = data.substr(0, 2);
      var mes = data.substr(3, 2);
      var ano = data.substr(6, 4);

      return ano + '-' + mes + '-' + dia;
    } else {
      return null;
    }
  }

  //Adiciona um item na Array Multidimensional
  //Tabela deve ser declarada como:  nomeDaTabela: any[] = [];
  //dados deve ser informado como: { id: 0, campo1: valor, campo2: valor ...}
  insertArrayDB(Dados: any[], tabela: any[]) {
    var id = 0;
    var i: number;

    //Localiza o Último Id
    for (i = 0; i <= tabela.length - 1; i++) {
      if (tabela[i].id > id) {
        id = tabela[i].id;
      }
    }

    //Altera o Id para inclusao
    id++;
    Dados["id"] = id;
    tabela.push(Dados);
  }

  //Adiciona um item na Array Multidimensional -> Retorna o último ID
  //Tabela deve ser declarada como:  nomeDaTabela: any[] = [];
  //dados deve ser informado como: { id: 0, campo1: valor, campo2: valor ...}
  insereLinhaArrayDB(Dados: any[], tabela: any[]): number {
    var id = 0;
    var i: number;

    //Localiza o Último Id
    for (i = 0; i <= tabela.length - 1; i++) {
      if (tabela[i].id > id) {
        id = tabela[i].id;
      }
    }

    //Altera o Id para inclusao
    id++;
    Dados["id"] = id;
    tabela.push(Dados);

    return id;
  }

  //Deleta um Item da Array Multidimensional
  // retono -1 não encontrou o index
  deleteArrayDB(id: number, dados: any[]): number {
    var index: number;
    //Retorna o index do Id
    index = dados.map((el) => el.id).indexOf(id);

    //Exclui o index da Array
    if (index != -1) dados.splice(index, 1);

    return index;
  }

  //Ordena uma Array Multidimensional
  orderArrayDB(coluna: string, Dados: any[]) {

    Dados.sort(this.dynamicSort(coluna));

  }

  dynamicSort(property: string) {
    var sortOrder = 1;
    var result = 0;
    //Define Ordem Descrescente
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      /* Retorno (-1) Retorna ordem certa 
       * Retorno ( 1) Retorna ordem errada
       */
      //Ordenação de String
      if (typeof (a[property]) == "string") {
        result = a[property].localeCompare(b[property]);
        //Ordenação Number  
      } else {
        if (typeof (a[property]) == "number") {
          result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        }
      }
      return result * sortOrder;
    }
  }

  // Filtra a Array Multidimensional 
  // Encontrou o valor pesquisado retorna Array
  // Não encontrou retona array vazia
  //getArrayDB(coluna: string, valor: any, Dados: any[]): any[] {
  getArrayDB(coluna: string, valor: any, Dados: any): any {

    return Dados.filter(this.dynamicGet(coluna, valor));
  }

  //Localiza a Linha da Array com a propriedade e valor correspondente
  dynamicGet(property: string, valor: any) {
    return function (e) {
      return (e[property] == valor);
    }
  }

  //Atualiza uma Linha da Array Multidimensional pelo id
  //Atualizado = 1
  //Não atualizado = -1
  updateArrayDB(id: number, valor: any[], Dados: any[]): number {
    var index: number;

    //Retorna o index o ID
    index = Dados.findIndex(a => a.id == id);

    if (index != -1) Dados.splice(index, 1, valor);

    return index;
  }

  //Converte o arquivo de Base64 para BLOB 
  base64ToBlob(b64Data, contentType = '', sliceSize = 512) {
    b64Data = b64Data.replace(/\s/g, ''); //IE compatibility...
    let byteCharacters = atob(b64Data);
    let byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      let slice = byteCharacters.slice(offset, offset + sliceSize);

      let byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      let byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type: contentType });
  }

  base64ToPDF(base64 ){
    var byteCharacters = atob(base64);
    var byteNumbers = new Array(byteCharacters.length);
    for (var i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    var byteArray = new Uint8Array(byteNumbers);
    var file = new Blob([byteArray], { type: 'application/pdf;base64,' });
    // this.ConvertedBlob = new Blob([fileUploaded.content], {
    //   type: 'data:application/pdf;base64,'
    // });
    
    var fileURL = URL.createObjectURL(file);
    
    return fileURL;
  }

  
  fileContent(filename: string) : string {
    var arrayFilename = filename.split('.');
    var extensao = arrayFilename[1].toString();
    var retorno: any;

    var mimes = [
      {"extensao": "csv",  "valor": "text/x-comma-separated-values"},
      {"extensao": "pdf",  "valor": "application/pdf"},
      {"extensao": "xls",  "valor": "application/excel"},
      {"extensao": "ppt",  "valor": "application/powerpoint"},
      {"extensao": "ppt",  "valor": "application/powerpoint"},
      {"extensao": "php",  "valor": "application/x-httpd-php"},
      {"extensao": "php",  "valor": "application/x-httpd-php"},
      {"extensao": "js",   "valor": "application/x-javascript"},
      {"extensao": "js",   "valor": "application/x-javascript"},
      {"extensao": "zip",  "valor": "application/x-zip"},
      {"extensao": "gif",  "valor": "image/gif"},
      {"extensao": "jpg",  "valor": "image/jpeg"},
      {"extensao": "png",  "valor": "image/png"},
      {"extensao": "css",  "valor": "text/css"},
      {"extensao": "html", "valor": "text/html"},
      {"extensao": "txt",  "valor": "text/plain"},      
      {"extensao": "log",  "valor": "text/plain"},
      {"extensao": "rtf",  "valor": "text/rtf"},
      {"extensao": "rtf",  "valor": "text/rtf"},
      {"extensao": "mov",  "valor": "video/quicktime"},
      {"extensao": "avi",  "valor": "video/x-msvideo"},
      {"extensao": "mp4",  "valor": "video/mp4"},
      {"extensao": "doc",  "valor": "application/msword"},
      {"extensao": "docx", "valor": "application/vnd.openxmlformats-officedocument.wordprocessingml.document"},
      {"extensao": "xlsx", "valor": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"},
      {"extensao": "json", "valor": "application/json"}
    ];
    
    retorno = mimes.find(e => e.extensao === extensao );

    console.log('retorno', retorno);
    
    return retorno.valor;

  }


  //  loadImageBase64222(fileInput: any) {
  //   var promise = new Promise((resolve, reject) => {
  //     var ret = {"codigo": "OK", "arquivo": "", "msg": ""};

  //     if (fileInput.target.files && fileInput.target.files[0]) {
  //       // Size Filter Bytes
  //       const max_size = 20971520;
  //       const allowed_types = ['image/png', 'image/jpeg'];
  //       const max_height = 15200;
  //       const max_width = 25600;

  //       if (fileInput.target.files[0].size > max_size) {
  //         ret.codigo = "ERROR";
  //         ret.msg = 'Imagem ultrapassa o tamanho máximo';
  //        // return  Observable.from(ret);
  //       }
  //       if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
  //         ret.codigo = "ERROR";
  //         ret.msg = 'Tipo de imagem não permitido. Selecione JPG ou PNG';
  //         return ret;
  //       }

  //       var reader = new FileReader();
  //       reader.onload   = (e: any) => {
  //         const image = new Image();
  //         image.src = e.target.result;
  //         image.onload = rs => {
  //           const img_height = rs.currentTarget['height'];
  //           const img_width = rs.currentTarget['width'];

  //           if (img_height > max_height && img_width > max_width) {
  //             ret.codigo = "ERROR";
  //             ret.msg = 'Imagem muito grande em largura e altura';
  //             return ret;
  //           } else {
  //             const imgBase64Path = e.target.result;
  //             //Carrega a imagem base 64 no array de retorno            
  //             ret.arquivo = imgBase64Path;

  //           }
  //         };
  //       };
  //       reader.readAsDataURL(fileInput.target.files[0]);
  //       return ret; 
  //     }
  //   });
  //   return promise;
  //   }


  //   loadImage(fileInput: any): Observable<any> {
  //     var ret = {"codigo": "OK", "arquivo": "", "msg": ""};

  //     if (fileInput.target.files && fileInput.target.files[0]) {
  //       // Size Filter Bytes
  //       const max_size = 20971520;
  //       const allowed_types = ['image/png', 'image/jpeg'];
  //       const max_height = 15200;
  //       const max_width = 25600;

  //       if (fileInput.target.files[0].size > max_size) {
  //         ret.codigo = "ERROR";
  //         ret.msg = 'Imagem ultrapassa o tamanho máximo';
  //         return of(ret);
  //       }
  //       if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
  //         ret.codigo = "ERROR";
  //         ret.msg = 'Tipo de imagem não permitido. Selecione JPG ou PNG';
  //         return of(ret);
  //       }

  //       var reader = new FileReader();
  //       reader.onload   = (e: any) => {
  //         const image = new Image();
  //         image.src = e.target.result;
  //         image.onload = rs => {
  //           const img_height = rs.currentTarget['height'];
  //           const img_width = rs.currentTarget['width'];

  //           if (img_height > max_height && img_width > max_width) {
  //             ret.codigo = "ERROR";
  //             ret.msg = 'Imagem muito grande em largura e altura';
  //             return of(ret);
  //           } else {
  //             const imgBase64Path = e.target.result;
  //             //Carrega a imagem base 64 no array de retorno            
  //             ret.arquivo = imgBase64Path;
  //             return of(ret);
  //           }
  //         };
  //       };
  //       reader.readAsDataURL(fileInput.target.files[0]);
  //     }
  //     return of(ret);
  //  }

  loadImage(fileInput: any): Promise<any> {
    return new Promise((resolve, reject) => {

      var ret = { "codigo": "OK", "arquivo": "", "msg": "" };
      if (fileInput.target.files && fileInput.target.files[0]) {
        // Size Filter Bytes
        const max_size = 20971520;
        const allowed_types = ['image/png', 'image/jpeg'];
        const max_height = 15200;
        const max_width = 25600;

        if (fileInput.target.files[0].size > max_size) {
          ret.codigo = "ERROR";
          ret.msg = 'Imagem ultrapassa o tamanho máximo';
          resolve(ret);
        }
        if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
          ret.codigo = "ERROR";
          ret.msg = 'Tipo de imagem não permitido. Selecione JPG ou PNG';
          resolve(ret);
        }

        var reader = new FileReader();
        reader.onload = (e: any) => {
          const image = new Image();
          image.src = e.target.result;
          image.onload = rs => {
            const img_height = rs.currentTarget['height'];
            const img_width = rs.currentTarget['width'];

            if (img_height > max_height && img_width > max_width) {
              ret.codigo = "ERROR";
              ret.msg = 'Imagem muito grande em largura e altura';
              resolve(ret);
            } else {
              const imgBase64Path = e.target.result;
              //Carrega a imagem base 64 no array de retorno            
              ret.arquivo = imgBase64Path;
              resolve(ret);
            }
          };
        };
        reader.readAsDataURL(fileInput.target.files[0]);
      }
    })
  }


}
