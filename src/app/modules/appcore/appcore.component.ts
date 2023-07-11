import { AppService } from './../../core/services/app.service';
import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { UsuarioService } from './usuario/usuario.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-appcore',
  templateUrl: './appcore.component.html',
  styleUrls: ['./appcore.component.scss']
})
export class AppcoreComponent implements OnInit {

  idEmpresa : number = 0;
  idUsuario : number = 0;
  
  nomeUsuario: string;
  acesso: number = 0;
  nomeRepresentateCliente: string;

  version: string;
  acessoAdm: number;
  nomeUsuarioAdm: string;
  
  constructor(
    private route: ActivatedRoute,
    public prouter: Router, 
    private router: Router, 
    private appService: AppService,
    private authService: AuthService,
    private usuarioService : UsuarioService,
    private auth: AuthService,
    
    ) { 
  }

  ngOnInit(): void {
    CSS.supports("backdrop-filter")

    this.version = environment.version;
    console.log(environment.version, `<- Version`);

    let token : any = this.authService.decodeToken();
    console.log('token 222', token);
    if (token != null) {
      this.idEmpresa   = parseInt(token.idEmpresa);
      this.acesso   = parseInt(token.acesso);
      this.idUsuario   = parseInt(token.idUsuario);
      this.nomeUsuario = token.nomeUsuario;
      this.nomeRepresentateCliente = token.nomeRepresentateCliente;
      
      //Seta os valores
      this.appService.setAcesso(this.acesso);
      this.appService.setEmpresa(this.idEmpresa);
      this.appService.setUsuario(this.idUsuario);
      this.appService.setCliente( token.idCliente);
      this.appService.setRepresentante( token.idRepresentante);
      this.appService.setNomeUsuario(this.nomeUsuario);
      this.appService.setNomeRepresentateCliente(this.nomeRepresentateCliente);
      
      
    } else {
      this.router.navigate(['/login']);
    }
  }
    
  logout(){
    this.authService.logout();
  }

  scrollTop(){
    window.scroll({
      top: -1,
      left: -1,
      behavior: 'smooth'
    });
  }
  
  logAs(event){
    this.auth.loginAdm(event.id).subscribe(res => {
        this.router.navigate(['/appcore']).then(res2 => {
          window.location.reload();
        });
    });
  }
}
