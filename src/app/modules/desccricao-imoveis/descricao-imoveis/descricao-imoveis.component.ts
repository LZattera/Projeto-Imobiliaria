import { Component, OnInit } from '@angular/core';
import { ConexaoApiService } from '../../appcore/conexao-api.service';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-descricao-imoveis',
  templateUrl: './descricao-imoveis.component.html',
  styleUrls: ['./descricao-imoveis.component.scss']
})
export class DescricaoImoveisComponent implements OnInit {

  CodigoImovel: any;

  loading: boolean = false;
  descricaoImovel: any = [];
  slideFotos: any[] = [];

  constructor(
    private conexaoapi: ConexaoApiService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.campos();
    firstValueFrom(this.route.queryParams).then((params) => {
      this.DescricaoImovel(params.codigo).finally(()=>{
        this.loading = false;
      });
    });
  }

  DescricaoImovel(CodigoImovel):Promise<void>{
    return new Promise((resolve, reject)=>{
      this.CodigoImovel = CodigoImovel;
      this.conexaoapi.descricaoImovel(CodigoImovel).subscribe({
        next:(res)=>{
          this.descricaoImovel = res;
          console.log(res, 'res')
          this.slideFotos = (Object.values(res.Foto) as any[]).map(p => p.Foto);
          console.log( this.slideFotos);
          resolve();
        },
        error:(err)=>{reject();},
      });
    })
  }

  campos(){
    this.conexaoapi.campos().subscribe(res=>{console.log(res, 'campos')});
  }


}


