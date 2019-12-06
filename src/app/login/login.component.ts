import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario-service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { HttpClient } from '@angular/common/http';
import { first, tap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  providers: [UsuarioService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  username: string;
  pass: string;
  usuarios: any[] = UsuarioService.users;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: ['']
    });
    this.authenticationService.logout();
  }

  onSubmit() {
    //const exist = this.usuarios.some(u => u.username === this.username);
    this.authenticationService
      .login(this.username, this.pass)
      .pipe(
        first(),
        tap(valor => console.log('mi valor', valor))
      )
      .subscribe(
        data => {
          console.log('hola');
      },
      error => {
          console.error(error);
      });
  }
}
