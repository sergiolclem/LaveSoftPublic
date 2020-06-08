function extrairCondicaoCliente(filtro) {
    var clienteId = '';
    filtro.where.forEach(f => {
        if(f.chave === 'cabecalho.clienteId') clienteId = f.valor;
    })
    return clienteId;
}

module.exports = {
    extrairCondicaoCliente
}