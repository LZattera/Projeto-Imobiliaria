import { Component, Input, OnInit } from '@angular/core';
import { AppService } from './../../../../core/services/app.service';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { CadastrosService } from './../cadastros.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

nome_tela = "Clientes";
  nome_etapa = "Listagem";
  itens: any[] = [{}];
  page: number = 1;
  total: number = 0;
  limit: number = 50;
  search: string = "";
  loading: boolean = true;
  error: string = '';
  submitted: boolean;
  idEmpresa:number;


  limitChanged: Subject<number> = new Subject<number>();
  searchChanged: Subject<string> = new Subject<string>();
  dtOptions : any = [];

  constructor(
    private appService: AppService,
    private cadastroService: CadastrosService,
  ) { }

  ngOnInit(): void {
    this.idEmpresa = this.appService.getEmpresa();
    console.log('idEmpresa',this.idEmpresa);
    
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
    this.cadastroService.listarClientes(this.idEmpresa, this.page, this.limit, this.search).subscribe((res) => {
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

  
}