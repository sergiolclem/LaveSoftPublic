import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { InfoFaturamento, Cliente } from 'src/app/interfaces/cliente';
import { ConsultaClienteService } from '../consulta-cliente.service';
import { EditarTabelaDePrecoComponent } from './editar-tabela-de-preco/editar-tabela-de-preco.component';
import { EditarCondicaoDePagamentoComponent } from './editar-condicao-de-pagamento/editar-condicao-de-pagamento.component';
import { EditarCondicaoDeFaturamentoComponent } from './editar-condicao-de-faturamento/editar-condicao-de-faturamento.component';

@Component({
  selector: 'app-info-faturamento',
  templateUrl: './info-faturamento.component.html',
  styleUrls: ['./info-faturamento.component.css']
})
export class InfoFaturamentoComponent implements OnInit {

  public infoFaturamento: InfoFaturamento;
  private cliente: Cliente;

  constructor(
    private consClienteService: ConsultaClienteService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.configurarInfoFaturamento();
    this.configurarCliente();
  }
  
  configurarInfoFaturamento() {
    this.consClienteService.infoFaturameto$.subscribe(info => {
      if(info)
        this.infoFaturamento = info;
    });
  }

  configurarCliente() {
    this.consClienteService.cliente$.subscribe(cliente => {
      this.cliente = cliente;
    })
  }

  editarTabela() {
    this.dialog.open(EditarTabelaDePrecoComponent, {
      data: this.cliente
    })
  }

  editarCondPagamento() {
    this.dialog.open(EditarCondicaoDePagamentoComponent, {
      data: this.cliente
    })
  }

  editarCondFaturamento() {
    this.dialog.open(EditarCondicaoDeFaturamentoComponent, {
      data: this.cliente
    })
  }
}
