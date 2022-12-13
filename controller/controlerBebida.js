const {MESSAGE_ERROR, MESSAGE_SUCESS} = require('../modulo/config')

const novoBebida = async function (bebida) {
    if (bebida.tamanho == '' || bebida.id_tipo_bebida == '' 
    || bebida.id_produto == '' || bebida.id_produto == undefined
    || bebida.id_tipo_bebida == undefined || bebida.tamanho == undefined )
    {

        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS}
    } else { 
        
        const novoBebida = require('../model/DAO/bebida.js')
           
        const result = await novoBebida.insertBebida(bebida);
        
        if (result){
            return {status: 201, message: MESSAGE_SUCESS.INSERT_ITEM};
            
        } else {
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};
        }
     }
}

const listarBebida = async function () {

    let dadosBebidaJSON = {}

    const {selectAllBebida} = require ('../model/DAO/bebida.js')

    const dadosBebida = await selectAllBebida();

    
    if (dadosBebida) 
    {
        
    // dadosAlunos.reverse() - Reverter a ordem dos dados -  baixo pra cima
    dadosBebidaJSON.bebidas = dadosBebida
    return dadosBebidaJSON

    
    }
        
    else 
    {
        return false; 
    }
}

const buscarBebida = async function(id) {
    // Validação do Id como campo obrigatório
    if (id == '' || id == 'undefined') 
    {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID};
    }
    
    else
    { 
    let dadosBebidaJSON = {}

    const {selectBebidaById} = require ('../model/DAO/bebida.js')

    const dadosBebida = await selectBebidaById(id);

    
    if (dadosBebida) 
    {
        
    // dadosAlunos.reverse() - Reverter a ordem dos dados -  baixo pra cima
    dadosBebidaJSON.bebidas = dadosBebida
    return dadosBebidaJSON

    }
        
    else 
    {
        return false; 
    }
    }
}

const excluirBebida = async function(id) {
    if (id == '' || id == 'undefined') 
    {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID};
    }
   
    else 
    {
        // Validação para verificar se o ID existe no Banco de Dados
        const bebida = await buscarBebida(id)

        if (bebida)
    {
            // Import da model de Cursos
        const apagarBebida = require('../model/DAO/bebida.js')
        
        // Chama a funcao para excluir um curso
        const result = await apagarBebida.deleteBebida(id);
        
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

const atualizarBebida = async function(bebida) {
    if (bebida.id == '' || bebida.id == 'undefined') 
    {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID};
    }
    else if (bebida.tamanho == '' || bebida.id_tipo_bebida == '' 
    || bebida.id_produto == '' || bebida.id_produto == undefined
    || bebida.id_tipo_bebida == undefined || bebida.tamanho == undefined )
    {

        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS}
    }

   else {
        
        // Import da model de Cursos
        const atualizarBebida = require('../model/DAO/bebida.js')
        
        // Chama a funcao para atualizar um curso
        const result = await atualizarBebida.updateBebida(bebidas);
        
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

module.exports = {
    listarBebida,
    excluirBebida,
    atualizarBebida,
    novoBebida,
    buscarBebida
}