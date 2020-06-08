import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { Cliente } from 'src/app/interfaces/cliente';
import { cpfOuCnpjValido } from 'src/app/shared/forms-validations/cpfOuCnpj';

@Injectable({
  providedIn: 'root'
})
export class FormAuxiliarFaturamentoService {

  public formAuxFat: FormGroup

  constructor(
    private fb: FormBuilder
  ) { }

  gerarForm(cliente: Cliente, valor: number) {
    this.formAuxFat = this.fb.group({
      nomeCliente: new FormControl('', Validators.required),
      cpfOuCnpj: new FormControl('', [cpfOuCnpjValido]),
      telefone: new FormControl('', [Validators.pattern(/^\d{2}\s(9\s)?\d{4}\s-\s\d{4}$/)]),
      valorTotal: new FormControl(),
      parcelas: this.fb.array([])
    })
    this.iniciarForm(cliente, valor);
  }

  iniciarForm(cliente: Cliente, vTotal: number) {
    let contato = cliente.contatos[0] ? cliente.contatos[0].telefones[0].numero : '';

    this.nomeCliente.setValue(cliente.infoPrincipais.nome || '');
    this.cpfOuCnpj.setValue(cliente.infoPrincipais.cpfOuCnpj || '');
    this.telefone.setValue(contato);
    this.valorTotal.setValue(vTotal || '');
    this.novaParcela();
  }

  get nomeCliente() {
    return this.formAuxFat.get('nomeCliente') as FormControl;
  }

  get cpfOuCnpj() {
    return this.formAuxFat.get('cpfOuCnpj') as FormControl;
  }

  get telefone() {
    return this.formAuxFat.get('telefone') as FormControl;
  }
  
  get valorTotal() {
    return this.formAuxFat.get('valorTotal') as FormControl;
  }

  get parcelasForm() {
    return this.formAuxFat.get('parcelas') as FormArray;
  }

  novaParcela() {
    const parcela = this.fb.group({
      valor: new FormControl('', Validators.required),
      vencimento: new FormControl('', Validators.required),
      cobrancaGerada: new FormControl(false),
      cobrancaEnviada: new FormControl(false),
      cobrancaPaga: new FormControl(false),
      cobrancaVencida: new FormControl(false),
      link: new FormControl('')
    })

    this.parcelasForm.push(parcela);
    this.recalcularValorParcela();  
  }

  removerParcela(i: number) {
    this.parcelasForm.removeAt(i);
    this.recalcularValorParcela();
  }

  private recalcularValorParcela() {
    this.parcelasForm.controls.forEach(c => {
      c.get('valor').setValue(
        this.valorDaParcela().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))
    })
  }

  private valorDaParcela() {
    let valor = this.valorTotal.value;
    let arred = Math.round(valor / Math.max(1, this.parcelasForm.length) * 100)
    return arred / 100;
  }
}
