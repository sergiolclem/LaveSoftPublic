import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';

import { Fatura, Parcela } from 'src/app/interfaces/fatura';
import { CobrancaPorBoleto } from 'src/app/interfaces/cobranca-por-boleto';
import { ConfirmacaoBoletoComponent } from './confirmacao-boleto/confirmacao-boleto.component';
import { FaturaService } from 'src/app/services/conexao-firestore/fatura.service';

@Component({
  selector: 'app-detalhes-fatura',
  templateUrl: './detalhes-fatura.component.html',
  styleUrls: ['./detalhes-fatura.component.css']
})
export class DetalhesFaturaComponent implements OnInit {
  
  public parcelas: MatTableDataSource<Parcela>;
  public valorParcela: number;
  public showBtns: boolean = false;
  public spinner: boolean = false;
  public cabecalho = [
    'id',
    'cobrancaGerada',
    'valor',
    'vencimento',
    'cobrancaPaga',
    'cobrancaVencida'
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public fatura: Fatura,
    private dialog: MatDialog,
    private fatService: FaturaService,
    private snack: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.parcelas = new MatTableDataSource(this.fatura.parcelas);
    this.getTotal();
  }

  gerarBoleto(parcela: Parcela, idParcela: number) {
 
    var novoBoleto: CobrancaPorBoleto = {
      infoCliente: {
        nome: this.fatura.infoCliente.nome,
        cpfOuCnpj: this.fatura.infoCliente.CpfOuCnpj,
        telefone: this.fatura.infoCliente.telefone
      },
      vencimento: parcela.vencimento,
      items: [{
        name: `Prestação de serviços referente ao mês de ${this.fatura.referencia.data}`,
        value: parcela.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
      }],
      id: this.fatura.id,
      idParcela: idParcela
    }

    this.dialog.open(ConfirmacaoBoletoComponent, {
      data: novoBoleto
    })
  }

  getTotal() {
    this.valorParcela = this.parcelas.filteredData
    .map(det => det.valor)
    .reduce((acc, value) => acc + value, 0)
  }

  deletarFatura() {
    let deletando = this.snack.open('deletando ...')
    this.fatService.deletarFatura(this.fatura.id).subscribe(res => {
      deletando.dismiss();
      this.snack.open('Fatura deletada!', '', { duration: 2500 })
      this.dialog.closeAll();
    });
  }

  toggleDelete() {
    this.showBtns = !this.showBtns;
  }

  marcarStatusPara(estado: boolean, parcelaId?: number) {
    this.spinner = true;
    this.showBtns = false;
    let atualizando = this.snack.open('atualizando fatura ...')
    
    this.fatService.alterarStatusFatura(this.fatura.id, estado, parcelaId).subscribe(res => {
      atualizando.dismiss();
      this.spinner = false;
      this.snack.open('fatura atualizada', '', { duration: 2500 })
      if(parcelaId === undefined) this.dialog.closeAll();
    });
  }

  navegar(i: number) {
    window.open(this.fatura.parcelas[i].link, '_blank');
  }
}
