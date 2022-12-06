const {validarProduto} = require('./produto_validacao')
const produtoPersistence = require('../persistence/produto_persistence')


async function inserir(produto) {
    if(produto && produto.nome && produto.preco){
        const produtoInserido = await produtoPersistence.inserir(produto);
        return produtoInserido;
    }
    else {
        throw { id: 400, mensagem: "Falta parametros"};
    }
}

async function listar() {
    return await produtoPersistence.listar();
}

async function buscarPorId(id) {
    const produto = await produtoPersistence.buscarPorId(id);
    if(!produto) {
        throw { id: 404, mensagem: `Produto ${id} nao encontrado`};
    }
    return produto;
}

async function buscarPorNome(nome) {
    if(!nome) {
        throw { id: 400, mensagem: "Falta parametro nome"};
    }
    return await produtoPersistence.buscarPorNome(nome);
}

async function atualizar(id, produto) {
    if(validarProduto(produto)) {
        const produtoAtualizar = await buscarPorId(id);
        if(produtoAtualizar)
            return await produtoPersistence.atualizar(id, produto);

    }
    else {
        throw { id: 400, mensagem: "Parametros Invalidos"};
    }
}

async function deletar(id) {
    const produtoDeletar = await buscarPorId(id);
    if(produtoDeletar)
        return await produtoPersistence.deletar(id);
}

module.exports = {
    inserir, listar, buscarPorId, buscarPorNome, atualizar, deletar
}