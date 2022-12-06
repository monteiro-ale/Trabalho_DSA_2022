const categoriaPersistence = require('../persistence/categoria_persistence')


async function inserir(categoria) {
    if(categoria && categoria.nome){
        const categoriaInserida = await categoriaPersistence.inserir(categoria);
        return categoriaInserida;
    }
    else {
        throw { id: 400, mensagem: "Falta parametros"};
    }
}

async function listar() {
    return await categoriaPersistence.listar();
}

async function buscarPorId(id) {
    const categoria = await categoriaPersistence.buscarPorId(id);
    if(!categoria) {
        throw { id: 404, mensagem: `Categoria ${id} nao encontrado`};
    }
    return categoria;
}


async function atualizar(id, categoria) {
    if(categoria && categoria.nome) {
        const categoriaAtualizar = await buscarPorId(id);
        if(categoriaAtualizar)
            return await categoriaPersistence.atualizar(id, categoria);

    }
    else {
        throw { id: 400, mensagem: "Parametros Invalidos"};
    }
}

async function deletar(id) {
    const categoriaDeletar = await buscarPorId(id);
    if(categoriaDeletar)
        return await categoriaPersistence.deletar(id);
}

module.exports = {
    inserir, listar, buscarPorId, atualizar, deletar
}