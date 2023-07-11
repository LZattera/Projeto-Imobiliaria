import { Component, Input, OnInit } from '@angular/core';
import { AppService } from './../../../../core/services/app.service';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { CadastrosService } from '../../cadastros/cadastros.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PedidosService} from 'src/app/modules/appcore/pedidos/pedidos.service';
import { FuncoesService } from 'src/app/core/services/funcoes.service';
import { json } from 'stream/consumers';
import { formatDate } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { NgPopupsService } from 'ng-popups';

@Component({
  selector: 'app-pedidos-list',
  templateUrl: './pedidos-list.component.html',
  styleUrls: ['./pedidos-list.component.scss']
})
export class PedidosListComponent implements OnInit {

nome_tela = "Pedidos";
  nome_etapa = "Listagem";
  itens: any[] = [];
  page: number = 1;
  total: number = 0;
  limit: number = 50;
  search: string = "";
  loading: boolean = true;
  error: string = '';
  submitted: boolean;
  frmFiltros: FormGroup;
  idEmpresa:number;
  PerfilAcesso:number;
  idCliente:number = null;
  idRepresentante:number = null;


  limitChanged: Subject<number> = new Subject<number>();
  searchChanged: Subject<string> = new Subject<string>();
  dtOptions : any = [];
  pedidosExport : any = [];

  constructor(
    private appService: AppService,
    private funcoesService: FuncoesService,
    private cadastroService: CadastrosService,
    private pedidoService: PedidosService,
     private toastr : ToastrService, 
    private fb: FormBuilder,
    private ngPopups: NgPopupsService,
  ) { }

  ngOnInit(): void {
    this.PerfilAcesso = this.appService.getAcesso();
    this.idEmpresa = this.appService.getEmpresa();
    this.idCliente = +this.appService.getCliente();
    this.idRepresentante = +this.appService.getRepresentante();
    console.log(this.idCliente);


    this.dtOptions = this.appService.getConfigDataTablePedidos();
    
    this.frmFiltros = this.createForm();
    var filtros = JSON.parse(localStorage.getItem('usafFiltros'));
    this.frmFiltros.patchValue(filtros);
    if(this.idCliente != null && this.PerfilAcesso == 4 ){
      this.frmFiltros.controls["idCliente"].setValue(+this.idCliente);
    }else{
      this.idCliente = null;
    }
    if(this.idRepresentante != null && this.PerfilAcesso != 1 && this.PerfilAcesso != 2 ){
      this.frmFiltros.controls["idRepresentante"].setValue(+this.idRepresentante);
    }else{
      this.idRepresentante = null;
    }


    this.searchChanged.pipe(debounceTime(500)).pipe(distinctUntilChanged()).subscribe(value => {
      this.page = 1;
      this.frmFiltros.controls["page"].setValue(1);
      this.frmFiltros.controls["pesquisa"].setValue(value);
      this.search = value;
      this.load();
    });

    this.limitChanged.pipe(debounceTime(500)).pipe(distinctUntilChanged()).subscribe(value => {
      this.page = 1;
      this.frmFiltros.controls["page"].setValue(1);
      this.frmFiltros.controls["count"].setValue(value);
      this.limit = value;
      this.load();
    });

   

    this.load();
  }
  
  createForm(): FormGroup {
    return this.fb.group({
      idRepresentante : [this.idRepresentante],
      idCliente : [this.idCliente],
      idStatus : [2],
      idEmpresa : [this.idEmpresa],
      count : [this.limit],
      page : [this.page],
      pesquisa : [this.search],
      tipoData : ["CAD"],
      dataInicial : [],
      dataFinal : [],
    });
  }

  filtrar($event){
    this.frmFiltros.patchValue($event);
    console.log("Filtros retornados: ", this.frmFiltros.value);
    localStorage.setItem('usafFiltros', JSON.stringify(this.frmFiltros.value));
    this.load();
  }

  load(){

     console.log("Filtros retornados LOAD: ", this.frmFiltros.value);
    this.loading = true;
    this.pedidoService.list(this.frmFiltros.value).subscribe((res) => {
      console.log(res.dados)
      this.total = res.total;
      this.itens = res.dados;
      this.loading = false;
    }, err => {
      this.error = err;
      this.loading = false;
    });
  }

  selectAll(Checked){
    
    if (!Checked.target.checked) {

      this.pedidosExport = [];
      this.itens.forEach((it) => {
        it.selecionado = false;
      });
    } else {
      this.pedidosExport = [];
      this.itens.forEach((it) => {
        if(it.idStatus==2 || it.idStatus==3){
          this.pedidosExport.push(it.id);
          it.selecionado = true;
        }
      });
    }

     console.log(this.pedidosExport);
  }

  addPedidoExport(idPedido){
    var index: number;
    index = this.pedidosExport.indexOf(idPedido);
    if (index != -1){
      this.pedidosExport.splice(index, 1);
    }else{
      this.pedidosExport.push(idPedido);
    }
     console.log(this.pedidosExport);
  }
  
  onPageChange($event){
    this.page = $event;
     this.frmFiltros.controls["page"].setValue( this.page);
    this.load();
  }
  

   exportPedido(){

    this.pedidoService.exportarPedido(this.pedidosExport).subscribe((res) => {

      this.pedidosExport = [];
      console.log(res);
        res.pedidos.forEach(row => {
        var arquivoBase64 = row.base64;
        var a = document.createElement("a");
        var blob = this.funcoesService.base64ToBlob(arquivoBase64, "text/csv")
        const url = window.URL.createObjectURL(blob);
        var dataHoje  = formatDate(new Date(), 'dd/MM/yyyy', 'pt');
        a.href = url;
        a.download = row.nome; //"PedidoUSAFBrazil-" +  dataHoje.replace("/","-") + ".csv";
        a.click();
        window.URL.revokeObjectURL(url);
        //this.load();  
      });
      
      //window.open(url);
    }, err => {
      this.error = err;
      this.loading = false;
    });

  }



  imprimir(pedido) {
    this.pedidoService.relatorioPedido(pedido.id).subscribe(res => {
      console.log(res);
       var url = this.funcoesService.base64ToPDF(res);
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', url);
      linkElement.setAttribute('download', (pedido.idStatus ==1 ? 'Orçamento ': 'Pedido ') + pedido.codigoPedido);
      const clickEvent = new MouseEvent('click', {
        'view': window,
        'bubbles': true,
        'cancelable': false
      });
      linkElement.dispatchEvent(clickEvent);
      
     }, err => {
       this.error = err;
     });
  }
  
  delete(id) {

     this.ngPopups.confirm('Você deseja excluir o pedido?').subscribe(res => {
      if (res) {
        this.loading = true;
            this.pedidoService.delete(id).subscribe(res =>{
                console.log('Retorno delete', res);
                this.toastr.success(null,'DELETADO COM SUCESSO');
                this.load();
                this.loading = false;
              }, err => {
                this.toastr.error(err,'ERRO AO DELETAR');
              });     
      }
    });
    
  }



}