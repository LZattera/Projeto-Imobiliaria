import { CadastrosService } from './../../cadastros/cadastros.service';
import { AppService } from './../../../../core/services/app.service';
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from './../usuario.service';


@Component({
  selector: 'app-usuario-view',
  templateUrl: './usuario-view.component.html'
})
export class UsuarioViewComponent implements OnInit {
  id: number;
  nome_tela = "Usuario";
  nome_etapa = "View";
  dados: any;
  tiposusuario: any;
  erro: string;
  editing: boolean = false;
  submitted: boolean = false;
  loading: boolean = false; 
  frmForm: UntypedFormGroup;
  apelidoExistente: boolean = false;
  idCliente : number = 0;
  submittedPassword: boolean;
  lstRepresentante: any[] =[];
  lstClientes: any[] =[];
  lstTabelas: any[] =[];
  idEmpresa: number;
  
  constructor(
    private route: ActivatedRoute,
    private fb: UntypedFormBuilder,
    private usuarioService: UsuarioService,
    private toastr: ToastrService,
    private router: Router,
    private appService: AppService,
    private cadastrosService: CadastrosService,
  ) { }

  
  ngOnInit(): void {
    this.idEmpresa = this.appService.getEmpresa();
    this.id = +this.route.snapshot.paramMap.get('id');
    this.frmForm = this.createForm();
    this.loadRepresentantes();
    this.loadClientes();

    if(this.id == 0){
       this.editing = true;
       this.loading = false;
    }else{
      this.load();
      this.loadUsuarioTabela();
    }
  }

  @ViewChild("nome") myInputField: ElementRef;
  ngAfterViewInit() {
    this.myInputField.nativeElement.focus();
  }

  load() {
    this.loading = true;
    this.usuarioService.buscar(this.id).subscribe(res => {
       this.dados = res;
       this.frmForm.patchValue(this.dados);
       console.log(res)
       this.loading = false;
     }, err => {
       this.erro = err;
     });
  }

  loadUsuarioTabela() {
    this.loading = true;
    this.usuarioService.listarUsuarioTabela(this.id).subscribe(res => {
      
       this.lstTabelas = res;
     }, err => {
       this.erro = err;
     });
  }


  loadRepresentantes() {
    this.loading = true;
    this.cadastrosService.listRepresentantes(this.idEmpresa).subscribe(res => {
      console.log(res)
       this.lstRepresentante = res;
     }, err => {
       this.erro = err;
     });
  }

  loadClientes() {
    this.loading = true;
    this.cadastrosService.listarClientesAll(this.idEmpresa).subscribe(res => {
       this.lstClientes = res;
     }, err => {
       this.erro = err;
     });
  }


  LimpaForm(){
    this.frmForm.controls["idCliente"].setValue(null);  
    this.frmForm.controls["idRepresentante"].setValue(null);  
  }


  createForm(): UntypedFormGroup {
     return this.fb.group({
      id : [this.id, Validators.required ],
      nome : ['' ],
      apelido : [''],
      senha : [''],
      email : [''],
      acesso: [''],
      // idRepresentante: [],

      idCliente: [],
      idEmpresa: [this.idEmpresa],
      ativo: [true],
     });
  }

  get f() { 
    return this.frmForm.controls; 
  }

  edit() {
    this.editing = true;
    this.submitted = false;
  }
  SaveTabela(tabela : any){
    this.usuarioService.saveUsuarioTabela(tabela).subscribe(res =>{
          if(res.idRetorno == 0){
            tabela.idUsuarioTabela = null;
          }else{
            tabela.idUsuarioTabela = res.idRetorno;
          }
    }, err => {
      this.toastr.error(err,'ERRO AO GRAVAR');
      this.loading = false;
    });


  }


  save($event) {
    console.log(this.frmForm.value);
    this.submitted = true;

    if(this.id == 0){
      this.submittedPassword = true;
    }

    this.toastr.clear();
    
    if(this.frmForm.invalid || (this.id == 0 && (this.frmForm.value.senha == null ||  this.frmForm.value.senha == ''))){
      this.toastr.warning(null,'Verifique os campos!');      
    }else{
      this.loading = true;
      
      if(this.id != 0){
        this.usuarioService.save(this.frmForm.value).subscribe(res =>{
          if(res.id == -1){
            this.toastr.error('Apelido já existente');
            this.apelidoExistente = true;
          }else{
            this.toastr.success(null,'Gravado com sucesso!');
          }
          this.editing = false;
          this.loading = false;
          this.submitted = false;
        }, err => {
          this.toastr.error(err,'ERRO AO GRAVAR');
          this.loading = false;
        });
      }else{
        this.usuarioService.save(this.frmForm.value).subscribe(res =>{
          if(res.id == -1){
            this.toastr.error('Apelido já existente');
            this.apelidoExistente = true;
          }else{
            this.toastr.success(null,'Gravado com sucesso!');
            this.router.navigate(['appcore/usuario/view/' + res.id]);
          }
          this.loading = false;
        }, err => {
          this.toastr.error(err,'ERRO AO GRAVAR');
          this.loading = false;
        });
      }
    }
    $event.preventDefault();
  }

  verifica($event) {
    console.log(this.frmForm.value)
    this.usuarioService.verificausuario(this.frmForm.value).subscribe(res =>{
      if (res){
        this.toastr.error('Apelido já existente');
        this.apelidoExistente = true;
      }else{
        this.apelidoExistente = false;
      }
    })
  }

}
