// CRUD
const read = require('./crud/read');
const del = require('./crud/delete');
const update = require('./crud/update');

// Global
const collNames = require('./lib/nomes-colecao');
const filters = require('./lib/filtros-padroes');

// Handlers de Faturamento
const fluxoFaturamento = require('./fluxo-de-faturamento');

// GETTER: Todas as faturas;
async function getFaturas(req, res) {
    try {
        let snapshots = await read.getColecao(collNames.fatura, filters.filtroFaturas);
        let docs = [];
        snapshots.forEach(doc => {
            var id = doc.id;
            docs.push({ id, ...doc.data() })
        })
        res.send(docs)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

// GETTER: Retorna a fatura referente ao :id passado como parâmentro de rota
async function faturaPorId(req, res) {
    try {
        let id = req.params.id;
        let doc = await read.getDoc(collNames.fatura, id);
        res.send({ id, ...doc.data() });
    } catch (error) {
        res.status(500).send(error);
    }
}

// CREATE: Adiciona a fatura à coleção
async function addFatura(req, res) {
    try {
        let novaFatura = req.body;
        let docRef = await fluxoFaturamento.faturar(novaFatura);
        res.send(docRef)
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
}

async function deletarFatura(req, res) {
    try {
        let fatId = req.body.id;
        let response = await del.del(collNames.fatura, fatId);
        res.send(response)
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
}

async function markAsPaid(req, res) {
    try {
        let estado = req.body.estado;
        let parcelaId = req.body.parcelaId;
        let fatId = req.body.id;
        let snapshot = await read.getDoc(collNames.fatura, fatId);
        let fatura = { id: snapshot.id, ...snapshot.data() };
        alterarParcelasDaFatura(fatura, estado, parcelaId);

        let response = await update.update(collNames.fatura, fatId, fatura)
        res.send(response)
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
}

function alterarParcelasDaFatura(fatura, estado, parcelaId) {
    if (parcelaId === undefined) { alterarEstadoParcelas(fatura, estado) }
    else { alterarEstadoParcela(fatura, estado, parcelaId) }

    alterarEstadoFatura(fatura)
}

function alterarEstadoParcelas(fatura, estado) {
    fatura.parcelas.forEach((parc, i) => {
        alterarEstadoParcela(fatura, estado, i)
    });
}

function alterarEstadoParcela(fatura, estado, parcelaId) {
    fatura.parcelas[parcelaId].cobrancaPaga = estado;
}

function alterarEstadoFatura(fatura) {
    let bool = true;
    fatura.parcelas.forEach(p => {
        if (p.cobrancaPaga === false) bool = false;
    })
    fatura.foiPaga = bool;
}

// Exportando funções
module.exports = {
    getFaturas,
    faturaPorId,
    addFatura,
    deletarFatura,
    markAsPaid
}
