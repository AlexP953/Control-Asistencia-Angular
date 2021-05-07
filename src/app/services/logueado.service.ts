import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogueadoService {

  private estoyLogueado = true;  //OJO CAMBIA ESTO TRUE=DEJA ENTRAS SIEMPRE / FALSE=PIDE LOGIN

  constructor() { }

  getEstado(){
    return this.estoyLogueado
  }

  setEstado(estado:boolean){
    this.estoyLogueado = estado
  }
}
