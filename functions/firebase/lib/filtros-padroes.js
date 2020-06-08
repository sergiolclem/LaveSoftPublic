const filtroClientes = {
    orderBy: [
        { campo: 'infoPrincipais.nome', direcao: 'asc' }
    ],
    limit: 300
};

const filtroPecas = {
    orderBy: [
        { campo: 'nome', direcao: 'asc' }
    ],
    limit: 300
};

const filtroRegistros = {
    orderBy: [
        { campo: 'cabecalho.data', direcao: 'desc' }
    ],
    limit: 300
};

const filtroTabelasDePreco = {
    orderBy: [
        { campo: 'nomeTabela', direcao: 'asc' }
    ],
    limit: 300
};

const filtroFaturas = {
    orderBy: [
        { campo: 'metaDados.numeroFatura', direcao: 'desc' }
    ],
    limit: 300
};

module.exports = {
    filtroClientes,
    filtroPecas,
    filtroRegistros,
    filtroTabelasDePreco,
    filtroFaturas,
};