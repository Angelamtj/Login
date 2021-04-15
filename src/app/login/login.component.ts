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
          if(error.error.message === "Credenciales incorrectas"){
            this.msg="Credenciales incorrectas";
          }else if(error.error.message === "Usuario no existe"){
            this.msg="El usuario ingresado no existe";
          }else if(error.error.message === "Usuario bloqueado"){
            this.msg="El usuario se encuentra bloqueado";
          }else{
            this.msg="Ocurrió un error: "+ error;
          }
        console.log("exception ocurred ", error);
        }
      )

      
  }

  goRegistro(){

    this._router.navigate(['/registro'])
  }

}
