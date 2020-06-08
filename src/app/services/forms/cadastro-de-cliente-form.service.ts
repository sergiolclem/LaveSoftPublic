import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';

import { cpfOuCnpjValido } from 'src/app/shared/forms-validations/cpfOuCnpj';

@Injectable({
  providedIn: 'root'
})
export class CadastroDeClienteFormService {

  public cadastroDeClienteForm: FormGroup

  constructor(
    private fb: FormBuilder
  ) { }

  criarForm() {
    this.cadastroDeClienteForm = this.fb.group({
      nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
      categoria: new FormControl('Hotel', Validators.required),
      cidade: new FormControl('', [Validators.required, Validators.minLength(5)]),
      endereco: new FormControl(''),
      cpfOuCnpj: new FormControl('', [Validators.required, cpfOuCnpjValido]),
      observacoes: new FormControl(''),

      tabelaDePreco: new FormControl('', Validators.required),
      formaPagamento: new FormControl(''),
      prazo: new FormControl(''),

      condicaoFaturamento: new FormControl('', Validators.required),

      contatos: this.fb.array([])
    })

    this.addContato();
  }

  get contatosFormArray() {
    return this.cadastroDeClienteForm.get('contatos') as FormArray;
  }

  addContato() {
    const contato = this.fb.group({
      nome: new FormControl('', Validators.required),
      cargo: new FormControl('', Validators.required),
      email: new FormControl(''),
      observacoes: new FormControl(''),
      telefones: this.fb.array([]),
    })
    this.addTelefone(contato)
    this.contatosFormArray.push(contato);
  }

  removerContato(i: number) {
    this.contatosFormArray.removeAt(i);
  }

  getTelefonesFormArray(contatoGroup: FormGroup) {
    return contatoGroup.get('telefones') as FormArray;
  }

  addTelefone(contatoGroup: FormGroup) {
    const telefone = this.fb.group({
      numero: new FormControl('', [
        Validators.required, 
        Validators.pattern(/^\d{2}\s(9\s)?\d{4}\s-\s\d{4}$/)
      ]),
      tipo: new FormControl('', Validators.required),
      observacoes: new FormControl(''),
    })
    
    this.getTelefonesFormArray(contatoGroup).push(telefone);
  }

  removerTelefone(contatoGroup: FormGroup, i: number) {
    this.getTelefonesFormArray(contatoGroup).removeAt(i);
  }
}
