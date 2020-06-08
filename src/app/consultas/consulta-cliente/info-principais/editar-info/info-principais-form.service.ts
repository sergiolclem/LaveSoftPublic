import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { InfoPrincipais } from 'src/app/interfaces/cliente';

@Injectable({
  providedIn: 'root'
})
export class InfoPrincipaisFormService {

  private _formInfoPrinc: FormGroup;

  constructor() { }

  iniciarForm(cliente: InfoPrincipais) {
    this._formInfoPrinc = new FormGroup({
      nome: new FormControl(cliente.nome, [
        Validators.required, 
        Validators.minLength(3)
      ]),
      categoria: new FormControl(cliente.categoria, [
        Validators.required,
        Validators.minLength(5)
      ]),
      cidade: new FormControl(cliente.cidade,[
        Validators.minLength(3)
      ]),
      endereco: new FormControl(cliente.endereco),
      cpfOuCnpj: new FormControl(cliente.cpfOuCnpj),
      observacoes: new FormControl(cliente.observacoes)
    })
  }

  get formInformPrinc() {
    return this._formInfoPrinc;
  }

  get nome() {
    return this._formInfoPrinc.get('nome').value;
  }
  
  get categoria() {
    return this._formInfoPrinc.get('categoria').value;
  }
  
  get cidade() {
    return this._formInfoPrinc.get('cidade').value;
  }
  
  get endereco() {
    return this._formInfoPrinc.get('endereco').value;
  }
  
  get cpfOuCnpj() {
    return this._formInfoPrinc.get('cpfOuCnpj').value;
  }
  
  get observacoes() {
    return this._formInfoPrinc.get('observacoes').value;
  }
}
