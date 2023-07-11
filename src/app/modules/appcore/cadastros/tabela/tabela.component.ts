import { Component, Input, OnInit } from '@angular/core';
import { AppService } from './../../../../core/services/app.service';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { CadastrosService } from './../cadastros.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.scss']
})
export class TabelaComponent implements OnInit {

  nome_tela = "Tabela";
  nome_etapa = "Listagem";
  itens: any[] = [{}];
  page: number = 1;
  total: number = 0;
  limit: number = 10;
  search: string = "";
  loading: boolean = true;
  error: string = '';
  submitted: boolean;

  mostraModal: string;
  idTabela: number = 0;
  idEmpresa: number;

  limitChanged: Subject<number> = new Subject<number>();
  searchChanged: Subject<string> = new Subject<string>();
  dtOptions : any = [];
  frmForm: FormGroup;

  constructor(
    private appService: AppService,
    private cadastroService: CadastrosService,
    private fb: FormBuilder,
    private toastr : ToastrService, 
  ) { }

  ngOnInit(): void {
    this.idEmpresa = this.appService.getEmpresa();
    this.dtOptions = this.appService.getConfigDataTable();
    this.frmForm = this.createForm();
    
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
       id : [-1],
       idEmpresa : [this.idEmpresa],
       nome : ['', Validators.required ],
       codigo : ['', Validators.required ],
       ativo: [true],
      });
  }

  load(){
    this.loading = true;
    this.cadastroService.listarTabela(this.idEmpresa, this.page, this.limit, this.search).subscribe((res) => {
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

  fecharModal() {
    this.idTabela = 0;
    this.load();
    return this.mostraModal = '';
  } 

  MostraModal(idTabela){
    this.idTabela = idTabela;
    return this.mostraModal = 'TabelaProduto';
  }


  edit(item){
    this.frmForm.patchValue(item);
    console.log(this.frmForm.value);
  }
  
  get f() { 
    return this.frmForm.controls; 
  }
  
  new(){
    var item = {'nome': '', 'codigo':'', 'idEmpresa': this.idEmpresa, 'id': 0, 'ativo': true};
    this.frmForm.patchValue(item);
  }

  canceledit(){
    this.frmForm.reset();
  }

    alterarAtivo($event, id : number){
    this.cadastroService.ativarTabela(id).subscribe(res =>{
     
    }, err => {
      this.toastr.error(err,'ERRO AO ATIVAR');
    });
    
    $event.preventDefault();
  }


   save($event) {
    
    console.log(this.frmForm.value);
    this.submitted = true;
    this.toastr.clear();
    if(this.frmForm.invalid){
      this.toastr.warning('','Verifique os campos!');      
    }else{
      this.loading = true;

        this.cadastroService.saveTabela(this.frmForm.value).subscribe(res =>{
          this.toastr.success('','Gravado com sucesso!');
          this.submitted = false;
          this.loading = false;
          this.frmForm.reset();
          this.load();
        }, err => {
          this.toastr.error(err,'ERRO AO GRAVAR');
          this.loading = false;
        });
      }
  }
  
}