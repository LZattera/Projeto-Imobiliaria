import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NG_VALUE_ACCESSOR, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { CadastrosService } from 'src/app/modules/appcore/cadastros/cadastros.service';
import { PessoasService } from 'src/app/modules/appcore/pessoas/pessoas.service';
import { FlatpickrComponent } from '../flatpickr-component/flatpickr.component';
import { GruposenumeracoesService } from 'src/app/modules/appcore/gruposenumeracoes/gruposenumeracoes.service';

@Component({
  standalone: true,
  imports: [ CommonModule, NgSelectModule, ReactiveFormsModule, FormsModule , FlatpickrComponent ],
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => FiltrosComponent),
    }
  ],
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.scss']
})
export class FiltrosComponent implements OnInit {

  @Output('evFiltrar') evFiltrar: EventEmitter<any> = new EventEmitter<any>();

  frmForm: FormGroup;
  lstGrpPessoas: any[] = [];
  lstPessoas: any[] = [];
  lstStatus: any[] = [];



  selGrupoPessoas : number[] = [];

  constructor(
    private fb: FormBuilder,
    private serviceCadastros : CadastrosService,
    private servicePessoas : PessoasService,
    private serviceEnumValores : GruposenumeracoesService
  ) { }

  ngOnInit(): void {
    this.frmForm = this.createForm();
    this.loadGrupoPessoas();
  }

  createForm(): FormGroup {
    return this.fb.group({
      grpPessoas : [null],
      pessoas : [null],
      dataInicial : [],
      dataFinal : [],
    });
  }
  
  loadGrupoPessoas():Promise<void>{
    return new Promise((resolve) => {
      this.serviceCadastros.listAtivoGrpPessoas().subscribe({
        next: (res) => { this.lstGrpPessoas = res; resolve();  },
        error:(err) => { console.log(err); resolve() }
      });
    });
  }

  loadPessoas():Promise<void>{
    return new Promise((resolve) => {
      console.log("Loading ", this.frmForm.value.grpPessoas);
      if(this.frmForm.value.grpPessoas != "null"){
        this.servicePessoas.retornaPessoasPorGrupos(this.frmForm.value).subscribe({
          next: (res) => { this.lstPessoas = res; this.loadStatusGrpPessoas(); resolve();  },
          error:(err) => { console.log(err); resolve() }
        });
      }else{
        resolve();
      }
    });
  }

  loadStatusGrpPessoas():Promise<void>{
    return new Promise((resolve) => {
      console.log("Loading ", this.frmForm.value.grpPessoas);
      
        this.serviceEnumValores.listarValoresPorGrupoPessoas(this.frmForm.value.grpPessoas).subscribe({
          next: (res) => { this.lstStatus = res; resolve();  },
          error:(err) => { console.log(err); resolve() }
        });
      
    });
  }


  filtrar(){

    console.log(this.frmForm.value);
    this.evFiltrar.emit(this.frmForm.value);
  }


}
