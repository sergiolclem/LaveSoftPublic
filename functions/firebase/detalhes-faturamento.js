// CRUD
const read = require('./crud/read');

// Global
const collNames = require('./lib/nomes-colecao');

// Utils
const complTab = require('./util/completador-tabela-preco');

async function detalhesFaturamento(req, res) {
    try {
        let filtro = req.body;     
        let colecaoDeRegistros = await configRegistros(filtro);
        let tabelaDePreco = await complTab.configurarTabelaPreco(filtro)

        let detalhesFaturamento = configurarDetalhesFaturamento(colecaoDeRegistros, tabelaDePreco);

        res.send(detalhesFaturamento);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

async function configRegistros(filtros) {
    filtros.orderBy = [{ campo: 'cabecalho.data', direcao: 'desc' }];
    let snapshots = await read.getColecao(collNames.registros, filtros);
    
    let registros = [];
    snapshots.forEach(snapshot => {
        let id = snapshot.id;
        registros.push({ id, ...snapshot.data() })
    })
    return registros;
}

function configurarDetalhesFaturamento(colecaoDeRegistros, tabelaDePreco) {
    var detFat = [];
    colecaoDeRegistros.forEach(reg => {
        detFat.push(configurardetalhesRegistro(reg, tabelaDePreco));
    })
    return detFat;
}

function configurardetalhesRegistro(reg, tabelaDePreco) {
    var detalheRegistro = {}

    detalheRegistro.numeroRegistro = reg.metaDados.numeroRegistro;
    detalheRegistro.data = reg.cabecalho.data;
    detalheRegistro.valor = calcularTotalRegistro(reg.detalhes.pecas, tabelaDePreco);
    detalheRegistro.foiFaturado = reg.metaDados.foiFaturado ? true : false;
    detalheRegistro.id = reg.id;

    return detalheRegistro;
}

function calcularTotalRegistro(pecas, tabelaDePreco) {
    var total = 0;

    pecas.forEach(peca => {
        total += calcularValorPeca(peca, tabelaDePreco)
    })

    return total;
}

function calcularValorPeca(peca, tabelaDePreco) {
    var valor = 0;

    tabelaDePreco.pecas.forEach(pecaTab => {
        if (pecaTab.nomePeca === peca.nome) valor += pecaTab.precoPeca * peca.quantidade;
    })

    return valor;
}

module.exports = {
    detalhesFaturamento
}