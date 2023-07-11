import { FotosItensService } from './../fotos-itens.service';
import { Component, EventEmitter, Input, OnInit,ViewChild, Output,ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.component.html',
  styleUrls: ['./fotos.component.scss']
})
export class FotosComponent implements OnInit {

  @Input() idOsItem : number = 0;
  @Input() idObraItem : number = 0;
  
  loading: boolean;
  editing: boolean;
  submitted: boolean;
  fotos: any;
  erro: any;

  constructor(
    private fb: FormBuilder,
    private fotosService: FotosItensService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    if(this.idOsItem != 0 ){
      this.buscarFotosItemOS();
    }
  }

  buscarFotosItemOS() {
    this.loading = true;
    this.fotosService.buscarFotosItemOS(this.idOsItem).subscribe(res => {
       this.fotos = res;
       this.loading = false;
     }, err => {
       this.erro = err;
     });
  }

}
