import { ConexaoApiService } from './conexao-api.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {  ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-appcore',
  templateUrl: './appcore.component.html',
  styleUrls: ['./appcore.component.scss']
})
export class AppcoreComponent implements OnInit {

  filtro:string='';
  frm:FormGroup;
  fields = ['Cidade', 'Bairro', 'ValorVenda', 'FotoDestaquePequena'];
  filter=[
    { Bairro: 'Desvio Rizzo' },
  ]

  lstImoveisDestaque: any[] = [];
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
  listagem: boolean = false;

  constructor(
    private fb : FormBuilder,
    public router: Router, 
    private conexaoapiService : ConexaoApiService,
    ) { 
  }

  ngOnInit(): void {
    this.ListarImoveisDestaque();
    this.Search();
  }

  listagemBairros(item){  this.bairros = item; }

  ListarImoveisDestaque():Promise<void>{
    return new Promise((resolve, reject)=>{
      console.log(this.filtro, 'filtros')
      this.conexaoapiService.listarImoveisDestaque(this.filter,this.fields).subscribe({
        next:(res)=>{
          this.lstImoveisDestaque = Object.values(res);
          console.log(res);
          resolve();
        },
        error:(err)=>{reject();},
      })
    })
  }

  Search():Promise<void>{
    return new Promise((resolve, reject)=>{
      // this.loading=true;
      this.conexaoapiService.listarImoveis(undefined ,[500000, 900000],this.fields).subscribe({
        next:(res)=>{
          this.lstImoveisDestaque = Object.values(res);
          console.log(res, 'listagem');
          // this.loading = false;
          resolve();
        },
        error:(err)=>{ reject();},
      })
    })
  }

  createForm(){
    this.frm = this.fb.group({
      filtro: ['']
    })
  }
  DescricaoImovel(item){
    this.router.navigate(['/appcore/descricao'], { queryParams: { codigo: item.Codigo }});
  }
    
}
