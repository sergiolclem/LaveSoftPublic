// CRUD
const create = require('./crud/create');
const read = require('./crud/read');
const update = require('./crud/update');

// Global
const collNames = require('./lib/nomes-colecao');
const filters = require('./lib/filtros-padroes');

// GETTER: Retorna todos os clientes
async function getClientes(req, res) {
    try {
        let snapshots = await read.getColecao(collNames.cliente, filters.filtroClientes);
        let docs = [];
        snapshots.forEach(doc => {
            docs.push({id: doc.id, ...doc.data()})
        })
        res.send(docs);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

// GETTER: Retorna o cliente referente ao :id passado como parâmentro de rota
async function clientePorId(req, res) {
    try {
        let id = req.params.id;
        let doc = await read.getDoc(collNames.cliente, id);
        let cliente = { id, ...doc.data() };
        res.send(cliente);
    } catch (error) {
        req.status(500).send(error);
    }
}

// CREATE: adiciona um novo cliente ao firestore
async function addCliente(req, res) {
    try {
        let cliente = req.body;
        let response = await create.add(collNames.cliente, cliente);
        res.send(response)
    } catch (error) {
        res.status(500).send(error)
    }
}

// UPDATE: Atualiza o cliente
async function atualizarCliente(req, res) {
    try {
        let cliente = req.body;
        let response = await update.set(collNames.cliente, cliente.id, cliente);
        res.send(response);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

// Exportando funções
module.exports = { 
    getClientes, 
    clientePorId, 
    atualizarCliente,
    addCliente
}