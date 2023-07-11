import { Injectable } from '@angular/core';
import {  BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private subject = new BehaviorSubject<any>(null);
  Usuario = this.subject.asObservable();

  private subjecte = new BehaviorSubject<any>(null);
  Empresa = this.subjecte.asObservable();

  constructor(
    private http : HttpClient
  ) { 
    this.load();
  }

  load(){
    this.http.get<any>(environment.apiUrl + 'usuario/perfil').subscribe(res =>{
      this.subject.next(res);
    })
  }

  empresa(id: number){
    this.subjecte.next(id);
  }
}

export class Usuario {
  empresa_id : string;
  id : string;
  nome : string;
  email : string;

}

