// CRUD
const read = require('./crud/read');
const update = require('./crud/update');
const create = require('./crud/create');

// Global
const collNames = require('./lib/nomes-colecao');
const CONTADOR = 'contador';

// Utils
const firestore = require('@google-cloud/firestore');
const moment = require('moment');

// Realiza as operações necessárias para a geração da fatura
async function faturar(novaFatura) {
    await configurarContador(novaFatura);
    await atualizarRegistros(novaFatura);
    configurarDatas(novaFatura);
    
    return await enviarFatura(novaFatura);
}

// Define um novo número à fatura
async function configurarContador(novaFatura) {
    await addAoContador();
    let novoNumeroFatura = await read.getDoc(collNames.fatura, CONTADOR);
    novoNumeroFatura = novoNumeroFatura.data().numeroFatura;
    novaFatura.metaDados.numeroFatura = novoNumeroFatura;
}

// UPDATE: Incrementa 1 ao contador
function addAoContador() {
    let doc = { numeroFatura: firestore.FieldValue.increment(1) };
    let options = { merge: true };
    return update.set(collNames.fatura, CONTADOR, doc, options);
}

// Atualiza o estado de faturamento dos registros que deram origem ao faturamento
async function atualizarRegistros(novaFatura) {
    let registrosIds = novaFatura.referencia.ordensDeServico;
    registrosIds.forEach(async id => {
        let snapshot = await read.getDoc(collNames.registros, id);
        let registro = { id: snapshot.id, ...snapshot.data() };
        await atualizarRegistro(registro);
    })
}

// Atualiza o estado de faturamento do registro
async function atualizarRegistro(registro) {
    registro.metaDados.foiFaturado = true;
    await update.update(collNames.registros, registro.id, registro);
}

function configurarDatas(novaFatura) {
    configurarDataProcessamento(novaFatura);
    configDatasVencimento(novaFatura);    
}

function configurarDataProcessamento(novaFatura) {
    let dataProc = novaFatura.metaDados.dataProcessamento;
    novaFatura.metaDados.dataProcessamento = moment.unix(dataProc/1000);
}

function configDatasVencimento(novaFatura) {
    novaFatura.parcelas.forEach(p => {
        p.vencimento = moment.unix(p.vencimento/1000);
    });
}

async function enviarFatura(novaFatura) {
    return create.add(collNames.fatura, novaFatura);
}

module.exports = {
    faturar
}
