const categoriaNegocio = require('./negocio/categoria_negocio')


async function main() {
    try {
        const categoriaInserido1 = await categoriaNegocio.inserir({nome: "categoriaZ"})
        console.log("Categoria Inserido", categoriaInserido1);
    } catch (err) { 
        console.log(err);
    }

    try {
        const categoriaInserido2 = await categoriaNegocio.inserir()
        console.log("Categoria Inserido", categoriaInserido2);
    } catch (err) { 
        console.log(err);
    }

    
    const listaCategorias = await categoriaNegocio.listar();
    console.log("Lista de Categorias",listaCategorias);

    try{ 
        const categoria1 = await categoriaNegocio.buscarPorId(1);
        console.log("Categoria 1", categoria1);
    } catch (err) {
        console.log("Erro", err);
    }

    try{ 
        const categoria100 = await categoriaNegocio.buscarPorId(100);
        console.log("Categoria 100", categoria100);
    } catch (err) {
        console.log("Erro", err);
    }

    //Caso de sucesso
    try{
        const categoriaAtualizado = await categoriaNegocio.atualizar(1, { nome: 'categoria1'});
        console.log("Categoria atualizado", categoriaAtualizado);
    }
    catch(err){
        console.log("Erro", err);
    }

    //Caso de insucesso: Parametro preco é string
    try{
        const categoriaAtualizado = await categoriaNegocio.atualizar(4, {});
        console.log("Categoria atualizado", categoriaAtualizado);
    }
    catch(err){
        console.log("Erro", err);
    }
    
    //Caso de insucesso: Id inexistente
    try{
        const categoriaAtualizado = await categoriaNegocio.atualizar(100, { nome: 'categoria4'});
        console.log("Categoria atualizado", categoriaAtualizado);
    }
    catch(err){
        console.log("Erro", err);
    }

    //Caso de sucesso
    try{
        //Trazer id válido
        const categoriaDeletado = await categoriaNegocio.deletar(3);
        console.log("Categoria deletado", categoriaDeletado);
    } catch(err){
        console.log("Erro", err);
    }
    
    //Caso de insucesso: Id inexistente
    try{
        //Trazer id inválido
        const categoriaDeletado = await categoriaNegocio.deletar(100);
        console.log("Categoria deletado", categoriaDeletado);
    } catch(err){
        console.log("Erro", err);
    }
 
}

main();