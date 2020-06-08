const functions = require('firebase-functions');
const express = require('express');
const app = express();
const cors = require('cors')();

// Configurando CORS
app.use(cors)

// Criando rotas
app.use('/gerencianet', require('./gerencianet/gerencianet'))
app.use('/firebase', require('./firebase/firebase'))

// Exportando funções
exports.api = functions.https.onRequest(app)