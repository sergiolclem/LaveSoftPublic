export interface Fatura {
    infoCliente: InfoCliente;
    valorTotal: number;
    foiPaga?: boolean;
    referencia: Referencia;
    parcelas: Parcela[];
    metaDados: MetaDados;
    id?: string;
}

interface InfoCliente {
    nome: string;
    telefone?: string;
    CpfOuCnpj?: string;
}

interface Referencia {
    data: string;
    ordensDeServico: string[];
}

export interface Parcela {
    vencimento: any;
    valor: number;
    cobrancaGerada: boolean;
    cobrancaPaga: boolean;
    cobrancaVencida: boolean;
    link: string;
    observacoes?: string[];
}

interface MetaDados {
    numeroFatura?: number;
    dataProcessamento: any;
    usuario: string;
    foiFaturado?: boolean;
}