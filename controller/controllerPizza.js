const {MESSAGE_ERROR, MESSAGE_SUCESS} = require('../modulo/config.js')

const listarPizza = async function () {

   let dadosPizzaJSON = {}

   const {selectAllPizza} = require ('../model/DAO/pizza.js')

   const dadosPizzza = await selectAllPizza();

   
   if (dadosPizzza) 
   {
       
   // dadosAlunos.reverse() - Reverter a ordem dos dados -  baixo pra cima
   dadosPizzaJSON.promocoes = dadosPizzza
   return dadosPizzaJSON

   
   }
       
   else 
   {
       return false; 
   }
}

const novoPizza = async function (pizza) {
   if (pizza.id_tipo_pizza == '' || pizza.id_produto == '' 
   || pizza.id_tipo_pizza == undefined || pizza.id_produto == undefined )
   {

       return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS}
   }

   else  { 
       
       // Import da model de Ingrediente
       const novoPizza = require('../model/DAO/pizza.js')
       
       // Chama a funcao para inserir um novo ingrediente
       const result = await novoPizza.insertPizza(pizza);
       
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

const atualizarPizza = async function (pizza) {

   
       if (pizza.id == '' || pizza.id == 'undefined') 
       {
           return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID};
       }
       else if (pizza.id_tipo_pizza == '' || pizza.id_produto == '' 
       || pizza.id_tipo_pizza == undefined || pizza.id_produto == undefined )
       {
   
           return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS}
       }
   
     
   else {
           
           // Import da model de Alunos
           const atualizarPizza = require('../model/DAO/pizza.js')
           
           // Chama a funcao para atualizar um aluno
           const result = await atualizarPizza.updatePizza(pizza);
           
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

const excluirPizza = async function(id) {
   if (id == '' || id == 'undefined') 
   {
       return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID};
   }
  
   else 
   {
       // Validação para verificar se o ID existe no Banco de Dados
       const pizza = await buscarPizza(id)

       if (pizza)
   {
           // Import da model de Cursos
       const apagarPizza = require('../model/DAO/pizza.js')
       
       // Chama a funcao para excluir um curso
       const result = await apagarPizza.deletePizza(id);
       
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

const buscarPizza = async function(id) {
   // Validação do Id como campo obrigatório
   if (id == '' || id == 'undefined') 
   {
       return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID};
   }
   
   else
   { 
   let dadosPizzaJSON = {}

   const {selectPizzaById} = require ('../model/DAO/pizza.js')

   const dadosPizza = await selectPizzaById(id);

   
   if (dadosPizza) 
   {
       
   // dadosAlunos.reverse() - Reverter a ordem dos dados -  baixo pra cima
   dadosPizzaJSON.pizza = dadosPizza
   return dadosPizzaJSON

   }
       
   else 
   {
       return false; 
   }
   }
}


module.exports =
{
   listarPizza,
   novoPizza,
   atualizarPizza,
   excluirPizza,
   buscarPizza



}
