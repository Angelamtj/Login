import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario';
import { RegistroService } from '../registro.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-loginsuccess',
  templateUrl: './loginsuccess.component.html',
  styleUrls: ['./loginsuccess.component.css']
})
export class LoginsuccessComponent implements OnInit {

  usuarioenviar = new Usuario();
  // id:number=0;
  nombre:string="";
  apellido:string="";
  fecha:string="";
  saludo:string="";
  usuario:string="";
  email:string="";
  fechaSaludo:Date=new Date();

  constructor(private _service: RegistroService, private _router: Router) { }

  ngOnInit(): void {

    let nombre1 = localStorage.getItem("nombre");
    this.nombre = nombre1!=null?nombre1:"";
    let apellido1 = localStorage.getItem("apellido");
    this.apellido = apellido1!=null?apellido1:"";
    let fecha1 = localStorage.getItem("ultimoingreso");
    this.fecha = fecha1!=null?fecha1:new Date().toString();
    let usuario1 = localStorage.getItem("usuario");
    this.usuario = usuario1!=null?usuario1:"";
    /* let id1 = localStorage.getItem("id");
    this.id = Number(id1); */

    

    this.saludo = (this.fechaSaludo.getHours() < 12)?"Buenos dias ":(this.fechaSaludo.getHours() < 18)?"Buenas tardes":"Buenas noches";

    this.usuarioenviar.usuario=this.usuario;
    this.usuarioenviar.ultimoingreso = new Date().toString();
    this.usuarioenviar.usuario = this.usuario;

    this.usuarioenviar.ultimoingreso = new Date().toString();
    if(this.usuarioenviar.ultimoingreso == null || this.usuarioenviar.ultimoingreso == ""){
      localStorage.setItem("ultimoingreso", new Date().toString());
    }

    if(fecha1 == null || fecha1 == ""){
      this.fecha = new Date().toString();
    }else{
      this.fecha = fecha1;
    }
  }

  cerrarSesion(){
    console.log("AA: ", this.usuarioenviar);
    // usuarioNuevo = this.usuarioenviar;
    this._service.registrarUltimoIngreso(this.usuarioenviar).subscribe(
      data => {
        console.log("response received", data);
        localStorage.clear();
        this._router.navigate(['/login']);
      },
      error => {
        console.log("exception ocurred", error);
        // this.msg=error.error;
      }
    );
  }



}
