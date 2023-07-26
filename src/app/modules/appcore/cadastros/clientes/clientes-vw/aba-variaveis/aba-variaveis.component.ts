import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgPopupsService } from 'ng-popups';
import { Component, Input, OnInit } from '@angular/core';
import { CadastrosService } from '../../../cadastros.service';
@Component({
  selector: 'app-aba-variaveis',
  templateUrl: './aba-variaveis.component.html',
  styleUrls: ['./aba-variaveis.component.scss']
})
export class AbaVariaveisComponent implements OnInit {
  
  @Input("idCliente") idCliente: number = -1;

  id: number;
  erro: string;
  editing: boolean = false;
  submitted: boolean = false;
  loading: boolean = false; 
  frmForm: FormGroup;
  lstClienteVariaveis: any = [];
  lstVariaveis: any = [];
  lstSetores: any = [];
  lstClienteVariavel: any = [];
  

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private ngPopups: NgPopupsService,
    private cadastroService: CadastrosService,
  ){}

  ngOnInit(): void {
    this.frmForm = this.createForm();
     this.loadVariaveis();
    this.loadSetores();
    this.loadClienteVarivel();
  }

  loadClienteVarivel() {
    this.loading = true;
    this.cadastroService.listClienteVariavel(this.idCliente).subscribe(res => {
       this.lstClienteVariavel= res;
       this.loading = false;
     }, err => {
       this.erro = err;
     });
  }
  loadVariaveis() {
    this.loading = true;
    this.cadastroService.listaAtivoVariavel().subscribe(res => {
      console.log("VARIAVEIS",res)
       this.lstVariaveis= res;
       this.loading = false;
     }, err => {
       this.erro = err;
     });
  }
  loadSetores() {
    this.loading = true;
    this.cadastroService.listaAtivoSetor().subscribe(res => {
      console.log("SETORES",res)
       this.lstSetores= res;
       this.loading = false;
     }, err => {
       this.erro = err;
     });
  }


  createForm(): FormGroup {
  
    return this.fb.group({
      id:[this.id],
      idCliente:[this.idCliente],
      idVariavel:['', Validators.required],
      idSetor:['', Validators.required],
      descricao:[null],
    });
 }

 get s() { 
   return this.frmForm.controls; 
 }

 new(){
    var item = {'idVarivel': '', 'idSetor':'', 'idCliente': this.idCliente, 'descricao':'', 'id':0};
    this.frmForm.patchValue(item);
 }

 delete(id){
  this.ngPopups.confirm('Você deseja excluir o registro?')
  .subscribe(res => {
  if (res) {
      this.cadastroService.deleteClienteVariavel(id).subscribe(res =>{
        this.toastr.success('','Deletado com sucesso!');
        this.loadClienteVarivel();
      }, err => {
        this.toastr.error(err,'ERRO AO DELETAR');
      });
    }
  });
}

edit(item){
  this.frmForm.patchValue(item);
}

canceledit(){
  this.frmForm.reset();
}

 save($event) {
  console.log(this.frmForm.value)
   this.submitted = true;
   this.toastr.clear();
   if(this.frmForm.invalid ){
     this.toastr.warning(null,'Verifique os campos!');      
   }else{
     this.loading = true;
     if(this.frmForm.controls["id"].value != 0){
   console.log(this.frmForm.value);
       this.cadastroService.saveClienteVariavel(this.frmForm.value).subscribe(res =>{
          this.toastr.success(null,'Gravado com sucesso!');
          this.frmForm.reset();
          this.loadClienteVarivel();
       }, err => {
         this.toastr.error(err,'ERRO AO GRAVAR');
         this.loading = false;
       });
     }else{
       this.cadastroService.saveClienteVariavel(this.frmForm.value).subscribe(res =>{
         this.toastr.success(null,'Gravado com sucesso!');
         this.frmForm.reset();
         this.loadClienteVarivel();
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
