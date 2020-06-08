// Utils
const moment = require('moment');

// CRUD
const read = require('../firebase/crud/read');
const update = require('../firebase/crud/update');

// Global
const collNames = require('../firebase/lib/nomes-colecao');

async function atualizarFatura(paymentInfo, chargeInfo) {
    let metadata = paymentInfo.metadata.custom_id;
    let idParcela = parseInt(metadata.slice(metadata.length - 1));
    let id = metadata.slice(0, metadata.length - 1);
    let snapshot = await read.getDoc(collNames.fatura, id);
    let link = chargeInfo.data.pdf.charge;
    let fatura = { id, ...snapshot.data() };
    let parcela = fatura.parcelas[idParcela];
    
    incluirObservacoes(parcela, paymentInfo);
    atualizarLinkBoleto(parcela, link);
    alterarStatusCobranca(parcela);

    return await update.update(collNames.fatura, id, fatura);
}

function incluirObservacoes(parcela, paymentInfo) {
    let observacoes = [];
    observacoes.push(getObsDataBoleto());
    adicionarObsDesconto(observacoes, paymentInfo.payment.banking_billet.discount);
    adicionarObsCobrancaAdicional(observacoes, paymentInfo.items[1]);
    adicionarObsDeVencimento(observacoes, parcela, paymentInfo);
    parcela.observacoes = observacoes;
}

function getObsDataBoleto() {
    let hoje = moment().format('DD/MM/YYYY');
    return `Boleto gerado em ${hoje}`;
}

function adicionarObsDesconto(observacoes, discount) {
    if (discount) {
        let valorDesc = (discount.value / 100).toLocaleString('pt-BR', {
            style: 'currency', currency: 'BRL'
        });
        let obsDesconto = `Desconto concedido no valor de ${valorDesc}`;
        observacoes.push(obsDesconto);
    }
}

function adicionarObsCobrancaAdicional(observacoes, item) {
    if (item) {
        let valAdicional = (item.value / 100).toLocaleString('pt-BR', {
            style: 'currency', currency: 'BRL'
        });
        let nomeItem = item.name;
        let obsCobr = `Inclusão de cobrança adicional no valor de ${valAdicional}. Motivo: ${nomeItem}`;
        observacoes.push(obsCobr);
    }
}

function adicionarObsDeVencimento(observacoes, parcela, infoPayment) {
    let dataAntiga = moment.unix(parcela.vencimento._seconds).format('YYYY-MM-DD');
    let dataNova = infoPayment.payment.banking_billet.expire_at;
    if (dataAntiga !== dataNova) observacoes.push(`Vencimento alterado de ${dataAntiga} para ${dataNova}`)
}

function atualizarLinkBoleto(parcela, link) {
    parcela.link = link;
}

function alterarStatusCobranca(parcela) {
    parcela.cobrancaGerada = true;
}

module.exports = {
    atualizarFatura
}