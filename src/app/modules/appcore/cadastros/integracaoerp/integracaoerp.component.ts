import { Component, Input, OnInit } from '@angular/core';
import { AppService } from './../../../../core/services/app.service';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { CadastrosService } from './../cadastros.service';
import { Router } from '@angular/router';
import { NgPopupsService } from 'ng-popups';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-integracaoerp',
  templateUrl: './integracaoerp.component.html',
  styleUrls: ['./integracaoerp.component.scss']
})
export class IntegracaoerpComponent implements OnInit {

nome_tela = "Integração ERP";
  nome_etapa = "Listagem";
  idEmpresa: number = 1;
  loading: boolean = false;
  showModal: boolean = false;

  constructor(
    private appService: AppService,
    private cadastroService: CadastrosService,
    private ngPopups: NgPopupsService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    //this.idEmpresa = this.appService.getEmpresa(); 
    console.log(this.idEmpresa)
  }
  
  //PRECISA DO IDEMPRESA

  ImportarCondicaoPagamento(){
    this.ngPopups.confirm('Você deseja ressincronizar?').subscribe(res => {
      
        this.loading = true;
            this.cadastroService.importarCondicaoPagamento(this.idEmpresa ).subscribe((res) => {
              if(res.status == 200){
                console.log(res)
                console.log("DEU CERTO")
                this.loading = false;

                this.toastr.success(null,'Sincronizado com sucesso!');
              }else{
                console.log(res);
                this.loading = false;
                this.toastr.warning(null,res.mensagem);
              } 
            }, err => {
              console.log("ERRO")
              this.loading = false;
              this.toastr.warning(null,'Falha na sincronização');
        });
      
    });
  }

  ImportarNcm(){
    this.ngPopups.confirm('Você deseja ressincronizar?').subscribe(res => {
      if (res) {
          this.loading = true;
            this.cadastroService.importarNCM(this.idEmpresa ).subscribe((res) => {
              if(res.status == 200){
                console.log("DEU CERTO")
                this.loading = false;
                this.toastr.success(null,'Sincronizado com sucesso!');
                
              }else{
                console.log(res);
                this.loading = false;
                this.toastr.warning(null,res.mensagem);
              } 
            }, err => {

              this.loading = false;
              this.toastr.warning(null,'Falha na sincronização');
        });
      }
    });
  }

  ImportarRepresentante(){
    this.ngPopups.confirm('Você deseja ressincronizar?').subscribe(res => {
      if (res) {
        this.loading = true;
          this.cadastroService.importarRepresentante(this.idEmpresa ).subscribe((res) => {
            this.loading = false;
             if(res.status == 200){
                this.toastr.success(null,'Sincronizado com sucesso!');
             }else{
                console.log(res);
                this.toastr.warning(null,res.mensagem);
              } 
          }, err => {
            this.loading = false;
            this.toastr.warning(null,'Falha na sincronização');
      });
    }
  });
  }

  ImportarClientes(){
    this.ngPopups.confirm('Você deseja ressincronizar?').subscribe(res => {
      if (res) {
        this.loading = true;
          this.cadastroService.importarCliente(this.idEmpresa ).subscribe((res) => {
            if(res.status == 200){
              this.loading = false;
              this.toastr.success(null,'Sincronizado com sucesso!');
             }else{
                console.log(res);
                this.loading = false;
                this.toastr.warning(null,res.mensagem);
              } 
          }, err => {
            this.loading = false;
            this.toastr.warning(null,'Falha na sincronização');
      });
    }
  });
  }

  ImportarTabelasProdutos(){
    this.ngPopups.confirm('Você deseja ressincronizar?').subscribe(res => {
      if (res) {
        this.loading = true;
          this.cadastroService.importarProdutosTabelaPreco(this.idEmpresa ).subscribe((res) => {
            this.loading = false;
            if(res.status == 200){
              this.toastr.success(null,'Sincronizado com sucesso!');
             }else{
                console.log(res);
                this.toastr.warning(null,res.mensagem);
              } 
          }, err => {
            this.loading = false;
            this.toastr.warning(null,'Falha na sincronização');
      });
    }
  });
  }
  
  VerificaPedidosFaturados(){
    this.ngPopups.confirm('Você deseja ressincronizar?').subscribe(res => {
      if (res) {
        this.loading = true;
          this.cadastroService.verificaPedidosFaturados(this.idEmpresa ).subscribe((res) => {
            this.loading = false;
                
            if(res.status == 200){
              this.toastr.success(null,'Sincronizado com sucesso!');
             }else{
                console.log(res);
              
                this.toastr.warning(null,res.mensagem);
              } 
          }, err => {
            this.loading = false;
            this.toastr.warning(null,'Falha na sincronização');
      });
    }
  });
  }
  

  
}