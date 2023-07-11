import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AppService } from 'src/app/core/services/app.service';
import { CadastrosService } from '../../cadastros.service';

@Component({
  selector: 'app-tabela-produto',
  templateUrl: './tabela-produto.component.html',
  styleUrls: ['./tabela-produto.component.scss']
})
export class TabelaProdutoComponent implements OnInit {
  @Input('idTabela') idTabela: number = -1;

  @Output('evFechar')evFechar: EventEmitter<any> = new EventEmitter<any>();

  itens: any[] = [{}];
  page: number = 1;
  limit: number = 10;
  search: string = "";
  loading: boolean = true;
  error: string = '';
  submitted: boolean;

  limitChanged: Subject<number> = new Subject<number>();
  searchChanged: Subject<string> = new Subject<string>();
  dtOptions : any = [];

  constructor(
    private appService: AppService,
    private cadastroService: CadastrosService,
  ) { }

  ngOnInit(): void {

    this.dtOptions = this.appService.getConfigDataTable();
    
    this.searchChanged.pipe(debounceTime(500)).pipe(distinctUntilChanged()).subscribe(value => {
      this.page = 1;
      this.search = value;
      this.load();
    });

    // this.limitChanged.pipe(debounceTime(500)).pipe(distinctUntilChanged()).subscribe(value => {
    //   this.page = 1;
    //   this.limit = value;
    //   this.load();
    // });

    this.load();
  }
  
  load(){
    this.loading = true;
    this.cadastroService.listarTabelaProduto(this.idTabela,this.search).subscribe((res) => {
      console.log(res)
      this.itens = res;
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

  fecharModal(){
    this.evFechar.emit();
  }
  
}