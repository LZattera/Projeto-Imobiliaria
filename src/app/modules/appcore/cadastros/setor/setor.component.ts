import { Component, Input, OnInit } from '@angular/core';
import { AppService } from './../../../../core/services/app.service';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { CadastrosService } from './../cadastros.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgPopupsService } from 'ng-popups';

@Component({
  selector: 'app-setor',
  templateUrl: './setor.component.html',
  styleUrls: ['./setor.component.scss']
})
export class SetorComponent implements OnInit {


  nome_tela = "Setores";
  nome_etapa = "Listagem";
  itens: any[] = [];
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
    private ngPopups: NgPopupsService,
  ) { }

  ngOnInit(): void {
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
       nome : ['', Validators.required ],
       ativo: [true],
      });
  }

  load():Promise<void>{
    return new Promise((resolve) => {
      this.cadastroService.listarSetor(this.page, this.limit, this.search).subscribe({
        next: (res) => { 
            this.total = res.total;
            this.itens = res.dados;
            this.loading = false; resolve();  
        },
        error:(err) => { console.log(err); resolve() }
      });
    });
  }

  onPageChange($event){
    this.page = $event;
    this.load();
  }

  edit(item){
    this.frmForm.patchValue(item);
    console.log(this.frmForm.value);
  }
  
  get f() { 
    return this.frmForm.controls; 
  }
  
  new(){
    var item = {'nome': '','id': 0, 'ativo': true};
    this.frmForm.patchValue(item);
    console.log(this.frmForm.value);
  }

  canceledit(){
    this.frmForm.reset();
  }

  alterarAtivo($event, id : number){
    this.cadastroService.ativarSetor(id).subscribe(res =>{
     
    }, err => {
      this.toastr.error(err,'ERRO AO ATIVAR');
    });
    
    $event.preventDefault();
  }
  delete(id){
    this.ngPopups.confirm('Você deseja excluir o registro?')
    .subscribe(res => {
    if (res) {
        this.cadastroService.deleteSetor(id).subscribe(res =>{
          this.toastr.success('','Deletado com sucesso!');
          this.load();
        }, err => {
          this.toastr.error(err,'ERRO AO DELETAR');
        });
      }
    });
  }

  save($event) {
    
    console.log(this.frmForm.value);
    this.submitted = true;
    this.toastr.clear();
    if(this.frmForm.invalid){
      this.toastr.warning('','Verifique os campos!');      
    }else{
      this.loading = true;

        this.cadastroService.saveSetor(this.frmForm.value).subscribe(res =>{
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