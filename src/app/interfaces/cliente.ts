import { Peca } from './peca';

export interface Cliente {
    infoPrincipais: InfoPrincipais;
    contatos: Contato[];
    infoFaturamento: InfoFaturamento;
    infoProcesso: InfoProcesso;
    metaDados: MetaDados;
}

export interface InfoPrincipais {
    nome: string;
    categoria: string;
    cidade?: string;
    endereco?: string;
    cpfOuCnpj?: string;
    observacoes?: string;
}

export interface Contato {
    nome: string;
    telefones: Telefone[];
    cargo?: string;
    email?: string;
    observações?: string[];
}

export interface Telefone {
    tipo: string;
    numero: string;
    observacoes?: string;
}

export interface InfoFaturamento {
    tabelaPreco: TabelaPrecoCliente;
    condicaoPagamento: CondicaoPagamento;
    condicaoFaturamento: string;
}

export interface TabelaPrecoCliente {
    nome: string;
    id: string;
    dataAlteracao: any;
}

export interface CondicaoPagamento {
    formaPagamento: string;
    prazo: string;
}

export interface InfoProcesso {
    saldo: Peca[];
}

export interface MetaDados {
    clienteAtivo: boolean;
    dataCadastro?: any;
    id?: string;
    usuario?: string;
}