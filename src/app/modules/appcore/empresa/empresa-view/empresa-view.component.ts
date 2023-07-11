import { Component, ViewChild, ElementRef, OnInit, Output, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EmpresaService } from './../empresa.service';
import * as _ from 'lodash-es';
import {CidadeService} from '../../../../shared/components/cidade/cidade.service';
import { AppService } from 'src/app/core/services/app.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';
import flatpickr from 'flatpickr';
import { Portuguese } from 'flatpickr/dist/l10n/pt';
import { NgPopupsService } from 'ng-popups';

@Component({
  selector: 'app-empresa-view',
  templateUrl: './empresa-view.component.html',
  styleUrls: ['./empresa-view.component.scss']
})
export class EmpresaViewComponent implements OnInit {
  id: number;
  nome_tela = "Empresa";
  nome_etapa = "Listagem";
  dados: any;
  erro: string;
  editing: boolean = false;
  submitted: boolean = false;
  loading: boolean = false;
  frmForm: UntypedFormGroup;
  idEdit: number = 0;
  imageError: string;
  
  itens: any[] = [];
  page: number = 1;
  total: number = 0;
  limit: number = 10;
  search: string = '';
  frmFormTurno: UntypedFormGroup;
  
  limitChanged: Subject<number> = new Subject<number>();
  searchChanged: Subject<string> = new Subject<string>();
  
  idCalendarios: string[] = ['inicio', 'fim'];

  constructor(
    private route: ActivatedRoute,
    private fb: UntypedFormBuilder,
    private empresaService: EmpresaService,
    private toastr: ToastrService,
    private cidadeService: CidadeService,
    private appService: AppService,
    private router: Router,
    private ngPopups: NgPopupsService,
  ) { }

  ngOnInit(): void {
    this.id = 1;
    this.frmForm = this.createForm();

    this.load();

  }

  @ViewChild("nome") myInputField: ElementRef;
  ngAfterViewInit() {
    this.myInputField.nativeElement.focus();
  }

  load() {
    this.loading = true;
    this.empresaService.buscar(this.id).subscribe(res => {
      console.log(res)
      this.dados = res;
      this.frmForm.patchValue(res);
      this.loading = false;
    }, err => {
      this.erro = err;
    });
  }

  // loadTurnos(){
  //   this.loading = true;
  //     this.turnoService.listar(this.page, this.limit, this.search).subscribe((res) => {
  //       console.log('Maquinas ->', res);
  //       this.total = res.total;
  //       this.itens = res.dados;
  //       this.loading = false;
  //     }, err => {
  //       this.loading = false;
  //     });
  // }

  createForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.id, Validators.required],
      nome: ['', Validators.required],
      email: [''],
      emailNotificacao: [''],
    });
  }

  editTurno(item){
    this.frmFormTurno.patchValue(item);
    setTimeout(() => {
      this.datepick();
    }, 100);
    console.log(this.frmFormTurno.value);
  }

  createFormTurno(): UntypedFormGroup {
    return this.fb.group({
     id : [-1],
     nome: ['', Validators.required],
     inicio: ['', Validators.required],
     fim: ['', Validators.required],
     intervalo: [0],
     descricao: [''],
     ativo: [true],
    });
 }

  newTurno(){
    var item = {'id': 0, 'nome': '', 'inicio': '', 'fim': '', 'intervalo': 0, 'descricao': '', 'ativo': true};
    this.frmFormTurno.patchValue(item);
    setTimeout(() => {
      this.datepick();
    }, 100);
  }

  canceledit(){
    this.frmFormTurno.reset();
  }

  get f() {
    return this.frmForm.controls;
  }

  get ft() {
    return this.frmFormTurno.controls;
  }

  edit() {
    this.editing = true;
    this.submitted = false;
  }

  save($event) {
    this.submitted = true;
    this.toastr.clear();
    if (this.frmForm.invalid) {
      this.toastr.warning(null, 'Verifique os campos!');
    } else {
      this.loading = true;
      this.frmForm.value.idCidade = +this.frmForm.value.idCidade;
      this.frmForm.value.numero = +this.frmForm.value.numero;
      if (this.id != 0) {
        this.empresaService.editar(this.id, this.frmForm.value).subscribe(res => {
          this.editing = false;
          this.toastr.success(null, 'Gravado com sucesso');
          this.loading = false;
        }, err => {
          this.toastr.error(err, 'ERRO AO GRAVAR');
          this.loading = false;
        });
      }
    }
    $event.preventDefault();
  }

  saveTurno() {
    console.log(this.frmFormTurno.value);
    this.submitted = true;
    this.toastr.clear();
    if(this.frmFormTurno.value.intervalo == null || this.frmFormTurno.value.intervalo ==  ''){
      this.frmFormTurno.value.intervalo = 0;
    }

    if(this.frmFormTurno.invalid){
      this.toastr.warning(null,'Verifique os campos!');      
    }else{
      this.loading = true;

     

      

    }
  }

  

  datepick(){
    this.idCalendarios.forEach(element => {
      flatpickr("#" + element, {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
        time_24hr: true
      });
    });
  }

  consolelog(e){
    console.log(e)
  }

 
}
