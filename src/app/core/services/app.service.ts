import { EnderecoCorreios } from './class/enderecoCorreios';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private idEmpresa : number = 0;
  private acesso : number = 0;
  private idUsuario : number = 0;
  private idCliente : number = -1;
  private nomeUsuario : string = '';
  private idRepresentante : number = null;
  private NomeRepresentateCliente : string = '';

  constructor() { }

  setEmpresa(value: number){
    this.idEmpresa = value;
  }
  setUsuario(value: number){
    this.idUsuario = value;
  }
  setAcesso(value: number){
    this.acesso = value;
  }
  
  setCliente(value: number){
    this.idCliente = value;
  }
  setRepresentante(value: number){
    this.idRepresentante = value;
  }
  setNomeCliente(value: string){
    this.nomeUsuario = value;
  }
  setNomeUsuario(value: string){
    this.nomeUsuario = value;
  }
  setNomeRepresentateCliente(value: string){
    this.NomeRepresentateCliente = value;
  }

  getAcesso(){
    return this.acesso;
  }
  getCliente(){
    return this.idCliente;
  }
  getEmpresa(){
    return this.idEmpresa;
  }
  getUsuario(){
    return this.idUsuario;
  }
  getRepresentante(){
    return this.idRepresentante;
  }
  getNomeUsuario(){
    return this.nomeUsuario;
  }

  getConfigDataTable(){
    return {
    info: false,
    paging: false, 
    searching: false,
    // scrollX: true,
    language: {
        emptyTable: "Nenhum registro encontrado",
        info: "Mostrando de _START_ até _END_ de _TOTAL_ registros",
        infoEmpty: "Mostrando 0 até 0 de 0 registros",
        infoFiltered: "(Filtrados de _MAX_ registros)",
        processing: "Procesando...",
        search: "Pesquisar:",
        loadingRecords: "Carregando...",
        zeroRecords: "Nenhum registro encontrado",
        lengthMenu: "Exibir _MENU_ resultados por página",
        paginate: {
            first: "Primero",
            previous: "Anterior",
            next: "Próximo",
            last: "Último",
        },
        responsive: true,
        aria: {
            sortAscending: ": Ordenar colunas de forma ascendente",
            sortDescending: ": Ordenar colunas de forma descendente",
        },
        
        order: [[0, "asc"]],
        
    },
    
      //  dom: 'Bfrtip',
      // Configure the buttons
      buttons: [
        // 'columnsToggle',
        // 'colvis',
        // 'copy',
        'print',
        'excel',
        // {
        //   text: 'Some button',
        //   key: '1',
        //   action: function (e, dt, node, config) {
        //     alert('Button activated');
        //   }
        // }
      ]
  };
  }


   getConfigDataTablePedidos(){
    return {
    info: false,
    paging: false, 
    searching: false,
    scrollX: true,
    language: {
        emptyTable: "Nenhum registro encontrado",
        info: "Mostrando de _START_ até _END_ de _TOTAL_ registros",
        infoEmpty: "Mostrando 0 até 0 de 0 registros",
        infoFiltered: "(Filtrados de _MAX_ registros)",
        processing: "Procesando...",
        search: "Pesquisar:",
        loadingRecords: "Carregando...",
        zeroRecords: "Nenhum registro encontrado",
        lengthMenu: "Exibir _MENU_ resultados por página",
        paginate: {
            first: "Primero",
            previous: "Anterior",
            next: "Próximo",
            last: "Último",
        },
        responsive: false,
        aria: {
            sortAscending: ": Ordenar colunas de forma ascendente",
            sortDescending: ": Ordenar colunas de forma descendente",
        },
        
        order: [[0, "asc"]],
        
    },
    
      //  dom: 'Bfrtip',
      // Configure the buttons
      buttons: [
        // 'columnsToggle',
        // 'colvis',
        // 'copy',
        'print',
        'excel',
        // {
        //   text: 'Some button',
        //   key: '1',
        //   action: function (e, dt, node, config) {
        //     alert('Button activated');
        //   }
        // }
      ]
  };
  }


}

