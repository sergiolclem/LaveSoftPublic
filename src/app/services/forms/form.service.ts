import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

  public formCadastro: FormGroup = new FormGroup({
    nomeTabela: new FormControl('', Validators.required)
  })

  public formPeca: FormGroup = new FormGroup({
    nomePeca: new FormControl('', Validators.required),
    precoPeca: new FormControl('', Validators.required),
  })

  public formTabela: FormGroup = new FormGroup({
    nomeTabela: new FormControl('', Validators.required)
  })

  public formCliente: FormGroup = new FormGroup({
    nomeCliente: new FormControl('')
  })

  initializeFormCadastro() {
    this.formCadastro.setValue({
      nomeTabela: ''
    })
  }
  
  initializeFormPeca() {
    this.formPeca.setValue({
      nomePeca: '',
      precoPeca: ''
    })
  }

  initializeFormTabela() {
    this.formTabela.setValue({
      nomeTabela: ''
    })
  }
}
