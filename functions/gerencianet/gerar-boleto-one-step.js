// Config Gerencianet
const Gerencianet = require('gn-api-sdk-node');
const credentials = require('./credentials');
const gerencianet = new Gerencianet(credentials.sandBoxOptions);

// Fluxo de geração de boleto
const fluxoGeracaoBoleto = require('../controllers/fluxo-geracao-boleto');

async function gerarBoletoOneStep(req, res) {
    try {
        let paymentInfo = req.body;
        let chargeInfo = await gerencianet.oneStep({}, paymentInfo);
        await fluxoGeracaoBoleto.atualizarFatura(paymentInfo, chargeInfo);
        res.send({chargeInfo});
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

module.exports = {
    gerarBoletoOneStep
}