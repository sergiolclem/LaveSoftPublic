const moment = require('moment');

// Firebase Conn
const admin = require('firebase-admin');

// Constantes
const LIMIT = 500;

/**
 * 
 * @param {*} colecaoNome nome da coleção do firestore
 * @param {*} id id do documento a ser buscado
 * 
 * @returns retorna o documento de id especificado
 */
function getDoc(colecaoNome, id) {
    return admin.firestore().collection(colecaoNome).doc(id).get();
}

/**
 * 
 * @param {*} colecaoNome nome da coleção do firestore
 * @param {*} filtro (opcional) filtro aplicado a consulta
 * 
 * @returns retorna o conjunto de documentos da coleção e filtros específicados
 */
function getColecao(colecaoNome, filtro) {
    let colecao = admin.firestore().collection(colecaoNome);
    if (filtro) colecao = aplicarFiltros(colecao, filtro);
    return colecao.get();
}

/**
 * 
 * @param {*} colecao coleção do firestore
 * @param {*} filtros filtros que serão aplicados à coleção
 * 
 * @returns retorna a coleção para consulta
 */
function aplicarFiltros(colecao, filtros) {
    if (filtros.where) colecao = aplicarFiltroWhere(colecao, filtros.where);
    if (filtros.orderBy) colecao = aplicarFiltroOrderBy(colecao, filtros.orderBy);
    filtros.limit ? colecao = colecao.limit(filtros.limit) : colecao = colecao.limit(LIMIT);
    return colecao
}

/**
 * 
 * @param {*} colecao coleção do firestore
 * @param {*} filtroWhere filtro de tipo Where
 * 
 * @returns retorna a coleção para consulta
 */
function aplicarFiltroWhere(colecao, filtroWhere) {
    filtroWhere.forEach(f => {
        if (f.chave === 'cabecalho.data') f.valor = moment(f.valor);
        colecao = colecao.where(f.chave, f.operador, f.valor);
    })
    return colecao;
}

/**
 * 
 * @param {*} colecao coleção do firestore
 * @param {*} orderBy filtro de tipo OrderBy
 * 
 * @returns retorna a coleção para consulta
 */
function aplicarFiltroOrderBy(colecao, orderBy) {
    orderBy.forEach(f => colecao = colecao.orderBy(f.campo, f.direcao));
    return colecao;
}

module.exports = {
    getDoc,
    getColecao
}