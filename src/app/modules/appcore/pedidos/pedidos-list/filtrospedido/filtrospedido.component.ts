import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NG_VALUE_ACCESSOR, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { AppService } from 'src/app/core/services/app.service';
import { CadastrosService } from 'src/app/modules/appcore/cadastros/cadastros.service';

@Component({
  selector: 'app-filtrospedido',
  templateUrl: './filtrospedido.component.html',
  styleUrls: ['./filtrospedido.component.scss']
})
export class FiltrospedidoComponent implements OnInit {

  @Output('evFiltrar') evFiltrar: EventEmitter<any> = new EventEmitter<any>();

  frmForm: FormGroup;
  lstRepresentantes: any[] = [];
  lstClientes: any[] = [];
  lstStatus: any = [];
  idEmpresa:number;
  PerfilAcesso:number;
  idUsuario:number;
  idCliente:number = null;
  idRepresentante:number = null;


  selGrupoPessoas : number[] = [];

  constructor(
    private fb: FormBuilder,
    private cadastroService : CadastrosService,
    private appService : AppService,
  ) { }

  ngOnInit(): void {
    this.PerfilAcesso = this.appService.getAcesso();
    this.idEmpresa = this.appService.getEmpresa();
    this.idUsuario = this.appService.getUsuario();
    this.idCliente = this.appService.getCliente();
     this.idRepresentante = +this.appService.getRepresentante();
    console.log("Cliente Logado ->",this.idCliente)
    this.frmForm = this.createForm();
    var filtros = JSON.parse(localStorage.getItem('usafFiltros'));
    this.frmForm.patchValue(filtros);
    if(this.idCliente != null && this.PerfilAcesso == 4){
      this.frmForm.controls["idCliente"].setValue(+this.idCliente);
    }else{
      this.idCliente = null;
    }
    if(this.idRepresentante != null && this.PerfilAcesso != 1 && this.PerfilAcesso != 2){
      this.frmForm.controls["idRepresentante"].setValue(+this.idRepresentante);
    }else{
      this.idRepresentante = null;
    }
    console.log(this.frmForm.value);

    
     this.loadRepresentantes();
     this.loadClientes();
     this.loadStatus();
  }

  createForm(): FormGroup {
    return this.fb.group({
      idRepresentante : [this.idRepresentante],
      idStatus : [2],
      idCliente : [this.idCliente],
      tipoData : ["CAD"],
      dataInicial : [],
      dataFinal : [],

    });
  }
  
  loadRepresentantes():Promise<void>{
    return new Promise((resolve) => {
      this.cadastroService.listRepresentantes(this.idEmpresa).subscribe({
        next: (res) => { this.lstRepresentantes = res; resolve();  },
        error:(err) => { console.log(err); resolve() }
      });
    });
  }

  loadClientes():Promise<void>{
    return new Promise((resolve) => {
      this.cadastroService.listClientesRepresentante(this.idEmpresa, this.idUsuario).subscribe({
        next: (res) => { this.lstClientes = res; resolve();  },
        error:(err) => { console.log(err); resolve() }
      });
    });
  }

  loadStatus():Promise<void>{
    return new Promise((resolve) => {
      this.cadastroService.listAtivoStatus().subscribe({
        next: (res) => { console.log(res); this.lstStatus = res; resolve();  },
        error:(err) => { console.log(err); resolve() }
      });
    });
  }

  // loadPessoas():Promise<void>{
  //   return new Promise((resolve) => {
  //     console.log("Loading ", this.frmForm.value.grpPessoas);
  //     if(this.frmForm.value.grpPessoas != "null"){
  //       this.servicePessoas.retornaPessoasPorGrupos(this.frmForm.value).subscribe({
  //         next: (res) => { this.lstPessoas = res; this.loadStatusGrpPessoas(); resolve();  },
  //         error:(err) => { console.log(err); resolve() }
  //       });
  //     }else{
  //       resolve();
  //     }
  //   });
  // }


  filtrar(){
    console.log(this.frmForm.value);
    this.evFiltrar.emit(this.frmForm.value);
  }


}
