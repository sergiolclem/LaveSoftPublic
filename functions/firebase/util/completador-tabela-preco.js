// CRUD
const read = require('../crud/read');

const tabela = require('../tabelas-de-preco');

// Global
const collNames = require('../lib/nomes-colecao');

async function configurarTabelaPreco(filtro) {
    let pecas = [];

    let tabelaPadrao = await tabela.getTabelaPadrao();
    let tabelaCliente = await getTabelaCliente(filtro);

    tabelaPadrao.pecas.forEach(peca => {
        let tabContem = tabelaCliente.pecas.map(p => p.nomePeca).includes(peca.nomePeca);
        tabContem ? pecas.push(incluirPrecoDoCliente(peca.nomePeca, tabelaCliente)) 
            : pecas.push(peca);
    });
    return { pecas };
}

async function getTabelaCliente(filtro) {
    let idTabela = await getIdTabela(filtro);
    let snapshot = await read.getDoc(collNames.tabelaDePreco, idTabela);
    return { id: snapshot.id, ...snapshot.data() };
}

async function getIdTabela(filtro) {
    let clienteId = getIdCliente(filtro);
    let snapshot = await read.getDoc(collNames.cliente, clienteId);
    let cliente = { id: snapshot.id, ...snapshot.data() };
    return cliente.infoFaturamento.tabelaPreco.id;
}

function getIdCliente(filtro) {
    return filtro.where.find(wh => wh.chave === 'cabecalho.clienteId').valor;
}

function incluirPrecoDoCliente(nomePeca, tabelaCliente) {
    return tabelaCliente.pecas.find(peca => peca.nomePeca === nomePeca);
}

module.exports = {
    configurarTabelaPreco
}