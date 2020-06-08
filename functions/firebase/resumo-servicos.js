// CRUD
const read = require('./crud/read');

// Global
const collNames = require('./lib/nomes-colecao');

// Utils
const utils = require('./util/utilities');
const sets = require('./util/sets');

// Retorna os dados da tabela de resumo de serviços
const resumoDeServicos = async (req, res) => {
    try {
        let filtros = req.body;
        let registros = await configRegistros(filtros);
        let rotulosTabela = ['peca', ...sets.listaDeDatas(registros), 'total'];
        let linhasTabela = utils.getLinhasTabela(registros);
        
        res.send({ rotulosTabela, linhasTabela });
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
}

async function configRegistros(filtros) {
    filtros.orderBy = [{ campo: 'cabecalho.data', direcao: 'desc' }];
    let snapshots = await read.getColecao(collNames.registros, filtros);
    
    let registros = [];
    snapshots.forEach(snapshot => {
        let id = snapshot.id;
        registros.push({ id, ...snapshot.data() })
    })
    return registros;
}

module.exports = {
    resumoDeServicos
}