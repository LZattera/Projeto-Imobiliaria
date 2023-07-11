import { AuthService } from './../../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: UntypedFormGroup;
  msgErro : string = "";
  submited: boolean = false;
  login : boolean = false;

  constructor(
    private fb: UntypedFormBuilder,
    private auth: AuthService,
    private router: Router,
    private toastr : ToastrService,
  ) { }

  ngOnInit(): void {
    this.form = this.createForm();
  }

  createForm(){
    return this.fb.group({
      apelido: ['', [Validators.required]],
      senha: ['', [Validators.required]]
    });
  }

  get f(){
    return this.form.controls;
  }

  onLogin(){
    this.submited = true;
    if(this.form.valid){
      this.login = true;
      this.auth.login(this.form.value).subscribe({
        next: (res) => { 
          if(res.idUser == 0 ){
            this.toastr.error("Usuário ou senha inválidos!");
          }else{
            this.msgErro = "";
            this.router.navigate(['/appcore']);
          }
        },
        error: (err) => {
          this.toastr.error(err,'Erro ao logar!');
        },
        complete: () => {
          this.login = false;
        }
      })
    }
  }
}
