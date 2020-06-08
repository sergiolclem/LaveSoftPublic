// CRUD
const read = require('./crud/read');

// Global
const collNames = require('./lib/nomes-colecao');

// Utils
const moment = require('moment');
const sets = require('./util/sets');

// Retorna os dados do gráfico de entrada e saída de peças
async function inOutGraph (req, res) {
    try {
        let filtros = req.body;
        let registros = await configRegistros(filtros);
        let rotulosGraph = sets.listaDeDatas(registros);
        let series = configSeries(registros, rotulosGraph);
        res.send({ series, rotulosGraph });
    } catch (error) {
        console.log(error)
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

// Retorna as séries a serem aplicadas no gráfico de entrada e saída de peças
function configSeries(registros, rotulos) {
    let pecas = sets.listaDePecas(registros);
    let series = {};
    pecas.forEach(peca => {
        let serieEntrada = getSerie(peca.id, filtrarRegistros(registros, 'entrada'), rotulos);
        let serieSaida = getSerie(peca.id, filtrarRegistros(registros, 'saida'), rotulos);
        serieSaida[0] = 0;
        series[peca.id] = [
            { label: 'Saída', data: serieSaida.map(v => -v) },
            { label: 'Entrada', data: serieEntrada },
            { label: 'Saldo', data: getSerieSaldo(serieEntrada, serieSaida), type: 'line', fill: false }
        ]
    });
    return series;
}

// Filtra os registros
function filtrarRegistros(registros, filtro) {
    return registros.filter(registro => {
        return registro.metaDados.tipoRegistro === filtro
    })
}

// Retorna um number[] contendo os valores da série "entrada"
function getSerie(pecaId, registros, rotulos) {
    let serie = [];
    rotulos.forEach(rotulo => {
        let r = registros.filter(reg =>
            moment.unix(reg.cabecalho.data._seconds).format('DD-MM') === rotulo);
        serie.push(novoValor(r, pecaId));
    })
    return serie;
}

// Retorna o somatório das quantidades da "peca" nos "registros"
function novoValor(registros, pecaId) {
    let valor = 0;
    registros.forEach(reg => {
        reg.detalhes.pecas.forEach(peca => {
            if (peca.id === pecaId) valor += peca.quantidade;
        })
    })
    return valor;
}

// Retorna um number[] contendo os valores da série "saldo"
function getSerieSaldo(entrada, saida) {
    entrada.pop();
    let entradaCumulativa = [0, ...entrada].map((sum => value => sum += value)(0));
    let saidaCumulativa = saida.map((sum => value => sum += value)(0));
    return entradaCumulativa.map((a, i) => a - saidaCumulativa[i]);
}

// Exportando funções
module.exports = {
    inOutGraph
}