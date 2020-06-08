import { Injectable } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';

import { cpfOuCnpjValido } from 'src/app/shared/forms-validations/cpfOuCnpj';
import { date } from 'src/app/shared/forms-validations/date';
import { CobrancaPorBoleto } from 'src/app/interfaces/cobranca-por-boleto';

@Injectable({
  providedIn: 'root'
})
export class ConfirmacaoBoletoFormService {

  public formBoleto: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  gerarForm(cob: CobrancaPorBoleto) {
    this.formBoleto = this.formBuilder.group({
      nome: new FormControl(cob.infoCliente.nome, [
        Validators.required,
        Validators.minLength(5)
      ]),
      cpfOuCnpj: new FormControl(cob.infoCliente.cpfOuCnpj, [
        Validators.required,
        cpfOuCnpjValido
      ]),
      telefone: new FormControl(cob.infoCliente.telefone, [
        Validators.required,
        Validators.pattern(/^\d{2}\s(9\s)?\d{4}\s-\s\d{4}$/)
      ]),

      descricaoCobrancaAdicional: new FormControl({
        value: '', 
        disabled: true
      }, Validators.minLength(5)),
      valorCobrancaAdicional: new FormControl({
        value: '', 
        disabled: true
      }, Validators.minLength(3)),

      valorDesconto: new FormControl({
        value: '', 
        disabled: true
      }, Validators.minLength(3)),

      multa: new FormControl({
        value: '', 
        disabled: true
      }, [Validators.min(0), Validators.max(10)]),

      juros: new FormControl({
        value: '', 
        disabled: true
      }, [Validators.min(0), Validators.max(0.33)]),

      vencimento: new FormControl(moment.unix(cob.vencimento._seconds).toDate(), 
        [Validators.required, date()])
    })
  }
}
