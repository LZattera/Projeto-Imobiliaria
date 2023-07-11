import { ToastrService } from 'ngx-toastr';
import { CadastrosService } from '../../../cadastros/cadastros.service';
import { PedidosService } from '../../pedidos.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { AppService } from 'src/app/core/services/app.service';

@Component({
  selector: 'app-pedido-item',
  templateUrl: './pedido-item.component.html',
  styleUrls: ['./pedido-item.component.scss']
})
export class PedidoItemComponent implements OnInit {

  @Input('idPedido') idPedido: number = -1;
  @Input('idStatus') idStatus: number = -1;

  @Output('evFechar')evFechar: EventEmitter<any> = new EventEmitter<any>();

  mostrar : boolean = false;
  loading: boolean;

  id: number = 0;
  erro: any;
  editing: boolean = false;
  submitted: boolean = false;
  fecharModa: any = [];
  itens: any[] = [];
  contador = 0;
  idAtual : any = []; 
  dtOptions : any = []; 
  searchChanged: Subject<string> = new Subject<string>();
  limit: number = 10;
  filtro: string = "";
  page: number;

  constructor(
    private toastr: ToastrService,             
    private cadastroservice: CadastrosService,
    private pedidosService: PedidosService,
    private appService: AppService,
  ) { }

  ngOnInit(): void {
    console.log(this.idStatus)
    this.dtOptions = this.appService.getConfigDataTable();
    this.searchChanged.pipe(debounceTime(500)).pipe(distinctUntilChanged()).subscribe(value => {
      this.page = 1;
      this.filtro = value;
      this.load(); 
    });
      this.load();
    
  }

  loadModal() {
    this.loading = true;
  }

  fecharModal(){
    this.evFechar.emit();
  }

  load() {
    this.loading = true;
    this.pedidosService.ListarProdutosItem(this.idPedido, this.filtro).subscribe(res => {
       this.itens = res;
       this.loading = false;
     }, err => {
       this.erro = err;
     });
  }

  
  incrementar(item) {

    item.alterado = true;
    item.qtd = item.qtd + 1;
    item.valorTotal = item.qtd * item.valor;
  }
  decrementar(item) {
    if(item.qtd > 0){
      item.alterado = true;
      item.qtd = item.qtd - 1;
      item.valorTotal = item.qtd * item.valor;
    }
  }
  alteraQtd(valor, item) {
    if(item.qtd != valor){
      item.alterado = true;
      item.qtd = valor;
      item.valorTotal = item.qtd * item.valor;
    }
  }

  saveAll(){

    this.itens.forEach((item) => {
      if( item.alterado){
        this.save(item);
      }
    });
  }

  save(item) {
    item.alterado = false;

   this.pedidosService.saveItemPedido(item).subscribe(res =>{
          if(res.status == 200){
            if(item.id == 0){
              item.id = res.idRetorno;
            }
            this.toastr.success(null,'Produto salvo com sucesso!');
          }
    }, err => {
      this.toastr.error(err,'ERRO AO GRAVAR - EDICAO');
      this.loading = false;
    });
  }



}

