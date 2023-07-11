import { CadastrosService } from './../../cadastros/cadastros.service';
import { AppService } from './../../../../core/services/app.service';
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { NgPopupsService } from 'ng-popups';
import { PedidosService } from '../pedidos.service';

import {formatDate} from '@angular/common';

@Component({
  selector: 'app-pedidos-view',
  templateUrl: './pedidos-view.component.html',
  styleUrls: ['./pedidos-view.component.scss']
})
export class PedidosViewComponent implements OnInit {

  id: number ;
  dados: any;

  erro: string;
  editing: boolean = false;
  submitted: boolean = false;
  loading: boolean = false; 
  frmForm: UntypedFormGroup;
  idCliente : number = 0;
  idUsuario : number = 0;
  idEmpresa : number = 0;
  mostraModal : string = '';
  lstStatus: any= [];
  lstTabela: any= [];
  lstCondicaoPagamento: any= [];
  lstClientes: any[]= [];
  itens: any= [];
  PerfilAcesso: number; //1 Adm , 2 Televenda, 3 Representante, 4 Cliente 

  
  limitChanged: Subject<number> = new Subject<number>();
  searchChanged: Subject<string> = new Subject<string>();
  dataHoje : string ='';

  dtOptions : any = [];

  liberadoEdicao : boolean = false;

  constructor(
    private route: ActivatedRoute,
    private fb: UntypedFormBuilder,
    private pedidoService: PedidosService,
    private cadastroService: CadastrosService,
    private toastr: ToastrService,
    private router: Router,
     private ngPopups: NgPopupsService,
    private appService: AppService,
  ) { }

  
  ngOnInit(): void {
    this.dtOptions = this.appService.getConfigDataTable();

    this.id = +this.route.snapshot.paramMap.get('id');
    this.dataHoje  = formatDate(new Date(), 'dd/MM/yyyy', 'pt');
    
    this.idUsuario = this.appService.getUsuario();
    this.idEmpresa = this.appService.getEmpresa();
    this.idCliente = +this.appService.getCliente();
    this.PerfilAcesso = this.appService.getAcesso();
    
    this.frmForm = this.createForm();
    this.loadStatus();
    this.loadTabela();
    this.loaCondicaoPagamento();
    this.loadCliente();
    if(this.id == 0){
       this.editing = true;
       this.loading = false;
    }else{
      this.load();
      this.loadItens();
    }
    this.verificaLiberacaoEditar();
  }

  verificaLiberacaoEditar(){
    //1 Adm , 2 Televenda, 3 Representante, 4 Cliente 
    this.liberadoEdicao = false;
    if(this.PerfilAcesso == 1){
      if(this.frmForm.value.idStatus != 4) {
        this.liberadoEdicao = true;
      }
    }else{
      if(this.frmForm.value.idStatus == 1) {
        this.liberadoEdicao = true;
      }
    }
  }

  load() {
    this.loading = true;
    this.pedidoService.buscarPedido(this.id).subscribe(res => {
       this.frmForm.patchValue(res);
       this.verificaLiberacaoEditar();
       this.loading = false;
     }, err => {
       this.erro = err;
     });
  }
  loadItens() {
    this.pedidoService.ListarPedidoItem(this.id).subscribe(res => {
       this.itens = res;
     }, err => {
       this.erro = err;
     });
  }
  MostraModal(){
    return this.mostraModal = 'PedidoItem';
  }
  fecharModal() {
    this.load();
    return this.mostraModal = '';
  } 

  loadStatus() {
    this.cadastroService.listAtivoStatus().subscribe(res => {
       this.lstStatus = res;
     }, err => {
       this.erro = err;
     });
  }
  loadTabela() {
    this.cadastroService.listaAtivoTabela(this.idUsuario).subscribe(res => {
      console.log(res)
       this.lstTabela = res;
     }, err => {
       this.erro = err;
     });
  }
  loaCondicaoPagamento() {
    this.cadastroService.listaAtivoCondicaoPagamento().subscribe(res => {
      console.log(res)
       this.lstCondicaoPagamento = res;
     }, err => {
       this.erro = err;
     });
  }
  loadCliente() {
    this.cadastroService.listClientesRepresentante(this.idEmpresa, this.idUsuario).subscribe(res => {
       this.lstClientes = res;
     }, err => {
       this.erro = err;
     });
  }

  createForm(): UntypedFormGroup {
     return this.fb.group({
      id : [this.id, Validators.required ],
      observacao : ['' ],
      idStatus : [1, Validators.required ],
      idTabela : [null, Validators.required ],
      idCondicaoPagamento : ['', Validators.required ],
      ativo: [true],
      idUsuario: [this.idUsuario],
      idCliente: [this.idCliente, Validators.required],
      idEmpresa: [this.idEmpresa],
      valorTotalContabil: [0.0],
      valorTotalMercadoria: [0.0],
      dataCadastro: [this.dataHoje, Validators.required],
      dataFinalizado: [null],
      dataBaixado: [null],
      codigoPedido: [''],
      codigoPedidoErp: [null],
      dataFaturado: [null],
      emailNotificacao: [null],
     });
  }

  get f() {  
    return this.frmForm.controls; 
  }

  edit() {
    this.editing = true;
    this.submitted = false;
  }
  trocaStatus(tipo){
    var msg = 'Você deseja finalizar o pedido e enviar para faturamento?';


    if(this.id > 0){
    
      if(tipo == 0){
        msg = "Você deseja cancelar o pedido?";
      }else if(tipo == 2){
        msg = "Você deseja reabrir o pedido?";
      }
      
        this.ngPopups.confirm(msg)
        .subscribe(res => {
          if (res) {
            this.pedidoService.trocaStatusPedido(tipo, this.id).subscribe(res=>{
              this.toastr.success(null,"Pedido Finalizado");
              this.loadItens();
                this.load();
            })
          }
        });
        
      
      // if(tipo == 0){
      //   this.ngPopups.confirm('Você deseja cancelar o pedido?')
      //   .subscribe(res => {
      //     if (res) {
      //        this.pedidoService.trocaStatusPedido(tipo, this.id).subscribe(res=>{
      //         this.toastr.success(null,"Pedido Cancelado");
      //         this.loadItens();
      //          this.load();
      //       })
      //     }
      //   });
       
      // }
    }
      
  }

  // trocaStatus(tipo){
  //   if(this.id > 0){
  //     if(tipo == 1){
  //       this.pedidoService.trocaStatusPedido(tipo, this.id).subscribe(res=>{
  //         this.toastr.success(null,"Pedido Finalizado");
  //         this.load();
  //       })
  //     }
  //     }
  //     if(tipo == 0){
  //       this.pedidoService.trocaStatusPedido(tipo, this.id).subscribe(res=>{
  //         this.toastr.success(null,"Pedido Cancelado");
  //         this.load();
  //       })
  //     }
  // }
    
    
  enviarEmail() {

     this.ngPopups.confirm('Você deseja enviar o pedido ao cliente?').subscribe(res => {
        if (res) {
          this.loading = true;
          this.pedidoService.savePedido(this.frmForm.value).subscribe(res =>{
            //Depois de garantir q o email foi salvo envia o email
            this.pedidoService.enviarPedido(this.id).subscribe(res =>{
              this.toastr.success(null,'E-mail enviado com sucesso');
              this.load();
              this.loading = false;
            }, err => {
              this.toastr.error(err,'OPS! Algum problema no envio do email, tente mais tarde!!!');
              this.loading = false;
            });   
         
        }, err => {
          this.toastr.error(err,'ERRO AO GRAVAR');
          this.loading = false;
        });
          
                
        }
      });
    
  }


  save($event) {
    console.log(this.frmForm.value);
    this.submitted = true;
    this.toastr.clear();
    if(this.frmForm.invalid ){
      this.toastr.warning(null,'Verifique os campos!');      
    }else{
      this.loading = true;
      if(this.id != 0){
        this.pedidoService.savePedido(this.frmForm.value).subscribe(res =>{
            this.toastr.success(null,'Gravado com sucesso!');
          this.editing = false;
          this.loading = false;
          this.submitted = false;
        }, err => {
          this.toastr.error(err,'ERRO AO GRAVAR');
          this.loading = false;
        });
      }else{
        this.pedidoService.savePedido(this.frmForm.value).subscribe(res =>{
          this.router.navigate(['appcore/pedidos/view/' + res.idRetorno]);
          this.toastr.success(null,'Gravado com sucesso!');
          // this.router.navigate(['appcore/pedido/view/' + res.id]);
          this.loading = false;
        }, err => {
          this.toastr.error(err,'ERRO AO GRAVAR');
          this.loading = false;
        });
      }
    }
    $event.preventDefault();
  }


}

