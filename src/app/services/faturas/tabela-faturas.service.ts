import { Injectable } from '@angular/core';
import { Fatura } from 'src/app/interfaces/fatura';

export interface DadoTabelaFaturas {
  numeroFatura: number;
  cliente: string;
  valorTotal: number;
  parcelas: Parcela[];
  dataProcessamento: any;
  referencia: string;
  foiPaga: boolean;
  fatura: Fatura;
}

interface Parcela {
  valor: number;
  vencimento: any;
}

@Injectable({
  providedIn: 'root'
})
export class TabelaFaturasService {

  public cabecalho = [
    'numeroFatura',
    'cliente',
    'valorTotal',
    'dataProcessamento',
    'referencia',
    'status'
  ];

  constructor() { }

  gerarFonteDados(faturas: Fatura[]) {
    
    var novosDados: DadoTabelaFaturas[] = [];

    faturas.forEach(fat => {

      let novoDado: DadoTabelaFaturas = {
        cliente: fat.infoCliente.nome,
        valorTotal: fat.valorTotal,
        referencia: fat.referencia.data,
        dataProcessamento: fat.metaDados.dataProcessamento,
        numeroFatura: fat.metaDados.numeroFatura,
        parcelas: this.configurarParcelas(fat.parcelas),
        foiPaga: fat.foiPaga || false,
        fatura: fat
      }

      novosDados.push(novoDado);
    })
    return novosDados;
  }

  configurarParcelas(parcelas: Parcela[]) {
    var parcelasConfiguradas: Parcela[] = [];
      
    parcelas.forEach(parc => {
      var parcela: Parcela = {
        valor: parc.valor,
        vencimento: parc.vencimento
      }
      parcelasConfiguradas.push(parcela)
    })
    
    return parcelasConfiguradas;
  }
}
