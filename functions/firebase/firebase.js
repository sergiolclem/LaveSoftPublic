const express = require('express');
const admin =  require('firebase-admin');
const serviceAccount = require('./lel-enxoctrl-firebase-adminsdk-39gzw-0931469633.json');

// Inicializando Firebase
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://lel-enxoctrl.firebaseio.com"
});

// Funções: Firestores Collections
const faturas = require('./faturas');
const clientes = require('./clientes');
const registros = require('./registros');
const tabelaDePrecos = require('./tabelas-de-preco');
const pecas = require('./pecas');

// Funções: Multiple Firestore Collections Analysis
const inOutGraph = require('./in-out-graph');
const resumoServicos = require('./resumo-servicos');
const relatorioFaturamento = require('./relatorio-faturamento');
const detalhesFaturamento = require('./detalhes-faturamento');

// Declarando router
const router = express.Router();

// Rotas do objeto CLIENTE
router.route('/clientes').get(clientes.getClientes);
router.route('/clientes/update').post(clientes.atualizarCliente);
router.route('/clientes/add').post(clientes.addCliente);
router.route('/clientes/:id').get(clientes.clientePorId);

// Rotas do objeto REGISTRO
router.route('/registros').get(registros.getRegistros);
router.route('/registros/filtrar').post(registros.registrosPorFiltro);
router.route('/registros/:id').get(registros.registroPorId);

// Rotas do objeto FATURA
router.route('/faturas').get(faturas.getFaturas);
router.route('/faturas/add').post(faturas.addFatura);
router.route('/faturas/del').post(faturas.deletarFatura);
router.route('/faturas/mark-as-paid').post(faturas.markAsPaid);
router.route('/faturas/:id').get(faturas.faturaPorId);

// Rotas do objeto TABELA DE PREÇOS
router.route('/tabelas-de-preco').get(tabelaDePrecos.tabelasDePrecos);
router.route('/tabelas-de-preco/tab-padrao').get(tabelaDePrecos.tabPadrao);
router.route('/tabelas-de-preco/add').post(tabelaDePrecos.addTabela);
router.route('/tabelas-de-preco/:id').get(tabelaDePrecos.tabelaPorId);

// Rotas do objeto PEÇAS
router.route('/pecas').get(pecas.getPecas);

// Rotas de objetos PI
router.route('/pi/in-out-graph').post(inOutGraph.inOutGraph);
router.route('/pi/resumo-servicos').post(resumoServicos.resumoDeServicos);

// Rotas de objetos FATURAMENTO
router.route('/faturamento/relatorio-servicos').post(relatorioFaturamento.relatorioDeServicos);
router.route('/faturamento/totalizadores').post(relatorioFaturamento.totalizadores);
router.route('/faturamento/detalhes-faturamento').post(detalhesFaturamento.detalhesFaturamento);

// Exportando rotas
module.exports = router;
