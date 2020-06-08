import { Component, OnInit, Inject } from '@angular/core';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Cliente } from 'src/app/interfaces/cliente';
import { Fatura, Parcela } from 'src/app/interfaces/fatura';
import { FaturaService } from 'src/app/services/conexao-firestore/fatura.service';
import { FormAuxiliarFaturamentoService } from 'src/app/services/forms/form-auxiliar-faturamento.service';
import { UsuarioService } from 'src/app/core/usuario/usuario.service';

interface DetalheFaturamento {
  numeroRegistro: number;
  data: { _seconds: number, _nanoseconds: number };
  valor: number;
  foiFaturado: boolean;
  id: string;
}

@Component({
  selector: 'app-auxiliar-faturamento',
  templateUrl: './auxiliar-faturamento.component.html',
  styleUrls: ['./auxiliar-faturamento.component.css']
})
export class AuxiliarFaturamentoComponent implements OnInit {

  private usuario: string;
  public cliente: Cliente;
  public detalhesFaturamento: DetalheFaturamento[];
  public minDate: Date;

  constructor(
    @Inject(MAT_DIALOG_DATA) private infoFat: any,
    public formAuxService: FormAuxiliarFaturamentoService,
    private usuarioService: UsuarioService,
    private fatService: FaturaService,
    private snack: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.configurarUsuario();
    this.configurarMinDate();
    this.configurarInfoDaView();
  }

  configurarUsuario() {
    this.usuarioService.usuario$.subscribe(user => {
      this.usuario = user.displayName;
    })
  }

  configurarMinDate() {
    this.minDate = new Date();
  }

  configurarInfoDaView() {
    this.cliente = this.infoFat.cliente;
    this.detalhesFaturamento = this.infoFat.detalhesFaturamento;
    this.formAuxService.gerarForm(this.cliente, this.valorTotal);
  }

  get dataInicial() {
    return this.detalhesFaturamento[0].data;
  }

  get dataFinal() {
    return this.detalhesFaturamento[this.detalhesFaturamento.length - 1].data;
  }

  get valorTotal() {
    return this.detalhesFaturamento.map(det => det.valor).reduce((acc, value) => acc + value, 0);
  }

  criarFatura() {
    let registrandoSnack = this.snack.open('Registrando nova fatura ...');
    let novaFatura = this.configNovaFatura();
    this.fatService.addFatura(novaFatura).subscribe(() => {
      registrandoSnack.dismiss();
      this.router.navigate(['faturamento', 'faturas'])
      this.snack.open('Fatura registrada!', '', { duration: 2500 });
    });
  }

  configNovaFatura() {
    return {
      infoCliente: {
        CpfOuCnpj: this.formAuxService.cpfOuCnpj.value,
        nome: this.formAuxService.nomeCliente.value,
        telefone: this.formAuxService.telefone.value,
      },
      parcelas: this.configurarParcelas(),
      referencia: {
        data: moment.unix(this.dataInicial._seconds).format('MM/YYYY'),
        ordensDeServico: this.detalhesFaturamento.map(det => det.id)
      },
      valorTotal: this.valorTotal,
      metaDados: {
        dataProcessamento: + new Date(),
        usuario: this.usuario
      }
    } as Fatura;

  }

  configurarParcelas() {
    let parcelas = this.formAuxService.parcelasForm.getRawValue() as Parcela[];
    parcelas.forEach(p => {
      p.vencimento = + p.vencimento;
      p.valor = this.configurarValorParcela(p.valor);
    })
    return parcelas;
  }

  configurarValorParcela(valor: number) {
    return parseInt(valor.toString().replace('', '').replace(',', '').match(/\d/g).join('')) / 100
  }
}
