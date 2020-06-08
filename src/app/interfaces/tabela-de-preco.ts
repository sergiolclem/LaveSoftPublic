export interface PecaDaTabelaDePrecos {
    nomePeca: string;
    precoPeca: number;
    id: string;
  }

export interface TabelaDePreco {
    id?: string;
    tabelaAtiva: boolean;
    nomeTabela: string;
    ultimaModificacao: any;
    pecas: PecaDaTabelaDePrecos[];
    tabelaPadrao: boolean;
}