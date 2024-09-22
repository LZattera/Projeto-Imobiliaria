import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConexaoApiService } from '../../appcore/conexao-api.service'
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'list-imoveis',
  templateUrl: './list-imoveis.component.html',
  styleUrls: ['./list-imoveis.component.scss']
})
export class ListImoveisComponent implements OnInit {
 fields = ['Bairro', 'ValorVenda', 'Cidade','FotoDestaquePequena'];

 filter=[
   { Bairro: 'Desvio Rizzo' },
 ]

 lstImoveis: any[] = [];
 lstBairros: any[] = [
                       '2 Legua',
                       '3 Legua',
                       '7 Legua',
                       '9 Legua',
                       'Abramo Suzin',
                       'Altos do Seminario',
                       'Ana Rech',
                       'Apanhador',
                       'Arco Baleno',
                       'Área Rural de Caxias do Sul',
                       'Bela Vista',
                       'Bom Pastor',
                       'Brandalise',
                       'Campos da Serra',
                       'Capivari',
                       'Castelo',
                       'Centenário',
                       'Centro',
                       'Charqueadas',
                       'Cidade Industrial',
                       'Cidade Nova',
                       'Cinquentenário',
                       'Colina do Sol',
                       'Colina Sorriso',
                       'Conceição',
                       'Cristo Redentor',
                       'Criúva',
                       'Criuva',
                       'Cruzeiro',
                       'De Lazzer',
                       'De Zorzi',
                       'Desvio Rizzo',
                       'Diamantino',
                       'Distrito Industrial',
                       'Esplanada',
                       'Exposição',
                       'Fatima',
                       'Fazenda Souza',
                       'Floresta',
                       'Forqueta',
                       'Galópolis',
                       'Industrial',
                       'Interior',
                       'Interlagos',
                       'Jardelino Ramos',
                       'Jardim América',
                       'Jardim das Hortências',
                       'Jardim do Shopping',
                       'Jardim Eldorado',
                       'Jardim Iracema',
                       'Jardim Itália',
                       'Kayser',
                       'Linha 40',
                       'Linha 40',
                       'Linha Feijo',
                       'Loteamento José Tomé',
                       'Lourdes',
                       'Madureira',
                       'Maestra',
                       'Marechal Floriano',
                       'Mariani',
                       'Mariland',
                       'Mato Perso',
                       'Medianeira',
                       'Moinhos de Vento',
                       'Monte Bérico',
                       'Morada dos Alpes',
                       'Nona legua',
                       'Nossa Senhora da Saúde',
                       'Nossa Senhora das Graças',
                       'Nossa Senhora de Fátima',
                       'Nossa Senhora de Lourdes',
                       'Nossa Senhora do Rosário',
                       'Oriental',
                       'Paiquere',
                       'Panazzolo',
                       'Parada Cristal',
                       'Parque Oasis',
                       'Parque Santa Rita',
                       'Pedancino',
                       'Petrópolis',
                       'Pio X',
                       'Pioneiro',
                       'Planalto',
                       'Por do Sol',
                       'Presidente Vargas',
                       'Reolon',
                       'Rio Branco',
                       'Rosario',
                       'Sagrada Família',
                       'Saint Etienne',
                       'Salgado Filho',
                       'Samuara',
                       'Sant Etiene',
                       'Santa Catarina',
                       'Santa Corona',
                       'Santa Fé',
                       'Santa Lúcia',
                       'Santa Lúcia do Piaí',
                       'Santo Antônio',
                       'Santos Dumont',
                       'Sanvitto',
                       'São Caetano',
                       'São Ciro',
                       'São Cristóvão',
                       'Sao Francisco',
                       'São Giácomo',
                       'São Gotardo',
                       'São José',
                       'São Leopoldo',
                       'Sao Lucas',
                       'São Luiz',
                       'Sao Marquinhos',
                       'São Pelegrino',
                       'São Victor Cohab',
                       'São Virgílio',
                       'São Vitor',
                       'Serrano',
                       'Tijuca',
                       'Treviso',
                       'Universitário',
                       'Vale Verde',
                       'Vila Cristina',
                       'Vila Horn',
                       'Vila Leon',
                       'Vila Seca',
                       'Vila Verde',
                       'Villagio Iguatemi',
                       'Vinhedos',
 ];

 lstValores: any[] = [250000, 300000, 400000, 700000, 800000, 900000, 1000000]

 bairros: string;
 valorAte: number;
 valorDe: number;

 loading : boolean = false;

 CodigoImovel: any;
 descricao: boolean = false;
 semItens: boolean = false;

 frm: FormGroup

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private conexaoapiService: ConexaoApiService
  ) { }

  ngOnInit(): void {
    // Cria o formulário
  this.createForm();

  // Recupera parâmetros da rota
  this.route.queryParams.subscribe(params => {
    this.frm.controls.bairros.setValue(params['bairros']);
    this.frm.controls.valorAte.setValue(params['valorAte']);
    this.frm.controls.valorDe.setValue(params['valorDe']);
  });

  if (this.frm.value.valorDe == null && this.frm.value.bairros == null && this.frm.value.valorAte == null) {
    // Recupera filtros do localStorage
    const filtros = JSON.parse(localStorage.getItem('imobSch'));
    // Verifica se filtros não são nulos ou indefinidos
    if (filtros != null && filtros != undefined) {
      // Verifica se algum valor dos filtros está presente
      if (filtros.valorDe != null || filtros.bairros != null || filtros.valorAte != null) {
        // Atualiza os valores do formulário com os valores dos filtros
        this.frm.controls.valorAte.setValue(filtros.valorAte);
        this.frm.controls.valorDe.setValue(filtros.valorDe);
        this.frm.controls.bairros.setValue(filtros.bairros);
        
        // Executa a busca
        this.Search();
      }
    }
  }

  // Chama o método para filtrar
  this.Filtrar();
    
  }

  createForm(){
    this.frm = this.fb.group({
      bairros:[],
      valorAte:[],
      valorDe:[],
    });
  }

  Filtrar(){
    localStorage.setItem('imobSch', JSON.stringify(this.frm.value));
    this.Search();
  }

  listagemBairros(item){  this.frm.controls.bairros.setValue(item); }

  Search():Promise<void>{
    return new Promise((resolve, reject)=>{
      this.loading=true;
      this.semItens=false;
      if(this.frm.value.valorAte ==null || this.frm.value.valorAte == '' || this.frm.value.valorAte == undefined){
        this.frm.controls.valorAte.setValue(1000000);
        this.frm.controls.valorDe.setValue(250000);
      }
      this.conexaoapiService.listarImoveis(this.frm.value.bairros,[this.frm.value.valorDe, this.frm.value.valorAte],this.fields).subscribe({
        next:(res)=>{
          this.lstImoveis = Object.values(res);
          if(this.lstImoveis.length == 2 && this.lstImoveis[1] == 'A pesquisa não retornou resultados.'){  this.semItens = true;  }
          this.loading = false;
          resolve();
        },
        error:(err)=>{ reject();},
      })
    })
  }


  DescricaoImovel(item){
    this.router.navigate(['/appcore/descricao'], { queryParams: { codigo: item.Codigo }});
  }

}
