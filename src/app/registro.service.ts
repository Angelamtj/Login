import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  constructor(private _http : HttpClient) { }

  public loginUsuarioFromRemote(usuario :Usuario):Observable<any>{

    return this._http.post("http://localhost:8091/registro/login",usuario)

  }

  public registerFromRemote(usuario :Usuario):Observable<any>{

    return this._http.post("http://localhost:8091/registro/registrocliente",usuario)

  }

  public registrarUltimoIngreso(usuario:Usuario):Observable<any>{

    return this._http.post("http://localhost:8091/registro/registroultimo",usuario)
  }
}
