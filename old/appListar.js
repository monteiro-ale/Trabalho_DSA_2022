const produtoNegocio = require('./negocio/produto_negocio')


async function main() {
    const listaProdutos = await produtoNegocio.listar();
    console.log("Lista de Produtos",listaProdutos);
}

main();