const {MESSAGE_ERROR, MESSAGE_SUCESS} = require('../modulo/config.js')

const listarTipoPizza = async function () {

    let dadosTipoPizzaJSON = {}

    const {selectAllTipoPizza} = require ('../model/DAO/tipos')

    const dadosTipoPizza = await selectAllTipoPizza();

    
    if (dadosTipoPizza) 
    {
        
    // dadosAlunos.reverse() - Reverter a ordem dos dados -  baixo pra cima
    dadosTipoPizzaJSON.tiposPizza = dadosTipoPizza
    return dadosTipoPizzaJSON

    
    }
        
    else 
    {
        return false; 
    }
}

const listarTipoBebida = async function () {

    let dadosTipoBebidaJSON = {}

    const {selectAllTipoBebida} = require ('../model/DAO/tipos')

    const dadosTipoBebida = await selectAllTipoBebida();

    
    if (dadosTipoBebida) 
    {
        
    // dadosAlunos.reverse() - Reverter a ordem dos dados -  baixo pra cima
    dadosTipoBebidaJSON.tiposBebida = dadosTipoBebida
    return dadosTipoBebidaJSON

    
    }
        
    else 
    {
        return false; 
    }
}

const novoTipoPizza = async function (tipo) {
    if (tipo.tipo == '' || tipo.tipo == undefined )
    {

        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS}
    }

    else  { 
        
        // Import da model de Ingrediente
        const novoTipoPizza = require('../model/DAO/tipos')
        
        // Chama a funcao para inserir um novo ingrediente
        const result = await novoTipoPizza.insertTipoPizza(tipo);
        
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

const novoTipoBebida = async function (tipo) {
        if (tipo.tipo == '' || tipo.tipo == undefined )
        {
    
            return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS}
        }
    
        else  { 
            
            // Import da model de Ingrediente
            const novoTipoBebida = require('../model/DAO/tipos')
            
            // Chama a funcao para inserir um novo ingrediente
            const result = await novoTipoBebida.insertTipoBebida(tipo);
            
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



const buscarTipoBebida = async function(id) {
    // Validação do Id como campo obrigatório
    if (id == '' || id == 'undefined') 
    {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID};
    }
    
    else
    { 
    let dadosTipoBebidaJSON = {}

    const {selectTipoBebidaById} = require ('../model/DAO/tipos')

    const dadosTipoBebida = await selectTipoBebidaById(id);

    
    if (dadosTipoBebida) 
    {
        
    // dadosAlunos.reverse() - Reverter a ordem dos dados -  baixo pra cima
    dadosTipoBebidaJSON.tipos = dadosTipoBebida
    return dadosTipoBebidaJSON

    }
        
    else 
    {
        return false; 
    }
    }
}

const buscarTipoPizza= async function(id) {
    // Validação do Id como campo obrigatório
    if (id == '' || id == 'undefined') 
    {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID};
    }
    
    else
    { 
    let dadosTipoPizzaJSON = {}

    const {selectTipoPizzaById} = require ('../model/DAO/tipos')

    const dadosTipoPizza = await selectTipoPizzaById(id);

    
    if (dadosTipoPizza) 
    {
        
    // dadosAlunos.reverse() - Reverter a ordem dos dados -  baixo pra cima
    dadosTipoPizzaJSON.pizza = dadosTipoPizza
    return dadosTipoPizzaJSON

    }
        
    else 
    {
        return false; 
    }
    }
}


 module.exports =
{
    listarTipoPizza,
    listarTipoBebida, 
    
    novoTipoPizza,
    novoTipoBebida,
   
    buscarTipoBebida,
    buscarTipoPizza,
}