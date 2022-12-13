const {MESSAGE_ERROR, MESSAGE_SUCESS} = require('../../modulo/config')

const selectAllPizza= async function() { 
    // Import da classe prismaClient, que é responsável pelas interações com o Banco de dados
    const { PrismaClient } = require('@prisma/client');
    
    // Instancia da classe PrismaClient
    const prisma = new PrismaClient(); 
    
    // rs: Nomenclatura que a gente da para quando vamos rodar um select no banco - RecortSet
    // ou seja, criamos um objeto do tipo RS para receber os dados do BD através do script SQL.
    // queryRaw ta dentro da clase do prisma client, então permite que a gente execute algo no BD.
    const rsPizza = await prisma.$queryRawUnsafe `select cast(id as float) as id, id_tipo_pizza, id_produto from tbl_pizza order by id desc`;
    
    
    
    if (rsPizza.length > 0)  
    {
        return rsPizza
    }
    
    else {
        return false; 
    }
    
}

const insertPizza= async function(pizza) { 
    try {
        const {PrismaClient} = require('@prisma/client')
        const prisma = new PrismaClient()
        let sql = `insert into tbl_pizza(id_tipo_pizza, id_produto)
        values ('${pizza.id_tipo_pizza}',  '${pizza.id_produto}')`
        
         
    
        const result = await prisma.$executeRawUnsafe(sql)
        
        
    
        if (result)
        return true
        else
        return MESSAGE_ERROR.INTERNAL_ERROR_DB
        }
        catch (error) {
        // return false
        console.log(error)
        }
        
        }
        
const updatePizza = async function (pizza) {
    
            try {
                // Import da classe prismaClient, que é responsável pelas interações com o Banco de dados
           const { PrismaClient } = require('@prisma/client');
        
           // Instancia da classe PrismaClient
           const prisma = new PrismaClient(); 
        
           let sql = `update tbl_pizza set 
            id_tipo_pizza            = '${pizza.id_tipo_pizza}', 
            id_produto        = '${pizza.id_produto}'
           where id = '${pizza.id}'
            `;
        
             
           // Executa o script sql no Banco de Dados
           // Este comando permite encaminhar uma variavel contendo o script (executeRaeUnsafe)
           const result = await prisma.$executeRawUnsafe(sql);
        
        
           if (result) {
               return true;
           }else {
               return false;
           }
        }
        
           catch (error) {
               return false;
           }
        }
    
const deletePizza= async function(id) {
            try {
                // Import da classe prismaClient, que é responsável pelas interações com o Banco de dados
           const { PrismaClient } = require('@prisma/client');
        
           // Instancia da classe PrismaClient
           const prisma = new PrismaClient(); 
        
           let sql = `delete from tbl_pizza where id = '${id}'`;
        
        //    console.log(sql)
        
            // Executa o script sql no Banco de Dados
           // Este comando permite encaminhar uma variavel contendo o script (executeRaeUnsafe)
           const result = await prisma.$executeRawUnsafe(sql);
        
        
           // Verifica se o scrpit foi executado com sucesso no Banco de Dados
           if (result) 
           {
               return true;
           }
            
           else 
           {
               return MESSAGE_ERROR.INTERNAL_ERROR_DB;
           }
        
           }
        
           catch (error) 
           {
               return false;
           }
        }
    
const selectPizzaById = async function (id)
        {
        // Import da classe prismaClient, que é responsável pelas interações com o Banco de dados
        const { PrismaClient } = require('@prisma/client');
        
        // Instancia da classe PrismaClient
        const prisma = new PrismaClient(); 
        
        // rs: Nomenclatura que a gente da para quando vamos rodar um select no banco - RecortSet
        // ou seja, criamos um objeto do tipo RS para receber os dados do BD através do script SQL.
        // queryRaw ta dentro da clase do prisma client, então permite que a gente execute algo no BD.
        
        let sql = `select cast(id as float) as id, id_tipo_pizza, id_produto from tbl_pizza where id = ${id}`
        
        
        
        const rsPizza = await prisma.$queryRawUnsafe(sql);
        
        if (rsPizza.length > 0)  
        {
            return rsPizza
        }
        
        else {
            return false; 
        }
        }
    

        
        
   
    
    
    

module.exports =
{
    selectAllPizza,
    insertPizza,
    selectPizzaById,
    deletePizza,
    updatePizza

}