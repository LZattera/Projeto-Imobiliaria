import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {  ActivatedRoute, Router } from '@angular/router';
import jwtDecode, { JwtPayload } from "jwt-decode";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public token: string;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router, 
  ) { 
    this.token = localStorage.getItem('UsafBrazilToken');
    
  }

  login(data: any){
    return this.http.post<any>(environment.apiUrl+'authentication', data).pipe(map(res => {
      if(res.token){
        this.token = res.token;
        localStorage.setItem('UsafBrazilToken', this.token);

        // if(res.acesso == 1){
        //   localStorage.setItem('UsafBrazilTokenADM', this.token);
        // }
      }
      return res;
    }));
  }

  loginAdm(id){
    return this.http.post<any>(environment.apiUrl+'authentication/adm', id).pipe(map(res => {
      if(res.token){
        this.token = res.token;
        localStorage.setItem('UsafBrazilToken', this.token);
      }
      return res;
    }));
  }

  logout(){
    this.token = "";
    localStorage.removeItem('UsafBrazilToken');
    localStorage.removeItem('UsafBrazilTokenADM');
    this.router.navigate(['login']);
  }

  decodeToken(){
    let token =  localStorage.getItem('UsafBrazilToken');
    return jwtDecode(token)
  }
  
  decodeTokenAdm(){
    let token =  localStorage.getItem('UsafBrazilTokenADM');
    return jwtDecode(token)
  }

  getVersion(){
    return this.http.get(environment.apiUrl+'authentication/getversion');
  }
}
