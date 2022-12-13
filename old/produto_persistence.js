const { Client } = require('pg')
const { conexao } = require('./conexao')

async function listar() {
    const cliente = new Client(conexao)
    await cliente.connect();
    const sql = `SELECT produtos.id, produtos.nome, produtos.preco, 
                categorias.id as categoria_id, categorias.nome as categoria_nome
                FROM produtos
                INNER JOIN categorias 
                ON produtos.idcategoria=categorias.id 
                `;
    const res = await cliente.query(sql);
    let listaProdutos = res.rows.map(function(data) {
        return {
            id: data.id,
            nome: data.nome,
            preco: data.preco,
            categoria: {
                id: data.categoria_id,
                nome: data.categoria_nome
            }
        };
    })
    await cliente.end();
    return listaProdutos;
}

async function inserir(produto) {
    const cliente = new Client(conexao)

    await cliente.connect();

    const res = await cliente.query('INSERT INTO produtos(nome,preco) VALUES ($1,$2) RETURNING *', 
        [produto.nome, produto.preco]);
    await cliente.end();
    return res.rows[0]
}

async function buscarPorId(id) {
    const cliente = new Client(conexao)
    await cliente.connect();
    const res = await cliente.query('SELECT * FROM produtos WHERE id=$1',[id]);
    await cliente.end();
    return res.rows[0];
}

async function buscarPorNome(nome) {
    const cliente = new Client(conexao)
    await cliente.connect();
    const res = await cliente.query('SELECT * FROM produtos WHERE nome=$1',[nome]);
    await cliente.end();
    return res.rows;
}

async function atualizar(id, produto) {
    const cliente = new Client(conexao)

    await cliente.connect();

    const res = await cliente.query('UPDATE produtos SET nome=$1, preco=$2 WHERE id=$3 RETURNING *', 
        [produto.nome, produto.preco, id]);
    await cliente.end();
    return res.rows[0]
}

async function deletar(id) {
    const cliente = new Client(conexao)
    await cliente.connect();
    const res = await cliente.query('DELETE FROM produtos WHERE id=$1 RETURNING *',[id]);
    await cliente.end();
    return res.rows[0];
}

module.exports = {
    listar, 
    inserir, 
    buscarPorId, 
    buscarPorNome,
    atualizar,
    deletar
}