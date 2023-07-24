import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NG_VALUE_ACCESSOR, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { AppService } from 'src/app/core/services/app.service';
import { CadastrosService } from 'src/app/modules/appcore/cadastros/cadastros.service';

@Component({
  selector: 'app-filtrosmonitoramento',
  templateUrl: './filtrosmonitoramento.component.html',
  styleUrls: ['./filtrosmonitoramento.component.scss']
})
export class FiltrosmonitoramentoComponent implements OnInit {


  @Output('evFiltrar') evFiltrar: EventEmitter<any> = new EventEmitter<any>();

  frmForm: FormGroup;
  lstRepresentantes: any[] = [];
  lstVariaveis: any = [];
  lstSetor: any = [];
  lstClientes: any = [];
  idCliente:number = null;
  idEmpresa:number = null;

  selGrupoPessoas : number[] = [];

  constructor(
    private fb: FormBuilder,
    private cadastroService : CadastrosService,
    private appService : AppService,
  ) { }

  ngOnInit(): void {
    this.idEmpresa = this.appService.getEmpresa();
    this.idCliente = this.appService.getCliente();
    console.log("Cliente Logado ->",this.idCliente)
    this.frmForm = this.createForm();
    var filtros = JSON.parse(localStorage.getItem('usafFiltros'));
    this.frmForm.patchValue(filtros);

    console.log(this.frmForm.value);

    
     this.loadVariaveis();
     this.loadClientes();
     this.loadSetor();
  }

  createForm(): FormGroup {
    return this.fb.group({
      idClienteVariavel : [],
      idSetor : [],
      idCliente : [],
      idVariavel : [],
      data : [],
    });
  }
  
  loadVariaveis():Promise<void>{
    return new Promise((resolve) => {
      this.cadastroService.listaAtivoVariavel().subscribe({
        next: (res) => { this.lstVariaveis = res; resolve();  },
        error:(err) => { console.log(err); resolve() }
      });
    });
  }

  loadClientes():Promise<void>{
    return new Promise((resolve) => {
      this.cadastroService.listarClientesAll(this.idEmpresa).subscribe({
        next: (res) => { this.lstClientes = res; resolve();  },
        error:(err) => { console.log(err); resolve() }
      });
    });
  }

  loadSetor():Promise<void>{
    return new Promise((resolve) => {
      this.cadastroService.listaAtivoSetor().subscribe({
        next: (res) => { this.lstSetor = res; resolve();  },
        error:(err) => { console.log(err); resolve() }
      });
    });
  }

  filtrar(){
    console.log(this.frmForm.value);
    this.evFiltrar.emit(this.frmForm.value);
  }


}
