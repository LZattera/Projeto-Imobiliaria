import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UntypedFormGroup, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormAutoBuilder } from 'src/app/core/services/FormAutoBuilder.service';
import { CadastrosService } from '../../cadastros.service';
import { FuncoesService } from 'src/app/core/services/funcoes.service';
import { AppService } from 'src/app/core/services/app.service';

@Component({
  selector: 'app-produtos-view',
  templateUrl: './produtos-view.component.html',
  styleUrls: ['./produtos-view.component.scss']
})
export class ProdutosViewComponent implements OnInit {
  frm : FormGroup;

  @Input('idProduto') idProduto: number = -1;

  @Output('evFechar')evFechar: EventEmitter<any> = new EventEmitter<any>();

  mostrar : boolean = false;
  loading: boolean;

  erro: any;
  editing: boolean = false;
  submitted: boolean = false;
  fecharModa: any = [];
  lstNcm: any[] = [];
  idEmpresa:number;
  PerfilAcesso:number;

   //Imagem
   cardImageBase64: string = "";
   isImageSaved: boolean = false;
   imageError: string;
   nameFile: string = "Nenhum arquivo Selecionado";

  constructor(
    private toastr: ToastrService,
    private cadastroservice: CadastrosService,
    private FuncoesService: FuncoesService,
    private appService: AppService,
  ) { }

  ngOnInit(): void {
    this.idEmpresa = this.appService.getEmpresa();
    this.PerfilAcesso = this.appService.getAcesso();

    console.log('produto',this.idProduto)
    this.createForm();
    this.loadNCM();
    if(this.idProduto != 0){
      this.load();
    }
  }

  loadModal() {
    this.loading = true;
  }

  fecharModal(){
    this.evFechar.emit();
  }

  load() {
    console.log('LOAD PRODUTO',this.idProduto)
    this.loading = true;
    this.cadastroservice.buscarProduto(this.idProduto).subscribe(res => {
       this.frm.patchValue(res);
       if (res.foto != "") {
        this.isImageSaved = true;
        this.cardImageBase64 = res.foto;
      }
       this.loading = false;
     }, err => {
       this.erro = err;
     });
  }

  loadNCM(){
    this.cadastroservice.listNcm(this.idEmpresa).subscribe(res=>{
      this.lstNcm = res;
    }), err => {
      this.erro = err;
    }
  }

  load_image(fileInput: any) {
    this.FuncoesService.loadImage(fileInput).then((retorno) => {
      if (retorno.codigo == "OK") {
        this.nameFile = fileInput.target.files[0].name;
        this.cardImageBase64 = retorno.arquivo;
        this.isImageSaved = true;
        this.frm.value.logo = retorno.arquivo;
      } else {
        this.toastr.error(null, retorno.msg);
      }
    });
  }

  remove_image() {
    this.cardImageBase64 = "";
    this.nameFile = "Nenhum arquivo Selecionado";
    this.isImageSaved = false;
  }
  
  createForm(): void {
    this.frm = new FormAutoBuilder(new Papeis, ["idEmpresa", "idNcm", "unidadeMedida"]).GetForm();
    this.frm.controls.id.setValue(this.idProduto);
    console.log(this.idEmpresa)
    this.frm.controls.idEmpresa.setValue(this.idEmpresa);
  }

  get p(){
    return this.frm.controls;
  }

  new(){
    var item = {'id': this.idProduto, 'idEmpresa':this.idEmpresa,'codigo':'', 'codigoAlternativo':'','nome':'','descricao':'', 
    'idNcm':'','unidadeMedida':'','foto':'','link':'','ativo': true};
    this.frm.patchValue(item);
  }

  save($event) {
    console.log(this.frm.value);
    this.submitted = true;
    this.toastr.clear();
    if(this.frm.invalid ){
      this.toastr.warning(null,'Verifique os campos!');      
    }else{
      console.log(this.cardImageBase64)
      this.frm.value.foto = this.cardImageBase64;
      this.loading = true;
      if(this.idProduto > 0){
        this.cadastroservice.saveProduto(this.frm.value).subscribe(res =>{
            this.toastr.success(null,'Gravado com sucesso!');
          this.editing = false;
          this.loading = false;
          this.submitted = false;
          this.fecharModal();
        }, err => {
          this.toastr.error(err,'ERRO AO GRAVAR - EDICAO');
          this.loading = false;
        });
      }else{
        this.cadastroservice.saveProduto(this.frm.value).subscribe(res =>{
          this.toastr.success(null,'Gravado com sucesso!');
          this.loading = false;
          this.fecharModal();
        }, err => {
          this.toastr.error(err,'ERRO AO GRAVAR');
          this.loading = false;
        });
      }
    }
    $event.preventDefault();
  }

}

class Papeis{
  id : number = null;
  idEmpresa:number = null;
  codigo: string = null;
  codigoAlternativo: string = null;
  nome: string = null;
  descricao: string = null;
  idNcm: number = null;
  unidadeMedida: string = null;
  foto: string = null;
  link: string = null;
  ativo: number = null;
}
