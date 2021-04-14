import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroService } from '../registro.service';
import { Usuario } from '../usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

usuario = new Usuario();
msg = "";

  constructor(private _service : RegistroService, private _router: Router) { }

  ngOnInit(): void {
  }

  loginUsuario(){

      this.usuario.ultimoingreso  =  new Date().toString();

      this._service.loginUsuarioFromRemote(this.usuario).subscribe(


        data => {
          console.log(data);
          localStorage.setItem("nombre",data.nombre);
          localStorage.setItem("apellido",data.apellido);
          localStorage.setItem("fecha",data.ultimoingreso);
          localStorage.setItem("usuario",data.usuario);
          localStorage.setItem("email",data.email);
          localStorage.setItem("id",data.id);
          localStorage.setItem("ultimoingreso",data.ultimoingreso);
          console.log("response recieved");
      
          this._router.navigate(['/loginsuccess'])


        },
        error => {
        console.log("exception ocurred");
        this.msg="Datos incorrectos, Por favor ingresa un email y contraseña validos";
        }
      )

      
  }

  goRegistro(){

    this._router.navigate(['/registro'])
  }

}
