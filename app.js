/********************************************************************************************************************
 * Objetivo: API responsável pela manipulacao de dados do Backend (get, post, put, delete)
 * Autor: Ana, Mel e yasmin
 * Data Criação: 30/10/2022
 * Versão: 1.0 
 * 
 * Anotações:
 * express
 * cors
 * body-parser
 * npm prisma --save
 * npx prisma
 * npx prisma init 
 * npm install @prisma/client
 *******************************************************************************************************************/

 const express = require('express');
 const cors = require('cors');
 const bodyParser = require('body-parser');
 const { request, response } = require('express');
 
 const {MESSAGE_ERROR, MESSAGE_SUCESS} = require('./modulo/config.js')

 const app = express();

// Configuração de cors para liberar o acesso a API
app.use((request, response, next) => {
    response.header ('Acess-Control-Allow-Origin', '*');

    // Permite especificar quais serão os verbos (metodos) que a API irá reconhecer 
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

    // Estabelece que as permissoes acima serão representadas pelo cors
    app.use(cors());

    // Para pular para a próxima configuração
    next();

});

const jsonParser = bodyParser.json()

/********************
//crud tbl ingrediente
********************/
// inserir novo ingrediente

const {novoIngrediente} = require('./controller/controllerIngrediente')
const {insertIngrediente} = require('./model/DAO/ingrediente')

// Selecionar todos os ingredientes - tbl_ ingredintes
app.get('/v1/ingrediente', cors(), async function(request, response, next){
    
    let statusCode;
    let message;

    // Import do arquivo ControllerAluno
    const controllerIngrediente = require('./controller/controllerIngrediente')

    // Retorna todos os alunos existentes no banco de dados
    const dadosIngredintes = await controllerIngrediente.listarIngredientes();

    // Valida se existe retorno de dados
    if (dadosIngredintes) 
    {
        statusCode = 200;
        message = dadosIngredintes;
    }

    else 
    {
        statusCode = 404;
        message = MESSAGE_ERROR.NOT_FOUND_DB
    }

    // console.log(message)
    //  Retorna os dados da API
     response.status(statusCode)
     response.json(message);
});


// Inserir - tbl_ingrediente
app.post('/v1/ingrediente', cors(), jsonParser, async function (request, response) {
    let statusCode;
    let message;
    let headerContentType;


     // Recebe o tipo de Content-type que foi enviado no header da requisicao
    headerContentType = request.headers['content-type'];
   
    // Validar se o Content-type é do tipo application/json
    if (headerContentType == 'application/json') 
    {
        
        // Recebe o corpo da mensagem - request.body - conteudo
        let dadosBody = request.body;
        
        // Realiza um processo de conversao de dados para conseguir comparar o json vazio
        
        if (JSON.stringify(dadosBody) != '{}') 
        {
            // Import do arquivo da controller de aluno
            const controllerIngrediente =  require('./controller/controllerIngrediente')

            // Chamando a funcao novoAluno da controller e encaminha os dados do body
            const novoIngrediente = await controllerIngrediente.novoIngrediente(dadosBody)

            statusCode = novoIngrediente.status
            message = novoIngrediente.message
           
            
        }

            else  
            {
            statusCode = 400;
            message = MESSAGE_ERROR.EMPTY_BODY;
            }

            
    }

            else 
            {
            statusCode = 415;
            message = MESSAGE_ERROR.CONTENT_TYPE;
            }

            response.status(statusCode)
            response.json(message)

})

// Atualizar - tbl_ingrediente
app.put('/v1/ingrediente/:id', cors(), jsonParser, async function (request, response)
{
    let statusCode;
    let message;
    let headerContentType;


     // Recebe o tipo de Content-type que foi enviado no header da requisicao
    headerContentType = request.headers['content-type'];
   
    // Validar se o Content-type é do tipo application/json
    if (headerContentType == 'application/json') 
    {
        
        // Recebe o corpo da mensagem - request.body - conteudo
        let dadosBody = request.body;
        
        // Realiza um processo de conversao de dados para conseguir comparar o json vazio
        
        if (JSON.stringify(dadosBody) != '{}') 
        {
            // Recebe o Id enviado por parâmetro na requisição
            let id = request.params.id;

            // Validação do Id na requisição
            if(id != " " && id != undefined)
            {
            
            // Adiciona o Id no JSON que chegou no corpo da requisição
            dadosBody.id = id;

            // Import do arquivo da controller de aluno
            const controllerIngrediente =  require('./controller/controllerIngrediente')

            // Chamando a funcao novoAluno da controller e encaminha os dados do body
            const novoIngrediente = await controllerIngrediente.atualizarIngrediente(dadosBody)

            statusCode = novoIngrediente.status
            message = novoIngrediente.message
            } 

            else
            {
                statusCode = 400;
                message = MESSAGE_ERROR.REQUIRED_ID;
            }
            
        }

            else 
            {
            statusCode = 400;
            message = MESSAGE_ERROR.EMPTY_BODY;
            }

    }

            else 
            {
            statusCode = 415;
            message = MESSAGE_ERROR.CONTENT_TYPE;
            }

            response.status(statusCode)
            response.json(message)

})

// Apagar - tbl_ingrediente 
app.delete('/v1/ingrediente/:id', cors(), jsonParser, async function (request, response)
{
    let statusCode;
    let message;
    let id = request.params.id


    // Validação do Id na requisição
        if(id != " " && id != undefined)
            {
             // Import do arquivo da controller de aluno
            const controllerIngrediente=  require('./controller/controllerIngrediente')

            // Validar se existe o ID no Banco de Dados
            const buscarIngrediente = await controllerIngrediente.buscarIngrediente(id)

            // Chamando a funcao para excluir um item
            const ingrediente = await controllerIngrediente.excluirIngrediente(id)

            statusCode = ingrediente.status
            message = ingrediente.message
            }
            
        else
            {
                statusCode = 400;
                message = MESSAGE_ERROR.REQUIRED_ID;
            }

        response.status(statusCode)
        response.json(message)
})

// Buscra pelo id - tbl_ingrediente
app.get('/v1/ingrediente/:id', cors(), async function(request, response, next){
    
    let statusCode;
    let message;
    let id = request.params.id;

    if(id != " " && id != undefined) 
    {
        
        // Import do arquivo ControllerAluno
        const controllerIngrediente = require('./controller/controllerIngrediente')

        // Retorna todos os alunos existentes no banco de dados
        const dadosIngredintes = await controllerIngrediente.buscarIngrediente(id);
    
    

    // Valida se existe retorno de dados
    if (dadosIngredintes) 
    {
        statusCode = 200;
        message = dadosIngredintes;
    }

    else 
    {
        statusCode = 404;
        message = MESSAGE_ERROR.NOT_FOUND_DB
    }

    } 
    
    else
    {
    statusCode = 400;
    message = MESSAGE_ERROR.REQUIRED_ID
    }
    
     response.status(statusCode)
     response.json(message);

});

/*************************************
 * crud - tbl_tipo_pizza e tbl_tipo_bebida 
 ************************************/

// Listar todos tipo pizza
 app.get('/v1/tipoPizza', cors(), async function(request, response, next){
    
    let statusCode;
    let message;

    // Import do arquivo ControllerAluno
    const controllerTipos = require('./controller/controllerTipos')

    // Retorna todos os alunos existentes no banco de dados
    const dadosTipoPizza = await controllerTipos.listarTipoPizza();

    // Valida se existe retorno de dados
    if (dadosTipoPizza) 
    {
        statusCode = 200;
        message = dadosTipoPizza;
    }

    else 
    {
        statusCode = 404;
        message = MESSAGE_ERROR.NOT_FOUND_DB
    }

    // console.log(message)
    //  Retorna os dados da API
     response.status(statusCode)
     response.json(message);
});

// Listar todos tipo bebida 
app.get('/v1/tipoBebida', cors(), async function(request, response, next){
    
    let statusCode;
    let message;

    // Import do arquivo ControllerAluno
    const controllerTipos = require('./controller/controllerTipos')

    // Retorna todos os alunos existentes no banco de dados
    const dadosTipoBebebida= await controllerTipos.listarTipoBebida();

    // Valida se existe retorno de dados
    if (dadosTipoBebebida) 
    {
        statusCode = 200;
        message = dadosTipoBebebida;
    }

    else 
    {
        statusCode = 404;
        message = MESSAGE_ERROR.NOT_FOUND_DB
    }

    // console.log(message)
    //  Retorna os dados da API
     response.status(statusCode)
     response.json(message);
});

// Listar todos tipo servico

app.get('/v1/tipoServico', cors(), async function(request, response, next){
    
    let statusCode;
    let message;

    // Import do arquivo ControllerAluno
    const controllerTipos = require('./controller/controllerTipos')

    // Retorna todos os alunos existentes no banco de dados
    const dadosTipoServico = await controllerTipos.listarTipoServico();

    // Valida se existe retorno de dados
    if (dadosTipoServico) 
    {
        statusCode = 200;
        message = dadosTipoServico;
    }

    else 
    {
        statusCode = 404;
        message = MESSAGE_ERROR.NOT_FOUND_DB
    }

    // console.log(message)
    //  Retorna os dados da API
     response.status(statusCode)
     response.json(message);
});

// Inserir tipo de pizza
app.post('/v1/tipoPizza', cors(), jsonParser, async function (request, response) {
    let statusCode;
    let message;
    let headerContentType;


     // Recebe o tipo de Content-type que foi enviado no header da requisicao
    headerContentType = request.headers['content-type'];
   
    // Validar se o Content-type é do tipo application/json
    if (headerContentType == 'application/json') 
    {
        
        // Recebe o corpo da mensagem - request.body - conteudo
        let dadosBody = request.body;
        
        // Realiza um processo de conversao de dados para conseguir comparar o json vazio
        
        if (JSON.stringify(dadosBody) != '{}') 
        {
            // Import do arquivo da controller de aluno
            const controllerTipos =  require('./controller/controllerTipos')

            // Chamando a funcao novoAluno da controller e encaminha os dados do body
            const novoTipoPizza = await controllerTipos.novoTipoPizza(dadosBody)

            statusCode = novoTipoPizza.status
            message = novoTipoPizza.message
           
            
        }

            else  
            {
            statusCode = 400;
            message = MESSAGE_ERROR.EMPTY_BODY;
            }

            
    }

            else 
            {
            statusCode = 415;
            message = MESSAGE_ERROR.CONTENT_TYPE;
            }

            response.status(statusCode)
            response.json(message)

})

// Inserir tipo de bebida
app.post('/v1/tipoBebida', cors(), jsonParser, async function (request, response) {
    let statusCode;
    let message;
    let headerContentType;


     // Recebe o tipo de Content-type que foi enviado no header da requisicao
    headerContentType = request.headers['content-type'];
   
    // Validar se o Content-type é do tipo application/json
    if (headerContentType == 'application/json') 
    {
        
        // Recebe o corpo da mensagem - request.body - conteudo
        let dadosBody = request.body;
        
        // Realiza um processo de conversao de dados para conseguir comparar o json vazio
        
        if (JSON.stringify(dadosBody) != '{}') 
        {
            // Import do arquivo da controller de aluno
            const controllerTipos =  require('./controller/controllerTipos')

            // Chamando a funcao novoAluno da controller e encaminha os dados do body
            const novoTipoBebida = await controllerTipos.novoTipoBebida(dadosBody)

            statusCode = novoTipoBebida.status
            message = novoTipoBebida.message
           
            
        }

            else  
            {
            statusCode = 400;
            message = MESSAGE_ERROR.EMPTY_BODY;
            }

            
    }

            else 
            {
            statusCode = 415;
            message = MESSAGE_ERROR.CONTENT_TYPE;
            }

            response.status(statusCode)
            response.json(message)

})

// Inserir tipo servico
app.post('/v1/tipoServico', cors(), jsonParser, async function (request, response) {
    let statusCode;
    let message;
    let headerContentType;


     // Recebe o tipo de Content-type que foi enviado no header da requisicao
    headerContentType = request.headers['content-type'];
   
    // Validar se o Content-type é do tipo application/json
    if (headerContentType == 'application/json') 
    {
        
        // Recebe o corpo da mensagem - request.body - conteudo
        let dadosBody = request.body;
        
        // Realiza um processo de conversao de dados para conseguir comparar o json vazio
        
        if (JSON.stringify(dadosBody) != '{}') 
        {
            // Import do arquivo da controller de aluno
            const controllerTipos =  require('./controller/controllerTipos')

            // Chamando a funcao novoAluno da controller e encaminha os dados do body
            const novoTipoServico = await controllerTipos.novoTipoServico(dadosBody)

            statusCode = novoTipoServico.status
            message = novoTipoServico.message
           
            
        }

            else  
            {
            statusCode = 400;
            message = MESSAGE_ERROR.EMPTY_BODY;
            }

            
    }

            else 
            {
            statusCode = 415;
            message = MESSAGE_ERROR.CONTENT_TYPE;
            }

            response.status(statusCode)
            response.json(message)

})

// Buscra pelo id - tbl_tipo_pizza
app.get('/v1/tipoPizza/:id', cors(), async function(request, response, next){
    
    let statusCode;
    let message;
    let id = request.params.id;

    if(id != " " && id != undefined) 
    {
        
        // Import do arquivo ControllerAluno
        const controllerTipos = require('./controller/controllerTipos')

        // Retorna todos os alunos existentes no banco de dados
        const dadosTipoPizza = await controllerTipos.buscarTipoPizza(id);
    
    

    // Valida se existe retorno de dados
    if (dadosTipoPizza) 
    {
        statusCode = 200;
        message = dadosTipoPizza;
    }

    else 
    {
        statusCode = 404;
        message = MESSAGE_ERROR.NOT_FOUND_DB
    }

    } 
    
    else
    {
    statusCode = 400;
    message = MESSAGE_ERROR.REQUIRED_ID
    }
    
     response.status(statusCode)
     response.json(message);

});

// Buscra pelo id - tbl_tipo_bebida
app.get('/v1/tipoBebida/:id', cors(), async function(request, response, next){
    
    let statusCode;
    let message;
    let id = request.params.id;

    if(id != " " && id != undefined) 
    {
        
        // Import do arquivo ControllerAluno
        const controllerTipos = require('./controller/controllerTipos')

        // Retorna todos os alunos existentes no banco de dados
        const dadosTipoBebebida = await controllerTipos.buscarTipoBebida(id);
    
    

    // Valida se existe retorno de dados
    if (dadosTipoBebebida) 
    {
        statusCode = 200;
        message = dadosTipoBebebida;
    }

    else 
    {
        statusCode = 404;
        message = MESSAGE_ERROR.NOT_FOUND_DB
    }

    } 
    
    else
    {
    statusCode = 400;
    message = MESSAGE_ERROR.REQUIRED_ID
    }
    
     response.status(statusCode)
     response.json(message);

});

/*************************************
 * crud - tbl_produto
 ************************************/

// inserir produtos 
app.post('/v1/Produtos', cors(), jsonParser, async function (request, response) {
    let statusCode;
    let message;
    let headerContentType;


     // Recebe o tipo de Content-type que foi enviado no header da requisicao
    headerContentType = request.headers['content-type'];
   
    // Validar se o Content-type é do tipo application/json
    if (headerContentType == 'application/json') 
    {
        
        // Recebe o corpo da mensagem - request.body - conteudo
        let dadosBody = request.body;
        
        // Realiza um processo de conversao de dados para conseguir comparar o json vazio
        
        if (JSON.stringify(dadosBody) != '{}') 
        {
            // Import do arquivo da controller de aluno
            const controllerProduto =  require('./controller/controllerProduto')

            // Chamando a funcao novoAluno da controller e encaminha os dados do body
            const novoProduto = await controllerProduto.novoProduto(dadosBody)

            statusCode = novoTipoBebida.status
            message = novoTipoBebida.message
           
            
        }

            else  
            {
            statusCode = 400;
            message = MESSAGE_ERROR.EMPTY_BODY;
            }

            
    }

            else 
            {
            statusCode = 415;
            message = MESSAGE_ERROR.CONTENT_TYPE;
            }

            response.status(statusCode)
            response.json(message)

})

// lista todos os produtos 
app.get('/v1/Produtos', cors(), async function(request, response, next){
    
    let statusCode;
    let message;

    // Import do arquivo ControllerAluno
    const controllerProduto = require('./controller/controllerIngrediente')

    // Retorna todos os alunos existentes no banco de dados
    const dadosProdutos = await controllerProduto.listarProdutos();

    // Valida se existe retorno de dados
    if (dadosProdutos ) 
    {
        statusCode = 200;
        message = dadosProdutos ;
    }

    else 
    {
        statusCode = 404;
        message = MESSAGE_ERROR.NOT_FOUND_DB
    }

    // console.log(message)
    //  Retorna os dados da API
     response.status(statusCode)
     response.json(message);
});



app.listen(6666, function(){
    console.log('Servidor aguardando requisições.')

});