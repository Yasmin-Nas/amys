const {MESSAGE_ERROR, MESSAGE_SUCESS} = require('../../modulo/config')

const novoProduto = async function (produto) {
    if (produto.nome == '' || produto.preco == '' 
    || produto.nome == undefined || produto.preco == undefined 
    || produto.foto == '' || produto.foto == undefined )
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

module.exports = 
{
    listarProdutos,
    novoProduto
}
