
const {MESSAGE_ERROR, MESSAGE_SUCESS} = require('../modulo/config.js')

const listarIngredientes = async function () {

    let dadosIngredientesJSON = {}

    const {selectAllIngredientes} = require ('../model/DAO/ingrediente')

    const dadosIngredintes = await selectAllIngredientes();

    
    if (dadosIngredintes) 
    {
        
    // dadosAlunos.reverse() - Reverter a ordem dos dados -  baixo pra cima
    dadosIngredientesJSON.ingrediente = dadosIngredintes
    return dadosIngredientesJSON 

    
    }
        
    else 
    {
        return false; 
    }
}


const novoIngrediente = async function (ingrediente) {
    if (ingrediente.nome == '' || ingrediente.acompanhamentos == '' 
    || ingrediente.nome == undefined || ingrediente.acompanhamentos== undefined )
    {

        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS}
    }

    else  { 
        
        // Import da model de Ingrediente
        const novoIngrediente = require('../model/DAO/ingrediente.js')
        
        // Chama a funcao para inserir um novo ingrediente
        const result = await novoIngrediente.insertIngrediente(ingrediente);
        
    //    console.log(result)
        
        if (result)
        {
            return {status: 201, message: MESSAGE_SUCESS.INSERT_ITEM};
            
        }
        
        
        else 
        {
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};
        }
        
        
        
        }
    }

const atualizarIngrediente = async function(ingrediente) {
    if (ingrediente.id == '' || ingrediente.id == 'undefined') 
    {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID};
    }
    else if (ingrediente.nome == '' || ingrediente.acompanhamentos == '' 
    || ingrediente.nome == undefined || ingrediente.acompanhamentos == undefined )
    {

        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS}
    }

   else {
        
        // Import da model de Cursos
        const atualizarIngrediente = require('../model/DAO/ingrediente')
        
        // Chama a funcao para atualizar um curso
        const result = await atualizarIngrediente.updateIngrediente(ingrediente);
        
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

const excluirIngrediente = async function(id) {
    if (id == '' || id == 'undefined') 
    {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID};
    }
   
    else 
    {
        // Validação para verificar se o ID existe no Banco de Dados
        const ingrediente = await buscarIngrediente(id)

        if (ingrediente)
    {
            // Import da model de Cursos
        const apagarIngrediente = require('../model/DAO/ingrediente')
        
        // Chama a funcao para excluir um curso
        const result = await apagarIngrediente.deleteIngrediente(id);
        
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

const buscarProduto = async function(id) {
    // Validação do Id como campo obrigatório
    if (id == '' || id == 'undefined') 
    {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID};
    }
    
    else
    { 
    let dadosIngredientesJSON = {}

    const {selectIngredienteById} = require ('../model/DAO/ingrediente')

    const dadosIngredintes = await selectIngredienteById(id);

    
    if (dadosIngredintes) 
    {
        
    // dadosAlunos.reverse() - Reverter a ordem dos dados -  baixo pra cima
    dadosIngredientesJSON.ingrediente = dadosIngredintes
    return dadosIngredientesJSON

    }
        
    else 
    {
        return false; 
    }
    }
}

    

module.exports = {
    novoIngrediente,
    atualizarIngrediente,
    listarIngredientes,
    excluirIngrediente,
    buscarProduto
}