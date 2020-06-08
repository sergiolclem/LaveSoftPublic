import { Injectable } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, ControlContainer, AbstractControl, Validators } from '@angular/forms';

import { PecasService } from '../conexao-firestore/pecas.service';
import { Peca } from 'src/app/interfaces/peca';

@Injectable({
  providedIn: 'root'
})
export class CadastroDeTabelaDePrecoFormService {

  public cadTabForm: FormGroup;
  public pecas: Peca[];

  constructor(
    private pecasService: PecasService,
    private fb: FormBuilder
  ) { }

  async criarForm() {
    this.pecas = await this.definirPecasDoForm();
    this.cadTabForm = new FormGroup({
      nomeTabela: new FormControl('', [Validators.required, Validators.minLength(5)]),
      pecas: this.fb.array([])
    });
    this.addControlesAoFormulario(this.pecas)
    return this.cadTabForm;
  }

  private definirPecasDoForm() {
    return this.pecasService.pecas.toPromise();
  }

  private addControlesAoFormulario(pecas: Peca[]) {
    pecas.forEach(peca => {
      this.pecasArray.push(new FormControl())
    })
  }

  get pecasArray() {
    return this.cadTabForm.get('pecas') as FormArray;
  }
}
