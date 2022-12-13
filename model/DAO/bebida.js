const {MESSAGE_ERROR, MESSAGE_SUCESS} = require('../../modulo/config')

const selectAllBebida = async function() { 
    // Import da classe prismaClient, que é responsável pelas interações com o Banco de dados
    const { PrismaClient } = require('@prisma/client');
    
    // Instancia da classe PrismaClient
    const prisma = new PrismaClient(); 
    
    // rs: Nomenclatura que a gente da para quando vamos rodar um select no banco - RecortSet
    // ou seja, criamos um objeto do tipo RS para receber os dados do BD através do script SQL.
    // queryRaw ta dentro da clase do prisma client, então permite que a gente execute algo no BD.
    const rsPizza = await prisma.$queryRawUnsafe `select cast(id as float) as id, tamanho, id_tipo_bebida, id_produto  from tbl_pizza order by id desc`;
    
    
    
    if (rsPizza.length > 0)  
    {
        return rsPizza
    }
    
    else {
        return false; 
    }
    
    }
    
const insertBebida = async function (bebida) {
    
        try {
        const {PrismaClient} = require('@prisma/client')
        const prisma = new PrismaClient()
        let sql = `insert into tbl_bebida(tamanho, id_tipo_bebida, id_produto)
        values ('${bebida.tamanho}', '${bebida.id_tipo_bebida}', '${bebida.id_produto}')`
        
         
    
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
    
const updateBebida = async function (bebida) {
        
            try {
                // Import da classe prismaClient, que é responsável pelas interações com o Banco de dados
           const { PrismaClient } = require('@prisma/client');
        
           // Instancia da classe PrismaClient
           const prisma = new PrismaClient(); 
        
           let sql = `update tbl_bebida set 
            tamanho           = '${bebida.tamanho}', 
            id_tipo_bebida    = '${bebida.id_tipo_bebida}
            id_produto        = '${bebida.id_produto}'
           where id = '${bebida.id}'
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
    
const deleteBebida = async function(id) {
            try {
                // Import da classe prismaClient, que é responsável pelas interações com o Banco de dados
           const { PrismaClient } = require('@prisma/client');
        
           // Instancia da classe PrismaClient
           const prisma = new PrismaClient(); 
        
           let sql = `delete from tbl_bebida where id = '${id}'`;
        
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
    
const selectBebidaById = async function (id)
        {
        // Import da classe prismaClient, que é responsável pelas interações com o Banco de dados
        const { PrismaClient } = require('@prisma/client');
        
        // Instancia da classe PrismaClient
        const prisma = new PrismaClient(); 
        
        // rs: Nomenclatura que a gente da para quando vamos rodar um select no banco - RecortSet
        // ou seja, criamos um objeto do tipo RS para receber os dados do BD através do script SQL.
        // queryRaw ta dentro da clase do prisma client, então permite que a gente execute algo no BD.
        
        let sql = `select cast(id as float) as id, tamanho, id_tipo_bebida, id_produto from tbl_bebida where id = ${id}`
        
        
        
        const rsBebida = await prisma.$queryRawUnsafe(sql);
        
        if (rsBebida.length > 0)  
        {
            return rsBebida
        }
        
        else {
            return false; 
        }
        }
    
    
module.exports = {
    insertBebida,
    updateBebida,
    selectAllBebida,
    selectBebidaById,
    deleteBebida
}