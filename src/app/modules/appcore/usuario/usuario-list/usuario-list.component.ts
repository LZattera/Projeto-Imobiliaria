import { AppService } from './../../../../core/services/app.service';
import { Component, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html'
})
export class UsuarioListComponent implements OnInit {
  nome_tela = "Usuario";
  nome_etapa = "Listagem";
  itens: any[] = [];
  page: number = 1;
  total: number = 0;
  limit: number = 10;
  search: string = '';
  loading: boolean = true;
  ativos: boolean = true;
  error: string = '';

  idCliente : number = 0;
  perfil: any = {};
  empresas: any = {};

  limitChanged: Subject<number> = new Subject<number>();
  searchChanged: Subject<string> = new Subject<string>();

  dtOptions : any =[];

  constructor(
    private usuarioService : UsuarioService,
    private toastr : ToastrService, 
    private appService: AppService,
    private router: Router,
  ) { }

  ngOnInit(): void {
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
  
  buscarTodos(){
    this.ativos = !this.ativos;
    this.load();
  }


  load(){
    this.loading = true;
    this.usuarioService.listar(this.idCliente, this.page, this.limit, this.search, this.ativos).subscribe((res) => {
      console.log('Usuarios ->', res);
      this.total = res.total;
      this.itens = res.dados;
      this.loading = false;
    }, err => {
      this.error = err;
      this.loading = false;
    });
  }

  delete(id) {
    if(confirm('Você deseja excluir o registro?')){
      this.usuarioService.delete(id).subscribe(res =>{
        console.log('Retorno delete', res);
        this.toastr.success(null,'DELETADO COM SUCESSO');
        this.load();
      }, err => {
        this.toastr.error(err,'ERRO AO DELETAR');
      });
      
    }
  }
  onPageChange($event){
    this.page = $event;
    this.load();
  }

  alterarAtivo($event,  id : number){
    this.usuarioService.ativar(id).subscribe(res =>{
     
    }, err => {
      this.toastr.error(err,'ERRO AO ATIVAR');
    });
    
    $event.preventDefault();
  }
}
