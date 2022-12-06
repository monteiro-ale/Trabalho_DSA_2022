const { Client } = require('pg')
const { conexao } = require('./conexao')

async function listar() {
    const cliente = new Client(conexao)
    await cliente.connect();
    const res = await cliente.query('SELECT * FROM categorias ORDER BY id');
    await cliente.end();
    return res.rows;
}

async function inserir(categoria) {
    const cliente = new Client(conexao)

    await cliente.connect();

    const res = await cliente.query('INSERT INTO categorias(nome) VALUES ($1) RETURNING *', 
        [categoria.nome]);
    await cliente.end();
    return res.rows[0]
}

async function buscarPorId(id) {
    const cliente = new Client(conexao)
    await cliente.connect();
    const res = await cliente.query('SELECT * FROM categorias WHERE id=$1',[id]);
    await cliente.end();
    return res.rows[0];
}

async function atualizar(id, categoria) {
    const cliente = new Client(conexao)

    await cliente.connect();

    const res = await cliente.query('UPDATE categorias SET nome=$1 WHERE id=$2 RETURNING *', 
        [categoria.nome, id]);
    await cliente.end();
    return res.rows[0]
}

async function deletar(id) {
    const cliente = new Client(conexao)
    await cliente.connect();
    const res = await cliente.query('DELETE FROM categorias WHERE id=$1 RETURNING *',[id]);
    await cliente.end();
    return res.rows[0];
}

module.exports = {
    listar, 
    inserir, 
    buscarPorId, 
    atualizar,
    deletar
}