const {MESSAGE_ERROR, MESSAGE_SUCESS} = require('../modulo/config.js')

/*const novoLogin = async (colaborador) => {
    const nlogin = require('../model/DAO/colaborador.js');

    if (colaborador.senha == '' || colaborador.login == '' || colaborador.nome == '' 
    || colaborador.senha == undefined || colaborador.login == undefined || colaborador.nome == undefined) {
        return {status:400, message: MESSAGE_ERROR.REQUIRED_FIELDS};
    }else{
        const jwt = require ('../middleware/middlewareJWT.js')
        const resultnlogin = await nlogin.insertUser(colaborador);

           
            if (resultnlogin) {
                let tokenUser = await jwt.createJWT(resultnlogin.id)
                resultnlogin.token = tokenUser
               
                return {status: 201, message: tokenUser};
            } else {
                return {status: 500, message: MESSAGE_ERROR.INTERNAL_SERVER_ERROR};
            }
       
    }

        
} */

const novoLogin = async function (colaborador) {
    console.log(colaborador);

    if (colaborador.senha == '' || colaborador.login == '' || colaborador.nome == '' 
    || colaborador.senha == undefined || colaborador.login == undefined || colaborador.nome == undefined)
    {
     return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS}
    }

    else { 

        const novoColaborador = require('../model/DAO/colaborador.js')
        
        // Chama a funcao para inserir um novo ingrediente
        const newColab = await novoColaborador.insertUser(colaborador);
        
        
        if (newColab){
            return {status: 201, message: MESSAGE_SUCESS.INSERT_ITEM};        
        }else {
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};
        }
        
        }
    }

const updateLogin = async (colaborador) => {

    //validacao para o id como campo obrigatorio
    if (login.id == '' || login.id == undefined)
        return {status: 400, MESSAGE: MESSAGE_ERROR.REQUIRED_ID}
        else if (colaborador.senha == '' || colaborador.login == '' || colaborador.nome == '' 
        || colaborador.senha == undefined || colaborador.login == undefined || colaborador.lnome == undefined) {
            return {status:400, message: MESSAGE_ERROR.REQUIRED_FIELDS};
        }
        else 
        {

            const result = await nlogin.updateUser(user)

            if (result) {
                return {status: 201, message: MESSAGE_SUCCESS.UPDATE_ITEM};
            } else 
                return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};
        }
}

const excluirLogin = async (id) => {

//validacao para o id como campo obrigatorio
    if (id == '' || id == undefined)
        return {status: 400, MESSAGE: MESSAGE_ERROR.REQUIRED_ID}

    const usuario = await nlogin.selectUserById(id)

    if(usuario) {

         //funcao para deletar um curso
         const result = await nlogin.deleteUser(id);
 
         if (result) {
             return {status: 201, message: MESSAGE_SUCCESS.DELETE_ITEM};
         } else 
             return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};
     } else {
         return {status: 404, message: MESSAGE_ERROR.NOT_FOUND_DB};
     }
        
}


const buscarLogin = async function (id) {
    if (id == undefined || id == '') {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    }

    const dadosu = await nlogin.selectUserById(id)

    if (dadosu) {
        return {status: 200}
    } else{
        return false
    }
}

const listarLogin = async function() {
    

        let dadosColaJSON = {}
     
        const {selectAllColaborador} = require ('../model/DAO/colaborador.js')
     
        const dadosCola = await selectAllColaborador();
     
        
        if (dadosCola) 
        {
            
        // dadosAlunos.reverse() - Reverter a ordem dos dados -  baixo pra cima
        dadosColaJSON.colaboradores = dadosCola
        return dadosColaJSON
     
        
        }
            
        else 
        {
            return false; 
        }
     }
    
const autenticarColaborador = async function(senha,login, nome){
        
        const colaborador = require('../model/DAO/colaborador.js')
        const jwt = require('../middleware/middlewareJWT.js')
        const dadosColaborador = await colaborador.selectAuthByPassword(senha,login, nome)

        if(dadosColaborador){
            let tokenUser = await jwt.createJWT(dadosColaborador.id)
            dadosColaborador.token =  tokenUser
            return dadosColaborador
        } else
        return false 
    }

    module.exports = {
      
        novoLogin, 
        updateLogin,
        excluirLogin, 
        buscarLogin, 
        listarLogin,
        autenticarColaborador, 
        novoLogin

    }