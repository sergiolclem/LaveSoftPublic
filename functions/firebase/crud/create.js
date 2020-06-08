// Firebase Conn
const admin = require('firebase-admin');

/**
 * 
 * @param {*} colecao nome da coleção do firestore
 * @param {*} doc documentos a ser adicionado
 * 
 * @returns documento recém criado
 */
function add(colecao, doc) {
    return admin.firestore()
        .collection(colecao)
        .add(doc);
}

module.exports = {
    add
}