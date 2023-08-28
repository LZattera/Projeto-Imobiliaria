import { MonitoramentoService } from './../../monitoramento.service';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NG_VALUE_ACCESSOR, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { AppService } from 'src/app/core/services/app.service';
import { CadastrosService } from 'src/app/modules/appcore/cadastros/cadastros.service';
import { FuncoesService } from 'src/app/core/services/funcoes.service';

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
  exportMonitoramento: any = [];

  selGrupoPessoas : number[] = [];
  loading: boolean;
  toastr: any;
  Refresh: any;

  constructor(
    private fb: FormBuilder,
    private cadastroService : CadastrosService,
    private appService : AppService,
    private monitoramentoService : MonitoramentoService,
    private funcoesService : FuncoesService,
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
      idClienteSistemaVariavel : [],
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

  ExportMonitoramento(): void{
    this.loading = true;

    // let idArr = [];
    // this.exportMonitoramento.forEach(item => {
    //   idArr.push(item.id);
    // });

    this.monitoramentoService.ExportMonitoramento(this.frmForm.value).subscribe({
      next:(res) => { 
        // this.Refresh();
          var arquivoBase64 = res.base64;
          var a = document.createElement("a");
          var blob = this.funcoesService.base64ToBlob(arquivoBase64, "text/csv")
          const url = window.URL.createObjectURL(blob);
          a.href = url;
          a.download = res.nome; 
          a.click();
          window.URL.revokeObjectURL(url);
      },
      error:(err) => { this.toastr.error("Erro ao Exportar!"); this.loading = true; }
    });
  }
}
