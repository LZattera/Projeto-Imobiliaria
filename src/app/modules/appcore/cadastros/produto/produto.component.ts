import { Component, Input, OnInit } from '@angular/core';
import { AppService } from './../../../../core/services/app.service';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { CadastrosService } from './../cadastros.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss']
})
export class ProdutoComponent implements OnInit {

  nome_tela = "Produtos";
  nome_etapa = "Listagem";
  itens: any[] = [{}];
  page: number = 1;
  total: number = 0;
  limit: number = 10;
  search: string = "";
  loading: boolean = true;
  error: string = '';
  mostraModal: string = '';
  submitted: boolean;
  idProduto: number;
  idEmpresa: number ;
  PerfilAcesso: number ;


  limitChanged: Subject<number> = new Subject<number>();
  searchChanged: Subject<string> = new Subject<string>();
  dtOptions : any = [];

  constructor(
    private appService: AppService,
    private cadastroService: CadastrosService,
  ) { }


  ngOnInit(): void {
    this.idEmpresa = this.appService.getEmpresa();
    this.PerfilAcesso = this.appService.getAcesso();

    this.dtOptions = this.appService.getConfigDataTable();
    
    this.searchChanged.pipe(debounceTime(500)).pipe(distinctUntilChanged()).subscribe(value => {
      this.page = 1;
      this.search = value;
      this.load();
    });

    this.limitChanged.pipe(debounceTime(500)).pipe(distinctUntilChanged()).subscribe(value => {
      this.page = 1;
      this.limit = value;
      this.load();
    });

    this.load();
  }
  
  load(){
    this.loading = true;
    this.cadastroService.listarProdutos(this.idEmpresa, this.page, this.limit, this.search).subscribe((res) => {
      console.log(res)
      this.total = res.total;
      this.itens = res.dados;
      this.loading = false;
    }, err => {
      this.error = err;
      this.loading = false;
    });
  }
  
  onPageChange($event){
    this.page = $event;
    this.load();
  }

  MostraModal(idProduto){
    this.idProduto = idProduto;
    return this.mostraModal = "Produtos";
  }

  fecharModal() {
    this.load();
    return this.mostraModal = '';
  } 
  
}