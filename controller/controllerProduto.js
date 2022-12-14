const {MESSAGE_ERROR, MESSAGE_SUCESS} = require('../modulo/config')

const novoProduto = async function (produto) {
    if (produto.nome == '' || produto.preco == '' 
    || produto.nome == undefined || produto.preco == undefined )
    {

        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS}
    } else { 
        
        const novoProduto = require('../model/DAO/produto.js')
           
        const result = await novoProduto.insertProduto(produto);
        
        if (result){
            return {status: 201, message: MESSAGE_SUCESS.INSERT_ITEM};
            
        } else {
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};
        }
     }
}

const listarProdutos = async function () {

    let dadosProdutosJSON = {}

    const {selectAllProdutos} = require ('../model/DAO/produto')

    const dadosProdutos = await selectAllProdutos();

    
    if (dadosProdutos) 
    {
        
    // dadosAlunos.reverse() - Reverter a ordem dos dados -  baixo pra cima
    dadosProdutosJSON.produtos= dadosProdutos
    return dadosProdutosJSON

    
    }
        
    else 
    {
        return false; 
    }
}

const buscarProduto = async function(id) {
    // Validação do Id como campo obrigatório
    if (id == '' || id == 'undefined') 
    {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID};
    }
    
    else
    { 
    let dadosProdutoJSON = {}

    const {selectProdutoById} = require ('../model/DAO/produto')

    const dadosProduto = await selectProdutoById(id);

    
    if (dadosProduto) 
    {
        
    // dadosAlunos.reverse() - Reverter a ordem dos dados -  baixo pra cima
    dadosProdutoJSON.produto= dadosProduto
    return dadosProdutoJSON

    }
        
    else 
    {
        return false; 
    }
    }
}

const excluirProduto = async function(id) {
    if (id == '' || id == 'undefined') 
    {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID};
    }
   
    else 
    {
        // Validação para verificar se o ID existe no Banco de Dados
        const produto = await buscarProduto(id)

        if (produto)
    {
            // Import da model de Cursos
        const apagarProduto = require('../model/DAO/produto')
        
        // Chama a funcao para excluir um curso
        const result = await apagarProduto.deleteProduto(id);
        
        if (result)
        {
            return {status: 201, message: MESSAGE_SUCESS.DELETE_ITEM};
        }
        
        else 
        {
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};
        }
    
    }

    else 
    {
        return {status: 404, message: MESSAGE_ERROR.NOT_FOUND_DB}
    }
}
}

const atualizarProduto = async function(produto) {
    if (produto.id == '' || produto.id == 'undefined') 
    {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID};
    }
    else if (produto.nome == '' || produto.preco == '' 
    || produto.nome == undefined || produto.preco == undefined )
    {

        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS}
    }

   else {
        
        // Import da model de Cursos
        const atualizarProduto = require('../model/DAO/produto.js')
        
        // Chama a funcao para atualizar um curso
        const result = await atualizarProduto.updateProduto(produto);
        
        if (result)
        {
            return {status: 201, message: MESSAGE_SUCESS.UPDATE_ITEM};
        }
        

        else 
        {
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};
        }
        
        
        
        }
}


module.exports = 
{
    listarProdutos,
    novoProduto,
    buscarProduto,
    excluirProduto,
    atualizarProduto
}
