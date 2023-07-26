import { Component, ViewChild, ElementRef, OnInit, Output, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash-es';
import { AppService } from 'src/app/core/services/app.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';
import flatpickr from 'flatpickr';
import { Portuguese } from 'flatpickr/dist/l10n/pt';
import { NgPopupsService } from 'ng-popups';
import { EmpresaService } from '../../../empresa/empresa.service';
import { CidadeService } from 'src/app/shared/components/cidade/cidade.service';
import { CadastrosService } from '../../cadastros.service';

@Component({
  selector: 'app-clientes-vw',
  templateUrl: './clientes-vw.component.html',
  styleUrls: ['./clientes-vw.component.scss']
})
export class ClientesVwComponent implements OnInit {
  id: number;
  idEmpresa: number;
  nome_tela = "Cliente";
  nome_etapa = "Editar";
  dados: any;
  erro: string;
  editing: boolean = false;
  submitted: boolean = false;
  loading: boolean = false;
  frmForm: UntypedFormGroup;
  
  itens: any[] = [];
  page: number = 1;
  total: number = 0;
  limit: number = 10;
  search: string = '';
  
  limitChanged: Subject<number> = new Subject<number>();
  searchChanged: Subject<string> = new Subject<string>();
  
  constructor(
    private route: ActivatedRoute,
    private fb: UntypedFormBuilder,
    private toastr: ToastrService,
    private cadastrosService: CadastrosService,
    private appService: AppService,
  ) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('idCliente');
    this.idEmpresa = +this.appService.getEmpresa();

    console.log("IDCLIENTE",this.id)
    this.frmForm = this.createForm();

    if(this.id > 0){
      this.load();
    }

  }
  
  load() {
    this.loading = true;
    this.cadastrosService.buscarClientes(this.id).subscribe(res => {
      console.log(res)
      this.dados = res;
      this.frmForm.patchValue(res);
      this.loading = false;
    }, err => {
      this.erro = err;
    });
  }

  createForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.id, Validators.required],
      idEmpresa: [this.idEmpresa, Validators.required],
      codigo: ['', Validators.required],
      email: [''],
      nomeCidade: [''],
      razaoSocial: ['', Validators.required],
      nomeFantasia: [''],
      telefone: [''],
      celular: [''],
      nomeContato: [''],
      endereco: [''],
      bairro: [''],
      numero: [''],
      cep: [''],
      uf: [''],
    });
  }

  get f() {
    return this.frmForm.controls;
  }

  save($event) {
    console.log(this.frmForm.value);
    this.submitted = true;
    this.toastr.clear();
    if (this.frmForm.invalid) {
      this.toastr.warning(null, 'Verifique os campos!');
    } else {
      this.loading = true;
     
        this.cadastrosService.saveCliente(this.frmForm.value).subscribe(res => {
          this.editing = false;
          this.toastr.success(null, 'Gravado com sucesso');
          this.loading = false;
        }, err => {
          this.toastr.error(err, 'ERRO AO GRAVAR');
          this.loading = false;
        });
      
    }
    $event.preventDefault();
  }

  
}


