import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgPopupsService } from 'ng-popups';
import { Component, Input, OnInit } from '@angular/core';
import { CadastrosService } from '../../../cadastros.service';
import flatpickr from 'flatpickr';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-aba-sistema',
  templateUrl: './aba-sistema.component.html',
  styleUrls: ['./aba-sistema.component.scss']
})
export class AbaSistemaComponent implements OnInit {
  
  @Input("idCliente") idCliente: number = -1;

  id: number;
  idClienteSistema: number = 0;
  sucess: string;
  editing: boolean = false;
  submitted: boolean = false;
  loading: boolean = false; 
  frmForm: FormGroup;
  itens: any[] = [];
  page: number = 1;
  total: number = 0;
  limit: number = 10;
  search: string = "";
  error: string = '';
  MostraModalSisVar: boolean = false;

  limitChanged: Subject<number> = new Subject<number>();
  searchChanged: Subject<string> = new Subject<string>();
  dtOptions : any = [];

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private ngPopups: NgPopupsService,
    private cadastroService: CadastrosService,
  ){}

  ngOnInit(): void {
    this.frmForm = this.createForm();
    this.load();
    console.log(this.load());
  }

  createForm(): FormGroup {
    return this.fb.group({
      id:[this.id],
      idCliente:[this.idCliente],
      nomeSistema:['', Validators.required],
      tempoGarantia:[1 , Validators.required],
      dataStartUp:[ , Validators.required],
      dataExpiracao:[],
    });
 }

load():Promise<void>{
  console.log(this.itens);
    return new Promise((resolve) => {
      this.cadastroService.listClienteSistema(this.idCliente).subscribe({
        next: (res) => { 
            this.itens = res;
            this.loading = false; resolve();  
        },
        error:(err) => { console.log(err); resolve() }
      });
    });
  }

 get f() { 
   return this.frmForm.controls; 
 }

 new(){
    var item = {'nomeSistema': '', 'tempoGarantia':'', 'idCliente': this.idCliente, 'dataExpiracao':'', 'dataStartUp':'',  'id':0};
    this.frmForm.patchValue(item);
 }

 delete(id){
  this.ngPopups.confirm('Você deseja excluir o registro?')
  .subscribe(res => {
  if (res) {
      this.cadastroService.deleteClienteSistema(id).subscribe(res =>{
        this.toastr.success('','Deletado com sucesso!');
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
       this.cadastroService.saveClienteSistema(this.frmForm.value).subscribe(res =>{
          this.toastr.success(null,'Gravado com sucesso!');
          this.frmForm.reset();
       }, err => {
         this.toastr.error(err,'ERRO AO GRAVAR');
         this.loading = false;
       });
     }else{
       this.cadastroService.saveClienteSistema(this.frmForm.value).subscribe(res =>{
         this.toastr.success(null,'Gravado com sucesso!');
         this.frmForm.reset();
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
    //Essa funçao recebe o id do cliente sistema para inserção ou edição
    this.idClienteSistema = 0;
    return this.MostraModalSisVar = false;
  }



}
//  save($event) {
    
//     console.log(this.frmForm.value);
//     this.submitted = true;
//     this.toastr.clear();
//     if(this.frmForm.invalid){
//       this.toastr.warning('','Verifique os campos!');      
//     }else{
//       this.loading = true;

//         this.cadastroService.saveClienteSistema(this.frmForm.value).subscribe(res =>{
//           this.toastr.success('','Gravado com sucesso!');
//           this.submitted = false;
//           this.loading = false;
//           this.frmForm.reset();
//           this.loadClienteSistema();
//         }, err => {
//           this.toastr.error(err,'ERRO AO GRAVAR');
//           this.loading = false;
//         });
//       }
//   }

// }
