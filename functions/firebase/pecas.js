// CRUD
const read = require('./crud/read');

// Global
const collNames = require('./lib/nomes-colecao');
const filters = require('./lib/filtros-padroes');

// GETTER: Retorna todas as peças
async function getPecas(req, res) {
    try {
        let snapshots = await read.getColecao(collNames.pecas, filters.filtroPecas);
        var docs = [];
        snapshots.forEach(snapshot => {
            var id = snapshot.id;
            docs.push({ id, ...snapshot.data() })
        })
        res.send(docs);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

// Exportando funções
module.exports = { getPecas }