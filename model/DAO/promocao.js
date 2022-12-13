const {MESSAGE_ERROR, MESSAGE_SUCESS} = require('../../modulo/config')

const insertPromocao = async function(promocao) { 
try {
    const {PrismaClient} = require('@prisma/client')
    const prisma = new PrismaClient()
    let sql = `insert into tbl_promocao(prazo, nome, descricao)
    values ('${promocao.prazo}', '${promocao.nome}', '${promocao.descricao}')`
    
     

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
    


const selectAllPromocoes = async function() { 
        // Import da classe prismaClient, que é responsável pelas interações com o Banco de dados
        const { PrismaClient } = require('@prisma/client');
        
        // Instancia da classe PrismaClient
        const prisma = new PrismaClient(); 
        
        // rs: Nomenclatura que a gente da para quando vamos rodar um select no banco - RecortSet
        // ou seja, criamos um objeto do tipo RS para receber os dados do BD através do script SQL.
        // queryRaw ta dentro da clase do prisma client, então permite que a gente execute algo no BD.
        const rsPromocao = await prisma.$queryRawUnsafe `select cast(id as float) as id, prazo, nome, descricao from tbl_promocao order by id desc`;
        
        
        
        if (rsPromocao.length > 0)  
        {
            return rsPromocao
        }
        
        else {
            return false; 
        }
        
    }


const updatePromocao = async function (promocao)
    {
        try {
            // Import da classe prismaClient, que é responsável pelas interações com o Banco de dados
       const { PrismaClient } = require('@prisma/client');
    
       // Instancia da classe PrismaClient
       const prisma = new PrismaClient(); 
    
       let sql = `update tbl_promocao set 
        prazo           = '${promocao.prazo}',
        nome            = '${promocao.nome}',
        descricao       = '${promocao.descricao}'
        where id = '${promocao.id}'
        `;
    
    
        // console.log(sql)
           
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
           return false;
       }
    
       }
    
       catch (error) 
       {
           return false;
       }
    }

const deletePromocao = async function(id) {
        try {
            // Import da classe prismaClient, que é responsável pelas interações com o Banco de dados
       const { PrismaClient } = require('@prisma/client');
    
       // Instancia da classe PrismaClient
       const prisma = new PrismaClient(); 
    
       let sql = `delete from tbl_promocao where id = '${id}'`;
    
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

    const selectPromocaoById = async function (id)
    {
    // Import da classe prismaClient, que é responsável pelas interações com o Banco de dados
    const { PrismaClient } = require('@prisma/client');
    
    // Instancia da classe PrismaClient
    const prisma = new PrismaClient(); 
    
    // rs: Nomenclatura que a gente da para quando vamos rodar um select no banco - RecortSet
    // ou seja, criamos um objeto do tipo RS para receber os dados do BD através do script SQL.
    // queryRaw ta dentro da clase do prisma client, então permite que a gente execute algo no BD.
    
    let sql = `select cast(id as float) as id, prazo, nome, descricao from tbl_promocao where id = ${id}`
    
    
    
    const rsPromocao= await prisma.$queryRawUnsafe(sql);
    
    if (rsPromocao.length > 0)  
    {
        return rsPromocao
    }
    
    else {
        return false; 
    }
    }


module.exports = {
  insertPromocao,
  updatePromocao,
  deletePromocao,
  selectAllPromocoes,
  selectPromocaoById
}