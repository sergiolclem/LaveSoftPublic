// Firebase Conn
const admin = require('firebase-admin');

function set(colecao, docId, doc, options) {
    let docRef = admin.firestore()
        .collection(colecao)
        .doc(docId)
    return options ? docRef.set(doc, options) : docRef.set(doc)
}

function update(colecao, docId, doc) {
    return admin.firestore()
        .collection(colecao)
        .doc(docId)
        .update(doc)
}

module.exports = {
    set,
    update
}