import { Injectable } from '@angular/core';

import { ClienteService } from 'src/app/services/conexao-firestore/cliente.service';
import { RelatorioFaturamentoService } from 'src/app/services/relatorio-faturamento/relatorio-faturamento.service';
import { AuxiliarFormatacaoPDF } from './auxiliar-de-formatacao-pdf';
import { FiltroFirestore } from 'src/app/interfaces/filtros-filestore';
import { Cliente } from 'src/app/interfaces/cliente';

@Injectable({
  providedIn: 'root'
})
export class GeradorPdfService {

  private cliente: Cliente;
  private relatorioServicos: any;
  private totalizadores: any;

  constructor(
    private clientesService: ClienteService,
    private relFatService: RelatorioFaturamentoService
  ) { }

  async configurarRelatorio(filtro: FiltroFirestore) {
    var relConfigurado = false;
    var clienteId = this.getIdCliente(filtro);
    if(clienteId) {
      this.cliente = await this.clientesService.getCliente(clienteId).toPromise();
      this.relatorioServicos = await this.relFatService.getRelatorioServicos(filtro).toPromise();
      this.totalizadores = await this.relFatService.getTotalizadores(filtro).toPromise();
      relConfigurado = true;
    }
    
    return relConfigurado;
  }

  gerarRelatorio() {
    let relatorio = {
      cliente: this.cliente,
      relatorioServicos: this.relatorioServicos,
      totalizadores: this.totalizadores
    }
    AuxiliarFormatacaoPDF.gerarRelatorio(relatorio);
  }

  private getIdCliente(filtro: FiltroFirestore) {
    var id = filtro.where.find(wh => wh.chave === 'cabecalho.clienteId');
    return id ? id.valor as string : '';
  }    
}
