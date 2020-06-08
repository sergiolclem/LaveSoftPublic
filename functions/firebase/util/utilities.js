// Utils
const moment = require('moment');
const sets = require('./sets');

/**
 * 
 * @param {*} registros registros dos quais serão extraídas as linhas.
 * 
 * @returns Linhas de tabela descritiva de serviços prestados
 */
function getLinhasTabela (registros) {
    var linhasTabela = [];

    var pecas = sets.listaDePecas(registros);
    pecas.forEach(peca => {
        linhasTabela.push(gerarLinha(peca, registros))
    })

    return linhasTabela;
}

/**
 * 
 * @param {*} peca chave da tabela
 * @param {*} registros registros dos quais serão extraídas as informações da linha.
 * 
 * @returns Linha de tabela descritiva de serviços prestados
 */
function gerarLinha(peca, registros) {
    var linha = {};

    linha.peca = peca.nome;
    sets.listaDeDatas(registros).forEach(data => {
        linha[data] = totalNaData(data, peca, registros)
    });
    linha.total = totalPorPeca(linha, registros);

    return linha;
}

/**
 * 
 * @param {*} data data para verificação do valor total
 * @param {*} peca peça para verificação do valor total
 * @param {*} registros registros dos quais será extraído o total
 * 
 * @returns o total de peças para a data mencionada
 */
function totalNaData(data, peca, registros) {
    var totalNaData = 0;
    registros.forEach(reg => {
        totalNaData += totalNoRegistro(data, peca, reg)
    })
    return totalNaData;
}

/**
 * 
 * @param {*} data data para verificação do valor total
 * @param {*} peca peça para verificação do valor total
 * @param {*} registro registros dos quais será extraído o total
 * 
 * @returns valor total para o registro mencionado
 */
function totalNoRegistro(data, peca, registro) {
    var totalNoRegistro = 0;
    let dataReg = moment.unix(registro.cabecalho.data._seconds).format('DD-MM');
    if (dataReg === data) {
        registro.detalhes.pecas.forEach(pecaR => {
            if (pecaR.id === peca.id) totalNoRegistro += pecaR.quantidade;
        })
    }
    return totalNoRegistro;
}

/**
 * 
 * @param {*} linha linha da qual se obterá o total
 * @param {*} registros registros que contém as quantidades que comporão o total
 * 
 * @returns valor total da chave na data e registros selecionados
 */
function totalPorPeca(linha, registros) {
    var totalPorPeca = 0;
    sets.listaDeDatas(registros).forEach(data => {
        totalPorPeca += linha[data]
    })
    return totalPorPeca;
}


module.exports = {
    getLinhasTabela
}
