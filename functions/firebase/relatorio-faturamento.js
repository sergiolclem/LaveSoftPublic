// CRUD
const read = require('./crud/read');

// Global
const collNames = require('./lib/nomes-colecao');

// Utils
const utils = require('./util/utilities');
const sets = require('./util/sets');
const complTab = require('./util/completador-tabela-preco');

// Retorna os dados da tabela de resumo de serviços
async function relatorioDeServicos (req, res) {
    try {
        let filtros = req.body;
        let registros = await configRegistros(filtros);
        let RelFat = configurarRelatorioServicos(registros);
        res.send(RelFat);
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

function configurarRelatorioServicos(registros) {
    var relServicos = {
        rotulos: [['peca', ...sets.listaDeDatas(registros), 'total']],
        linhasDeFaturamento: getLinhasFaturamento(registros)
    }
    return relServicos;
}

function getLinhasFaturamento(registros) {
    var linhasFaturamento = [];
    
    var linhasTabela = utils.getLinhasTabela(registros);
    linhasTabela.forEach(linha => {
        linhasFaturamento.push(Object.values(linha))
    })

    return linhasFaturamento;
}

async function totalizadores(req, res) {
    try {
        let filtros = req.body;
        let registros = await configRegistros(filtros);
        let tabelaDePreco = await complTab.configurarTabelaPreco(filtros);
        let linhasDeFaturamento = getLinhasFaturamento(registros);
        let totalizadores = configurarTotalizadores(linhasDeFaturamento, tabelaDePreco)

        res.send(totalizadores);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

function configurarTotalizadores(linhasFaturamento, tabelaDePreco) {
    var totalizadores = {
        rotulos: [['DESCRIÇÃO', 'QUANTIDADE TOTAL', 'VALOR UNITÁRIO', 'VALOR TOTAL']],
        linhasDeTotais: gerarRelatorioDeTotais(linhasFaturamento, tabelaDePreco),
    }
    totalizadores.rodape = gerarRodape(totalizadores.linhasDeTotais)
    return totalizadores;
}

function gerarRelatorioDeTotais(linhasFaturamento, tabelaDePreco) {
    var relatorioDeTotais = [];
    linhasFaturamento.forEach(linha => {
        var novaLinhaDeTotais = [];
        
        novaLinhaDeTotais.push(getNomePeca(linha));
        novaLinhaDeTotais.push(getTotalPeca(linha));
        
        tabelaDePreco.pecas.forEach(peca => {
            if(linha[0] === peca.nomePeca) {
                novaLinhaDeTotais.push(peca.precoPeca);
                novaLinhaDeTotais.push(peca.precoPeca * getTotalPeca(linha))
            }
        })
        
        relatorioDeTotais.push(novaLinhaDeTotais);
    })
    return relatorioDeTotais;
}

function getNomePeca(linha) {
    return linha[0];
}

function getTotalPeca(linha) {
    return linha[linha.length - 1];
}

function gerarRodape(linhasDeFaturamento) {
    var vTotal = 0;
    var pTotal = 0;
    linhasDeFaturamento.forEach(linha => {
        pTotal += linha[1];
        vTotal += linha[3];
    })
    return [['TOTAIS', pTotal, '-', vTotal]]
}

module.exports = {
    relatorioDeServicos,
    totalizadores
}