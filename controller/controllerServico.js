const {MESSAGE_ERROR, MESSAGE_SUCESS} = require('../modulo/config.js')

const novoTipoServico = async function(servico) { 
    if (servico.tipo_servico == '' || servico.tipo_servico == undefined )
        {
    
            return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS}
        }
    
        else  { 
            
            // Import da model de Ingrediente
            const novoTipoServico= require('../model/DAO/servico')
            
            // Chama a funcao para inserir um novo ingrediente
            const result = await novoTipoServico.insertTipoServico(servico);
            
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
    
const listarTipoServico = async function () {
    
        let dadosTipoServicoJSON = {}
    
        const {selectAllTipoServico} = require ('../model/DAO/servico')
    
        const dadosTipoServico = await selectAllTipoServico();
    
        
        if (dadosTipoServico) 
        {
            
        // dadosAlunos.reverse() - Reverter a ordem dos dados -  baixo pra cima
        dadosTipoServicoJSON.Servicos = dadosTipoServico
        return dadosTipoServicoJSON
    
        
        }
            
        else 
        {
            return false; 
        }
    }

module.exports =
{
    listarTipoServico,
    novoTipoServico
}