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

 const verifyJWT = async function (request, response, next){
    const jwt = require('./middleware/middlewareJWT.js')
    let token = request.headers['x-acess-token']
    const autenticidadeToken = await jwt.validateJWT(token)
    
    if(autenticidadeToken)
    next()
    else 
    return response.status(401).end()
  
}

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
app.post('/v1/Produto', cors(), jsonParser, async function (request, response) {
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

            statusCode = novoProduto.status
            message = novoProduto.message
           
            
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
    const controllerProduto = require('./controller/controllerProduto')

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

//Buscar produto pelo id 
app.get('/v1/Produto/:id', cors(), async function(request, response, next){
    
    let statusCode;
    let message;
    let id = request.params.id;

    if(id != " " && id != undefined) 
    {
        
        // Import do arquivo ControllerAluno
        const controllerProduto = require('./controller/controllerProduto')

        // Retorna todos os alunos existentes no banco de dados
        const dadosProduto = await controllerProduto.buscarProduto(id);
    
    

    // Valida se existe retorno de dados
    if (dadosProduto) 
    {
        statusCode = 200;
        message = dadosProduto;
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

//Deletar produto
app.delete('/v1/Produto/:id', cors(), jsonParser, async function (request, response)
{
    let statusCode;
    let message;
    let id = request.params.id


    // Validação do Id na requisição
        if(id != " " && id != undefined)
            {
             // Import do arquivo da controller de aluno
            const controllerProduto =  require('./controller/controllerProduto')

            // Validar se existe o ID no Banco de Dados
            const buscarProduto = await controllerProduto.buscarProduto(id)

            // Chamando a funcao para excluir um item
            const produto = await controllerProduto.excluirProduto(id)

            statusCode = produto.status
            message = produto.message
            }
            
        else
            {
                statusCode = 400;
                message = MESSAGE_ERROR.REQUIRED_ID;
            }

        response.status(statusCode)
        response.json(message)
})

//Atualizar produto 
app.put('/v1/Produto/:id', cors(), jsonParser, async function (request, response)
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
            const controllerProduto =  require('./controller/controllerProduto')

            // Chamando a funcao novoAluno da controller e encaminha os dados do body
            const novoProduto = await controllerProduto.atualizarProduto(dadosBody)

            statusCode = novoProduto.status
            message = novoProduto.message
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

/****************************************************
 * crud tbl_servico
 ************************************************/

// inserir tipo de servico
app.post('/v1/Servico', cors(), jsonParser, async function (request, response) {
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
            const controllerServico =  require('./controller/controllerServico')

            // Chamando a funcao novoAluno da controller e encaminha os dados do body
            const novoTipoServico = await controllerServico.novoTipoServico(dadosBody)

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

// Listar todos os tipos de servico
app.get('/v1/servico', cors(), async function(request, response, next){
    
    let statusCode;
    let message;

    // Import do arquivo ControllerAluno
    const controllerServico = require('./controller/controllerServico')

    // Retorna todos os alunos existentes no banco de dados
    const dadosServicos = await controllerServico.listarTipoServico();

    // Valida se existe retorno de dados
    if (dadosServicos) 
    {
        statusCode = 200;
        message = dadosServicos;
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


// listar todas as pizzas
app.get('/v1/pizzas', cors(), async function(request, response, next){
    
    let statusCode;
    let message;

    // Import do arquivo ControllerAluno
    const controllerPizza = require('./controller/controllerPizza')

    // Retorna todos os alunos existentes no banco de dados
    const dadosPizza = await controllerPizza.listarPizza();

    // Valida se existe retorno de dados
    if (dadosPizza) 
    {
        statusCode = 200;
        message = dadosPizza;
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

  // Endpoint que lista todas as bebidas 
app.get('/v2/produtos/bebidas', cors(), async(request,response,next) => {

    const dadosBebidas = await controllerProduto.listarBebidas()
    if(dadosBebidas){
       
        statusCode = 200
        message = dadosBebidas
    } else{
        statusCode = 400
        message = MESSAGE_ERROR.NOT_FOUND_DB
    }
 
    response.status(statusCode)
    response.json(message)
})


/*****************************************
 * crud tbl_promocao
 */

app.get('/v1/promocao', cors(), async function(request, response, next){
    
    let statusCode;
    let message;

    // Import do arquivo ControllerAluno
    const controllerPromocao = require('./controller/controllerPromocao')

    // Retorna todos os alunos existentes no banco de dados
    const dadosPromocao = await controllerPromocao.listarPromocoes();

    // Valida se existe retorno de dados
    if (dadosPromocao) 
    {
        statusCode = 200;
        message = dadosPromocao;
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


// Inserir - tbl_promocao
app.post('/v1/promocao', cors(), jsonParser, async function (request, response) {
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
            const controllerPromocao =  require('./controller/controllerPromocao.js')

            // Chamando a funcao novoAluno da controller e encaminha os dados do body
            const novoPromocao = await controllerPromocao.novoPromocao(dadosBody)

            statusCode = novoPromocao.status
            message = novoPromocao.message
           
            
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

// Atualizar - tbl_promocao
app.put('/v1/promocao/:id', cors(), jsonParser, async function (request, response)
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
            const controllerPromocao =  require('./controller/controllerPromocao')

            // Chamando a funcao novoAluno da controller e encaminha os dados do body
            const novoPromocao = await controllerPromocao.atualizarPromocao(dadosBody)

            statusCode = novoPromocao.status
            message = novoPromocao.message
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


// Apagar - tbl_promocao
app.delete('/v1/promocao/:id', cors(), jsonParser, async function (request, response)
{
    let statusCode;
    let message;
    let id = request.params.id


    // Validação do Id na requisição
        if(id != " " && id != undefined)
            {
             // Import do arquivo da controller de aluno
            const controllerPromocao =  require('./controller/controllerPromocao')

            // Validar se existe o ID no Banco de Dados
            const buscarPromocao = await controllerPromocao.buscarPromocao(id)

            // Chamando a funcao para excluir um item
            const promocao = await controllerPromocao.excluirPromocao(id)

            statusCode = promocao.status
            message = promocao.message
            }
            
        else
            {
                statusCode = 400;
                message = MESSAGE_ERROR.REQUIRED_ID;
            }

        response.status(statusCode)
        response.json(message)
})

// Buscra pelo id - tbl_promocao
app.get('/v1/promocao/:id', cors(), async function(request, response, next){
    
    let statusCode;
    let message;
    let id = request.params.id;

    if(id != " " && id != undefined) 
    {
        
        // Import do arquivo ControllerAluno
        const controllerPromocao = require('./controller/controllerPromocao')

        // Retorna todos os alunos existentes no banco de dados
        const dadosPromocao = await controllerPromocao.buscarPromocao(id);
    
    

    // Valida se existe retorno de dados
    if (dadosPromocao) 
    {
        statusCode = 200;
        message = dadosPromocao;
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

/*************************************************
 * crud tbl_colaborador
 */

 app.get('/v1/colaborador', cors(), async (request, response, next) => {
   
    const dadosLogin = await controllerColaborador.listarColaborador()
     if (dadosLogin) {
 
         statusCode = 200
         message = dadosLogin
 
     } else {
         statusCode = 400
         message = MESSAGE_ERROR.NOT_FOUND_DB
     }
     response.status(statusCode)
    response.json(message)
 })


 /**********************************************
  * crud tbl_pizza 
  */

 // Selecionar todos tbl_pizza
app.get('/v1/TodasPizza', cors(), async function(request, response, next){
    
    let statusCode;
    let message;

    // Import do arquivo ControllerAluno
    const controllerPizza = require('./controller/controllerPizza')

    // Retorna todos os alunos existentes no banco de dados
    const dadosPizza = await controllerPizza.listarPizza();

    // Valida se existe retorno de dados
    if (dadosPizza) 
    {
        statusCode = 200;
        message = dadosPizza;
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


// Inserir - tbl_pizza
app.post('/v1/novaPizza', cors(), jsonParser, async function (request, response) {
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
            const controllerPizza =  require('./controller/controllerPizza.js')

            // Chamando a funcao novoAluno da controller e encaminha os dados do body
            const novoPizza = await controllerPizza.novoPizza(dadosBody)

            statusCode = novoPizza.status
            message = novoPizza.message
           
            
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

// Atualizar - tbl_pizza
app.put('/v1/atualizarPizza/:id', cors(), jsonParser, async function (request, response)
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
            const controllerPizza =  require('./controller/controllerPizza.js')

            // Chamando a funcao novoAluno da controller e encaminha os dados do body
            const novoPizza = await controllerPizza.atualizarPizza(dadosBody)

            statusCode = novoPizza.status
            message = novoPizza.message
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


// Apagar - tbl_pizza
app.delete('/v1/apagarPizza/:id', cors(), jsonParser, async function (request, response)
{
    let statusCode;
    let message;
    let id = request.params.id


    // Validação do Id na requisição
        if(id != " " && id != undefined)
            {
             // Import do arquivo da controller de aluno
            const controllerPizza =  require('./controller/controllerPizza.js')

            // Validar se existe o ID no Banco de Dados
            const buscarPizza= await controllerPizza.buscarPizza(id)

            // Chamando a funcao para excluir um item
            const pizza = await controllerPizza.excluirPizza(id)

            statusCode = pizza.status
            message = pizza.message
            }
            
        else
            {
                statusCode = 400;
                message = MESSAGE_ERROR.REQUIRED_ID;
            }

        response.status(statusCode)
        response.json(message)
})

// Buscra pelo id - tbl_pizza
app.get('/v1/pizza/:id', cors(), async function(request, response, next){
    
    let statusCode;
    let message;
    let id = request.params.id;

    if(id != " " && id != undefined) 
    {
        
        // Import do arquivo ControllerAluno
        const controllerPizza = require('./controller/controllerPizza.js')

        // Retorna todos os alunos existentes no banco de dados
        const dadosPizza = await controllerPizza.buscarPizza(id);
    
    

    // Valida se existe retorno de dados
    if (dadosPizza) 
    {
        statusCode = 200;
        message = dadosPizza;
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
 * crud tbl_bebida
 */

// Selecionar todos tbl_bebida
app.get('/v1/TodasBebida', cors(), async function(request, response, next){
    
    let statusCode;
    let message;

    // Import do arquivo ControllerAluno
    const controllerBebida = require('./controller/controlerBebida.js')

    // Retorna todos os alunos existentes no banco de dados
    const dadosBebida = await controllerBebida.listarBebida();

    // Valida se existe retorno de dados
    if (dadosBebida) 
    {
        statusCode = 200;
        message = dadosBebida;
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


// Inserir - tbl_bebida
app.post('/v1/novaBebida', cors(), jsonParser, async function (request, response) {
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
            const controllerBebida =  require('./controller/controlerBebida.js')

            // Chamando a funcao novoAluno da controller e encaminha os dados do body
            const novoBebida = await controllerBebida.novoBebida(dadosBody)

            statusCode = novoBebida.status
            message = novoBebida.message
           
            
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

// Atualizar - tbl_bebida
app.put('/v1/atualizarBebida/:id', cors(), jsonParser, async function (request, response)
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
            const controllerBebida=  require('./controller/controlerBebida.js')

            // Chamando a funcao novoAluno da controller e encaminha os dados do body
            const novoBebida = await controllerBebida.atualizarBebida(dadosBody)

            statusCode = novoBebida.status
            message = novoBebida.message
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


// Apagar - tbl_bebida
app.delete('/v1/apagarBebida/:id', cors(), jsonParser, async function (request, response)
{
    let statusCode;
    let message;
    let id = request.params.id


    // Validação do Id na requisição
        if(id != " " && id != undefined)
            {
             // Import do arquivo da controller de aluno
            const controllerBebida =  require('./controller/controlerBebida.js')

            // Validar se existe o ID no Banco de Dados
            const buscarBebida = await controllerBebida.buscarBebida(id)

            // Chamando a funcao para excluir um item
            const bebida = await controllerBebida.excluirBebida(id)

            statusCode = bebida.status
            message = bebida.message
            }
            
        else
            {
                statusCode = 400;
                message = MESSAGE_ERROR.REQUIRED_ID;
            }

        response.status(statusCode)
        response.json(message)
})

// Buscra pelo id - tbl_pizza
app.get('/v1/bebida/:id', cors(), async function(request, response, next){
    
    let statusCode;
    let message;
    let id = request.params.id;

    if(id != " " && id != undefined) 
    {
        
        // Import do arquivo ControllerAluno
        const controllerBebida = require('./controller/controlerBebida.js')

        // Retorna todos os alunos existentes no banco de dados
        const dadosBebida = await controllerBebida.buscarBebida(id);
    
    

    // Valida se existe retorno de dados
    if (dadosBebida) 
    {
        statusCode = 200;
        message = dadosBebida;
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

// apagar colaborador - tbl_colaborador 
app.delete('/v1/apagar/login/:id', cors(), jsonParser, async function (request, response) {

    let statusCode
    let message
    let id = request.params.id

    if(id != '' && id != undefined){
        const controllerColaborador = require('./controller/controllerColaborador.js')
        const deletarServicoo = await controllerColaborador.excluirLogin(id)
    
        statusCode = deletarServicoo.status
        message = deletarServicoo.message
    }else{
    
        statusCode = 400
        message = MESSAGE_ERROR.REQUIRED_ID
    
    }

    response.status(statusCode)
    response.json(message)

});

// inserir
/*app.post('/v1/inserirColaborador', verifyJWT, cors(), jsonParser, async function (request, response) {
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
            const controllerColaborador =  require('./controller/controllerColaborador')

            // Chamando a funcao novoAluno da controller e encaminha os dados do body
            const novoLogin = await controllerColaborador.novoLogin(dadosBody)

            statusCode = novoLogin.status
            message = novoLogin.message
           
            
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
*/



// inserir colaborador
app.post('/v1/Colaborador', cors(), jsonParser, async function (request, response) {
    let statusCode;
    let message;
    let headerContentType;


    headerContentType = request.headers['content-type'];
   
    if (headerContentType == 'application/json') 
    {
        
        let dadosBody = request.body;
        
       
        if (JSON.stringify(dadosBody) != '{}') 
        {

          
            const controllerColaborador=  require('./controller/controllerColaborador.js')

           
            const novoLogin = await controllerColaborador.novoLogin(dadosBody)
            
            statusCode = novoLogin.status
            message = novoLogin.message
           
            
        }

            else  
            {
            statusCode = 400;
            message = MESSAGE_ERROR.EMPTY_BODY;
            }

            
    }

            else {
            statusCode = 415;
            message = MESSAGE_ERROR.CONTENT_TYPE;
            }

            response.status(statusCode)
            response.json(message)

})



// tbl_colaborador - get 
app.get('/v1/login',verifyJWT, cors(), async (request, response, next) => {
   
    const dadosLogin = await controllerColaborador.listarLogin()
     if (dadosLogin) {
 
         statusCode = 200
         message = dadosLogin
 
     } else {
         statusCode = 400
         message = MESSAGE_ERROR.NOT_FOUND_DB
     }
     response.status(statusCode)
    response.json(message)
})

// tbl_colaborador - autenticar
app.post('/colaborador/autenticar',jsonParser, cors(), async function (request, response){
    let statusCode
    let message
    let headerContentType

    headerContentType = request.headers['content-type']

    if(headerContentType== 'application/json'){
        let dadosBody = request.body

        if(JSON.stringify(dadosBody)!= '{}'){
           
                
                const controllerColaborador = require('./controller/controllerColaborador.js')

                const atualizar = await controllerColaborador.novoLogin(dadosBody)
               
                statusCode = atualizar.status
                message = atualizar.message
            
        }else{
            statusCode = 400
            message = MESSAGE_ERROR.EMPTY_BODY
        }
    }else{
        statusCode = 415
        message = MESSAGE_ERROR.CONTENT_TYPE
    }

    response.status(statusCode)
    response.json(message)
})

//todos 


// app.get('/v1/listarTodos', cors(), async function(request, response, next){
    
//     let statusCode;
//     let message;

//     // Import do arquivo ControllerAluno
//     const controllerColaborador = require('./controller/controllerColaborador.js')

//     // Retorna todos os alunos existentes no banco de dados
//     const dadosColaborador = await controllerColaborador.listarLogin();

//     // Valida se existe retorno de dados
//     if (dadosColaborador) 
//     {
//         statusCode = 200;
//         message = dadosColaborador;
//     }

//     else 
//     {
//         statusCode = 404;
//         message = MESSAGE_ERROR.NOT_FOUND_DB
//     }

//     // console.log(message)
//     //  Retorna os dados da API
//      response.status(statusCode)
//      response.json(message);
// });

//retorna o colaborador


app.get('/v1/login',verifyJWT, cors(), async (request, response, next) => {
    let statusCode
    let message
    let nome_colaborador = request.params.nome_colaborador
    let senha = request.params.senha

    dados = {}

    dados.nome_colaborador = nome_colaborador
    dados.senha = senha 


});

app.listen(8080, function(){
    console.log('Servidor aguardando requisições.')

});