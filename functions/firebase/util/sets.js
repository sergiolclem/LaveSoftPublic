// Utils
const moment = require('moment');

/**
 * 
 * @param {*} registros registros dos quais será extraída a lista de peças
 * 
 * @returns lista (asc) com todas as peças contidas nos registros
 */
function listaDePecas(registros) {
    var pecas = [];
    registros.forEach(reg => {
        incluirPecasDoRegistro(reg, pecas);
    })
    return pecas.sort(ordenarPecas);
}

function incluirPecasDoRegistro(reg, pecas) {
    reg.detalhes.pecas.forEach(peca => {
        if(pecas.map(peca => peca.id).indexOf(peca.id) === -1) pecas.push(peca)
      })
}

function ordenarPecas(a, b) {
        var peca1 = a.nome.toUpperCase();
        var peca2 = b.nome.toUpperCase();
        
        return peca1 < peca2 ? -1 : 1;
}

/**
 * 
 * @param registros registros dos quais será extraída a lista de datas
 * 
 * @returns lista (desc) com todas as datas (DD-MM) contidas nos registros
 */
function listaDeDatas(registros) {
    let registrosOrdenados = ordenarRegistros(registros);

    return [... new Set(registrosOrdenados.map(registro => {
        return moment.unix(registro.cabecalho.data._seconds).format('DD-MM')
    }))];
}

/**
 * 
 * @param {*} registros registros a serem ordenados
 * 
 * @returns array com registros ordenados por data
 */
function ordenarRegistros(registros) {
    return registros.sort((a,b) => {
        var d1 = moment.unix(a.cabecalho.data._seconds).format('X');
        var d2 = moment.unix(b.cabecalho.data._seconds).format('X');
        return d1 - d2;
    })
}

module.exports = {
    listaDePecas,
    listaDeDatas
}