import { MonitoramentoService } from './../monitoramento.service';
  import { Component, Input, OnInit } from '@angular/core';
  import { AppService } from './../../../../core/services/app.service';
  import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { CadastrosService } from '../../cadastros/cadastros.service';
import { FormBuilder, FormGroup } from '@angular/forms';
  
  @Component({
    selector: 'app-monitoramento',
    templateUrl: './monitoramento.component.html',
    styleUrls: ['./monitoramento.component.scss']
  })
  export class MonitoramentoComponent implements OnInit {
  
  nome_tela = "Monitoramento";
    itens: any[] = [{}];
    page: number = 1;
    total: number = 0;
    limit: number = 50;
    search: string = "";
    loading: boolean = true;
    error: string = '';
    submitted: boolean;
    idEmpresa:number;
    frmFiltros: FormGroup;
  
  
    limitChanged: Subject<number> = new Subject<number>();
    searchChanged: Subject<string> = new Subject<string>();
    dtOptions : any = [];
  
    constructor(
      private appService: AppService,
      private cadastroService: CadastrosService,
      private monitoramentoService: MonitoramentoService,
      private fb: FormBuilder,
    ) { }
  
    ngOnInit(): void {
      this.idEmpresa = this.appService.getEmpresa();
      console.log('idEmpresa',this.idEmpresa);
      
      this.frmFiltros = this.createForm();

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
    
    createForm(): FormGroup {
      return this.fb.group({
        count : [this.limit],
        page : [this.page],
        // pesquisa : [this.search],
        data : [],
        idClienteVariavel : [],
        idVariavel : [],
        idSetor : [],
        idCliente : [],
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
      this.monitoramentoService.listar(this.frmFiltros.value).subscribe((res) => {
        console.log(res.dados)
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
  
    
  }