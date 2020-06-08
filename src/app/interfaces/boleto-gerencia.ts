type discountType = 'percentage' | 'currency';

export interface BoletoGerencia {
    metadata: Metadata;
    payment: {
        banking_billet: BankingBillet
    };
    items: Item[];
}

export interface BankingBillet {
    customer: Customer;
    expire_at: string; // Format YYYY-MM-DD
    discount?: Discount;
    configurations?: Configurations;
}

export interface Customer {
    name?: string;
    cpf?: string;
    phone_number: string;
    juridical_person?: {
        corporate_name: string;
        cnpj: string;
    }
}

export interface Discount {
    type: discountType;
    value: number; // E.g.: R$ 10,00 = 1000
}

export interface Configurations {
    fine?: number; // E.g.: 2% = 200
    interest?: number; // E.g.: 0,033% = 33;
}

export interface Item {
    name: string;
    value: number; // E.g.: R$ 10,00 = 1000
}

export interface Metadata {
    custom_id: string;
}
