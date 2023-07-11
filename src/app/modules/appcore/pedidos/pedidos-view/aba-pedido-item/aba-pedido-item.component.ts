import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgPopupsService } from 'ng-popups';
import { PedidosService } from '../../pedidos.service';


@Component({
  selector: 'app-aba-pedido-item',
  templateUrl: './aba-pedido-item.component.html',
  styleUrls: ['./aba-pedido-item.component.scss']
})
export class AbaPedidoItemComponent implements OnInit {

  
  @Input('idPedido') idPedido: number = -1;
  @Input('liberadoEdicao') liberadoEdicao: boolean = false;
  @Input('idStatus') idStatus: number = -1;
  @Output('evReload')evReload: EventEmitter<any> = new EventEmitter<any>();

  erro: string;
  editing: boolean = false;
  submitted: boolean = false;
  loading: boolean = false; 
  frm: UntypedFormGroup;
  lstPedidoItem: any = [];
  mostraModal: string ='';
  idProduto: number = 0;
  

  constructor(
    private fb: UntypedFormBuilder,
    private pedidoService : PedidosService,
    private toastr: ToastrService,
    private ngPopups: NgPopupsService,
  ){}

  ngOnInit(): void {
    this.loadItens();
  }

  loadItens() {
    this.pedidoService.ListarPedidoItem(this.idPedido).subscribe(res => {
       this.lstPedidoItem = res;
     }, err => {
       this.erro = err;
     });
  }
  MostraModal(){
    
    return this.mostraModal = 'PedidoItem';
  }
  fecharModal() {
    this.loadItens();
    return this.mostraModal = '';
  } 

  delete(id) {

    this.ngPopups.confirm('Você deseja excluir o item do pedido?')
      .subscribe(res => {
          if (res) {
            this.pedidoService.deletePedidoItens(id).subscribe(res =>{
              console.log('Retorno delete', res);
              this.toastr.success(null,'DELETADO COM SUCESSO');
              this.loadItens();
              this.evReload.emit();
            }, err => {
              this.toastr.error(err,'ERRO AO DELETAR');
            });
          }
    });
  }

  trocaStatus(tipo){
    if(this.idPedido > 0){
      if(tipo == 1){
        this.ngPopups.confirm('Você deseja finalizar o pedido e enviar para faturamento?')
        .subscribe(res => {
          if (res) {
            this.pedidoService.trocaStatusPedido(tipo, this.idPedido).subscribe(res=>{
              this.toastr.success(null,"Pedido Finalizado");
              this.loadItens();
              this.evReload.emit();
            })
          }
        });
        
      }
      if(tipo == 0){
        this.ngPopups.confirm('Você deseja cancelar o pedido?')
        .subscribe(res => {
          if (res) {
             this.pedidoService.trocaStatusPedido(tipo, this.idPedido).subscribe(res=>{
              this.toastr.success(null,"Pedido Cancelado");
              this.loadItens();
              this.evReload.emit();
            })
          }
        });
       
      }
    }
      
  }
}
