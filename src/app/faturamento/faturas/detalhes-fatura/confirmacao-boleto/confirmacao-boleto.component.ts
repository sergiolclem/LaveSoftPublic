import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { GeradorDeBoletoService } from 'src/app/services/gerador-de-boleto/gerador-de-boleto.service';

import { CobrancaPorBoleto } from 'src/app/interfaces/cobranca-por-boleto';
import { ConfirmacaoBoletoFormService } from 'src/app/services/forms/confirmacao-boleto-form.service';
import { configurarBoleto } from './handler-boleto'

@Component({
  selector: 'app-confirmacao-boleto',
  templateUrl: './confirmacao-boleto.component.html',
  styleUrls: ['./confirmacao-boleto.component.css']
})
export class ConfirmacaoBoletoComponent implements OnInit {

  public spinner: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public boleto: CobrancaPorBoleto,
    private gnBoletoService: GeradorDeBoletoService,
    public formBoletoSer: ConfirmacaoBoletoFormService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.formBoletoSer.gerarForm(this.boleto)
  }

  get valorTotal() {
    let valorService = parseInt(this.boleto.items[0].value.match(/\d/g).join('')) / 100;
    return valorService + this.valorAdicional - this.desconto;
  }

  get valorAdicional() {
    let valAddString = this.formBoleto.get('valorCobrancaAdicional').value || '0';
    let valAdd = parseInt(valAddString.match(/\d/g).join('')) / 100;
    return valAdd;
  }

  get desconto() {
    let valDescString = this.formBoleto.get('valorDesconto').value || '0';
    let valDesc = parseInt(valDescString.match(/\d/g).join('')) / 100;
    return valDesc;
  }

  get formBoleto() {
    return this.formBoletoSer.formBoleto;
  }

  async gerarBoleto() {
    this.spinner = true;
    let formCobranca = this.formBoleto.getRawValue();
    let cobranca = configurarBoleto(this.boleto, formCobranca);
    let resposta = await this.gnBoletoService.gerarBoletoOneStep(cobranca).toPromise();
    let link = resposta.chargeInfo.data.pdf.charge;
    this.spinner = false;
    window.open(link, '_blank');
    this.dialog.closeAll();
  }

  cobrancaAddToggle(bool: boolean) {
    this.enableDisable(bool, 'descricaoCobrancaAdicional');
    this.enableDisable(bool, 'valorCobrancaAdicional');
  }
  
  descontoToggle(bool: boolean) {
    this.enableDisable(bool, 'valorDesconto');
  }
  
  multaToggle(bool: boolean) {
    this.enableDisable(bool, 'multa');
  }
  
  jurosToggle(bool: boolean) {
    this.enableDisable(bool, 'juros');
  }

  enableDisable(bool: boolean, formControlName: string) {
    let formControl = this.formBoleto.get(formControlName)
    if (bool) { formControl.enable() }
    else {
      formControl.reset();
      formControl.disable();
    }
  }
}
