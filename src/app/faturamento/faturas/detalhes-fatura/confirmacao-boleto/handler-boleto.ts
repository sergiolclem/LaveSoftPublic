import * as moment from 'moment';

import { CobrancaPorBoleto } from 'src/app/interfaces/cobranca-por-boleto';
import { BoletoGerencia, BankingBillet, Customer, Discount, Configurations, Item, Metadata } from 'src/app/interfaces/boleto-gerencia';

interface Formulario {
    nome: string;
    cpfOuCnpj: string;
    telefone: string;
    descricaoCobrancaAdicional: string;
    valorCobrancaAdicional: string;
    descricaDesconto: string;
    valorDesconto: string;
    vencimento: Date
    multa: number;
    juros: number;
}

export function configurarBoleto(cobranca: CobrancaPorBoleto, form: Formulario) {
    let banking_billet: BankingBillet = getBankingBillet(form);
    let items: Item[] = getItems(cobranca, form);
    let metadata = getMetadata(cobranca);
    return {
        payment: { banking_billet },
        items,
        metadata
    } as BoletoGerencia;
}

function getBankingBillet(form: Formulario) {
    let bankingBillet: BankingBillet = {
        customer: getCustomer(form),
        expire_at: moment(form.vencimento).format('YYYY-MM-DD'),
    }

    if (form.valorDesconto) bankingBillet.discount = getDiscount(form);
    if (form.multa || form.juros) bankingBillet.configurations = getConfigurations(form);

    return bankingBillet;
}

function getCustomer(form: Formulario) {
    form.cpfOuCnpj = form.cpfOuCnpj.match(/\d/g).join('');
    form.telefone = form.telefone.match(/\d/g).join('');
    let customer: Customer;

    customer = form.cpfOuCnpj.length === 11 ?
        getPersonalInfo(form) : getJuridicalInfo(form);

    return customer;
}

function getPersonalInfo(form: Formulario) {
    return {
        name: form.nome,
        cpf: form.cpfOuCnpj,
        phone_number: form.telefone
    }
}

function getJuridicalInfo(form: Formulario) {
    return {
        juridical_person: {
            corporate_name: form.nome,
            cnpj: form.cpfOuCnpj,
        },
        phone_number: form.telefone
    }
}

function getDiscount(form: Formulario) {
    return {
        type: "currency",
        value: parseInt(form.valorDesconto.match(/\d/g).join(''))
    } as Discount;
}

function getConfigurations(form: Formulario) {
    let configurations: Configurations = {};
    if (form.multa) configurations.fine = form.multa * 100;
    if (form.juros) configurations.interest = form.juros * 1000;
    return configurations;
}

function getItems(cobranca: CobrancaPorBoleto, form: Formulario): Item[] {
    let items: Item[] = [];
    items.push(getOrdemPrincipal(cobranca));
    if (form.valorCobrancaAdicional) items.push(getCobrancaAdicional(form));
    return items;
}

function getOrdemPrincipal(cobranca: CobrancaPorBoleto): Item {
    return {
        name: cobranca.items[0].name,
        value: parseInt(cobranca.items[0].value.match(/\d/g).join(''))
    } as Item
}

function getCobrancaAdicional(form: Formulario): Item {
    return {
        name: form.descricaoCobrancaAdicional || 'Valor adicional',
        value: parseInt(form.valorCobrancaAdicional.match(/\d/g).join(''))
    } as Item;
}

function getMetadata(cobranca: CobrancaPorBoleto) {
    return {
        custom_id: cobranca.id + cobranca.idParcela
    } as Metadata
}
