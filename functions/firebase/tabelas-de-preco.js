// CRUD
const read = require('./crud/read');
const create = require('./crud/create');

// Global
const collNames = require('./lib/nomes-colecao');
const filters = require('./lib/filtros-padroes');

// GETTER: Retorna todas as tabelas de preços
async function tabelasDePrecos(req, res) {
    try {
        let docs = [];
        let snapshots = await read.getColecao(collNames.tabelaDePreco, filters.filtroTabelasDePreco);
        snapshots.forEach(snapshot => {
            let id = snapshot.id;
            docs.push({ id, ...snapshot.data() })
        })
        res.send(docs);
    } catch (error) {
        res.status(500).send(error);
    }
}

// GETTER: Retorna a tabela de preço referente ao :id passado como parâmentro de rota
async function tabelaPorId(req, res) {
    try {
        let id = req.params.id;
        let tab = await read.getColecao(collNames.tabelaDePreco, id);
        res.send(tab);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

// ENDPOINT: Envia tabela padrão ao client
async function tabPadrao(req, res) {
    try {
        let tabPadrao = await getTabelaPadrao();
        res.send(tabPadrao);
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

// GETTER: Retorna a tabela configurada como padrão no sistema
async function getTabelaPadrao() {
    let docs = [];
    let tabelas = await read.getColecao(collNames.tabelaDePreco, filters.filtroTabelasDePreco);
    tabelas.forEach(tab => {
        let id = tab.id;
        docs.push({ id, ...tab.data() });
    })
    return docs.find(tab => tab.tabelaPadrao);
}

// CREATE: Adiciona a tabela de preço à coleção
async function addTabela(req, res) {
    try {
        let tabela = req.body;
        let response = await create.add(collNames.tabelaDePreco, tabela);
        res.send(response);
    } catch (error) {
        res.status(500).send(error);
    }
}

// Exportando funções
module.exports = {
    tabelasDePrecos,
    tabelaPorId,
    addTabela,
    tabPadrao,
    getTabelaPadrao
}