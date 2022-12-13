const {MESSAGE_ERROR, MESSAGE_SUCESS} = require('../modulo/config.js')

const listarPromocoes = async function () {

    let dadosPromocoesJSON = {}

    const {selectAllPromocoes} = require ('../model/DAO/promocao.js')

    const dadosPromocao = await selectAllPromocoes();

    
    if (dadosPromocao) 
    {
        
    // dadosAlunos.reverse() - Reverter a ordem dos dados -  baixo pra cima
    dadosPromocoesJSON.promocoes = dadosPromocao
    return dadosPromocoesJSON

    
    }
        
    else 
    {
        return false; 
    }
}


const novoPromocao = async function (promocao) {
    if (promocao.prazo == '' || promocao.nome == '' 
    || promocao.descricao == '' ||  promocao.prazo == undefined
    || promocao.nome == undefined || promocao.descricao == ''== undefined )
    {

        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS}
    }

    else  { 
        
        // Import da model de Ingrediente
        const novoPromocao = require('../model/DAO/promocao.js')
        
        // Chama a funcao para inserir um novo ingrediente
        const result = await novoPromocao.insertPromocao(promocao);
        
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

const atualizarPromocao = async function (promocao) {

    
        if (promocao.id == '' || promocao.id == 'undefined') 
        {
            return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID};
        }
        else if (promocao.prazo == '' || promocao.nome == '' 
        || promocao.descricao == '' ||  promocao.prazo == undefined
        || promocao.nome == undefined || promocao.descricao == ''== undefined )
        {
    
            return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS}
        }
    
      
    else {
            
            // Import da model de Alunos
            const atualizarPromocao = require('../model/DAO/promocao.js')
            
            // Chama a funcao para atualizar um aluno
            const result = await atualizarPromocao.updatePromocao(promocao);
            
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

const excluirPromocao = async function(id) {
    if (id == '' || id == 'undefined') 
    {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID};
    }
   
    else 
    {
        // Validação para verificar se o ID existe no Banco de Dados
        const promocao = await buscarPromocao(id)

        if (promocao)
    {
            // Import da model de Cursos
        const apagarPromocao = require('../model/DAO/promocao.js')
        
        // Chama a funcao para excluir um curso
        const result = await apagarPromocao.deletePromocao(id);
        
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

const buscarPromocao = async function(id) {
    // Validação do Id como campo obrigatório
    if (id == '' || id == 'undefined') 
    {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID};
    }
    
    else
    { 
    let dadosPromocoesJSON = {}

    const {selectPromocaoById} = require ('../model/DAO/promocao.js')

    const dadosPromocoes = await selectPromocaoById(id);

    
    if (dadosPromocoes) 
    {
        
    // dadosAlunos.reverse() - Reverter a ordem dos dados -  baixo pra cima
    dadosPromocoesJSON.promocao = dadosPromocoes
    return dadosPromocoesJSON

    }
        
    else 
    {
        return false; 
    }
    }
}

    

module.exports = {
    novoPromocao,
    atualizarPromocao,
   
    buscarPromocao, 
    listarPromocoes,
    excluirPromocao
}