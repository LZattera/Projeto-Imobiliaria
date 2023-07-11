import { Component, EventEmitter, Input, OnInit,ViewChild, Output,ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { CidadeService } from './../cidade.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cidade',
  templateUrl: './cidade.component.html',
  styleUrls: ['./cidade.component.scss']
})
export class CidadeComponent implements OnInit {

  
  @Input() idCidade : number = 0;
  @Input() idEmpresa : number = 0;
  @Output() fechaModal = new EventEmitter;
  
  frmForm: UntypedFormGroup;
  loading: boolean;
  editing: boolean;
  submitted: boolean;
  dados: any;
  erro: any;

  constructor(
    private route: ActivatedRoute,
    private fb: UntypedFormBuilder,
    private cidadeService: CidadeService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if(this.idCidade != 0){
      this.load();
    }

    this.frmForm = this.createForm();
    console.log(this.idCidade);
  }

  load() {
    this.loading = true;
    this.cidadeService.buscar(this.idCidade).subscribe(res => {
       this.dados = res;
       this.frmForm.patchValue(res);
       this.loading = false;
     }, err => {
       this.erro = err;
     });
  }

  createForm(): UntypedFormGroup {
    return this.fb.group({
      id:[this.idCidade,Validators.required],
      idEmpresa:[this.idEmpresa,Validators.required],
      nome : ['', Validators.required],
      uf : ['', Validators.required],
     
    });
 }
 get f() {
  return this.frmForm.controls;
}

 save($event) {
  this.submitted = true;
  this.toastr.clear();
  console.log(this.frmForm.value);

  if(this.frmForm.invalid){
    this.toastr.warning(null,'VERIFIQUE OS CAMPOS');      
  }else{
    
    this.loading = true;
    if(this.idCidade != 0){
      this.cidadeService.editar(this.idCidade,this.frmForm.value).subscribe(res =>{
        this.fechaModal.emit();
        this.editing = false;
        this.toastr.success(null,'GRAVADO COM SUCESSO');
        this.loading = false;
      }, err => {
        
        this.toastr.error(err,'ERRO AO GRAVAR');
        this.loading = false;
      });
    }else{
      this.cidadeService.adicionar(this.frmForm.value).subscribe(res =>{
        this.fechaModal.emit();
        this.toastr.success(null,'GRAVADO COM SUCESSO');
      }, err => {
        this.toastr.error(err,'ERRO AO GRAVAR');
        this.loading = false;
      });
    }
  }
  
  $event.preventDefault();
}
fecharModal(){
  this.fechaModal.emit();
}

}
