import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgPopupsService } from 'ng-popups';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CadastrosService } from '../../../cadastros.service';
@Component({
  selector: 'modal-sistema-variaveis',
  templateUrl: './modal-sistema-variaveis.component.html',
  styleUrls: ['./modal-sistema-variaveis.component.scss']
})
export class ModalSistemaVariaveisComponent {
  
  @Input("idClienteSistema") idClienteSistema: number;

  @Output('evFechar')evFechar: EventEmitter<any> = new EventEmitter<any>();

  id: number;
  error: string;
  editing: boolean = false;
  submitted: boolean = false;
  loading: boolean = false; 
  frmForm: FormGroup;
  lstVariaveis: any = [];
  lstSetores: any = [];
  lstClienteSistemaVariavel: any = [];
  itens: any[] = [];
  MostraModalSisVar : boolean = false;
  

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
    this.loadClienteSistemaVarivel();

    this.frmForm = this.createForm();
    // if(this.idClienteSistema != 0){
    //   this.loadClienteSistemaVarivel();
    // }
  }

  loadClienteSistemaVarivel():Promise<void>{
 
    return new Promise((resolve) => {
      this.cadastroService.listClienteSistemaVariavel(this.idClienteSistema).subscribe({
        next: (res) => { 
            this.itens = res;
             console.log(res);
            this.loading = false; resolve();  
        },
        error:(err) => { console.log(err); resolve() }
      });
    });
  }

  loadVariaveis() {
    this.loading = true;
    this.cadastroService.listaAtivoVariavel().subscribe(res => {
      console.log("VARIAVEIS",res)
       this.lstVariaveis= res;
       this.loading = false;
     }, err => {
       this.error = err;
     });
  }
  loadSetores() {
    this.loading = true;
    this.cadastroService.listaAtivoSetor().subscribe(res => {
      console.log("SETORES",res)
       this.lstSetores= res;
       this.loading = false;
     }, err => {
       this.error = err;
     });
  }


  createForm(): FormGroup {
    return this.fb.group({
      id:[, Validators.required],
      idClienteSistema : [this.idClienteSistema, Validators.required],
      idVariavel:['', Validators.required],
      idSetor:['', Validators.required],
      descricao:[null],
    });
 }

 get s() { 
   return this.frmForm.controls; 
 }

 new(){
    var item = {'idVarivel': '', 'idSetor':'', 'idClienteSistema': this.idClienteSistema, 'descricao':'', 'id':0};
    this.frmForm.patchValue(item);
 }

 delete(id){
  this.ngPopups.confirm('Você deseja excluir o registro?')
  .subscribe(res => {
  if (res) {
      this.cadastroService.deleteClienteSistemaVariavel(id).subscribe(res =>{
        this.toastr.success('','Deletado com sucesso!');
        this.loadClienteSistemaVarivel();
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
       this.cadastroService.saveClienteSistemaVariavel(this.frmForm.value).subscribe(res =>{
          this.toastr.success(null,'Gravado com sucesso!');
          this.frmForm.reset();
          this.loadClienteSistemaVarivel();
       }, err => {
         this.toastr.error(err,'ERRO AO GRAVAR');
         this.loading = false;
       });
     }else{
       this.cadastroService.saveClienteSistemaVariavel(this.frmForm.value).subscribe(res =>{
         this.toastr.success(null,'Gravado com sucesso!');
         this.frmForm.reset();
         this.loadClienteSistemaVarivel();
         this.loading = false;
       }, err => {
         this.toastr.error(err,'ERRO AO GRAVAR');
         this.loading = false;
       });
      }
   }
   $event.preventDefault();
 }

abreModalSisVar(idClienteSistema : number){
    //Essa funçao recebe o id do cliente sistema para inserção ou edição
    this.idClienteSistema = idClienteSistema;
    this.MostraModalSisVar = true;
  }

fechaModalSisVar(){
    this.evFechar.emit();
  }

}
