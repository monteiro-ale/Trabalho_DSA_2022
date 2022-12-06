function validarProduto(produto) {
    return produto && produto.nome && produto.preco &&
            typeof produto.nome == 'string' && 
            typeof produto.preco == 'number'
}

module.exports = {
    validarProduto
}