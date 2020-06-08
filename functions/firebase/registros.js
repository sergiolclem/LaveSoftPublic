// CRUD
const read = require('./crud/read');

// Constantes
const collNames = require('./lib/nomes-colecao');
const filters = require('./lib/filtros-padroes');

// GETTER: Retorna todos os registros
async function getRegistros(req, res) {
    try {
        let snapshots = await read.getColecao(collNames.registros, filters.filtroRegistros);
        let docs = [];
        snapshots.forEach(snapshot => {
            var id = snapshot.id;
            docs.push({ id, ...snapshot.data() })
        });
        res.send(docs)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

// GETTER: Retorna uma lista de registro baseada no filtro passado como parâmetro
async function registrosPorFiltro(req, res) {
    try {
        let filtro = req.body;
        filtro.orderBy = filtro.orderBy || [];
        filtro.orderBy.push({ campo: 'cabecalho.data', direcao: 'desc' });

        let snapshots = await read.getColecao(collNames.registros, filtro);
        let docs = [];
        snapshots.forEach(snapshot => {
            var id = snapshot.id;
            docs.push({ id, ...snapshot.data() })
        });
        res.send(docs);
    } catch (error) {
        res.status(500).send(error);
    }
}

// GETTER: Retorna o registro referente ao :id passado como parâmentro de rota
async function registroPorId(req, res) {
    try {
        let id = req.params.id;
        let snapshot = await read.getDoc(id);
        res.send({ id, ...snapshot.data() })
    } catch (error) {
        res.status(500).send(error);
    }
}

// Exportando funções
module.exports = {
    getRegistros,
    registrosPorFiltro,
    registroPorId
}