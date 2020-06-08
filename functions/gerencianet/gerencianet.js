// Express config
const express = require('express');
const router = express.Router();

// Funções: Gerencianet
const gerencianet = require('./gerar-boleto-one-step');

// Rotas
router.route('/gerar-boleto').post(gerencianet.gerarBoletoOneStep);

// Exportando rotas
module.exports = router;
