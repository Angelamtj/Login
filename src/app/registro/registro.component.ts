import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroService } from '../registro.service';
import { Usuario } from '../usuario';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario = new Usuario();
  msg='';

  constructor(private _service: RegistroService, private _router: Router) { }

  ngOnInit(): void {
  }


  registroUsuario(){

    this.usuario.fecha = new Date().toString();

    if(this.usuario.nombre == "" || this.usuario.apellido == "" || this.usuario.genero == "" || this.usuario.email == ""
    || this.usuario.usuario == "" || this.usuario.password == "" || this.usuario.password2 == ""){
       alert("No pueden haber campos vacíos!");
    }else{

    this._service.registerFromRemote(this.usuario).subscribe(
      
      data => {

        console.log("response received", data);
        this._router.navigate(['/login']);
      
      },
      error => {

        console.log("exception ocurred", error);
        this.msg=error.error;
        
      }

    )
    }
  }

}
