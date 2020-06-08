export interface CobrancaPorBoleto {
    infoCliente: {
        nome: string;
        cpfOuCnpj: string;
        telefone: string;
    };
    vencimento: any;
    items: [{
        name: string;
        value: string;
        amount?: number;
    }],
    desconto?: {
        name?: string;
        value?: number;
    },
    jurosMulta?: {
        juros?: number;
        multa?: number;
    },
    id: string;
    idParcela: number;
}