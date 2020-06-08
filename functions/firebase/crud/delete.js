// Firebase Conn
const admin = require('firebase-admin');

function del(colecao, docId) {
    return admin.firestore()
        .collection(colecao)
        .doc(docId)
        .delete();
}

module.exports = {
    del
}