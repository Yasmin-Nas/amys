const {MESSAGE_ERROR, MESSAGE_SUCESS} = require('../../modulo/config')

const insertProduto = async function(produto) { 
try {
    const {PrismaClient} = require('@prisma/client')
    const prisma = new PrismaClient()
    let sql = `insert into tbl_produto(nome, preco)
    values ('${produto.nome}', '${produto.preco}')`
    
     

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
    
const selectProdutoById = async function (id)
    {
    // Import da classe prismaClient, que é responsável pelas interações com o Banco de dados
    const { PrismaClient } = require('@prisma/client');
    
    // Instancia da classe PrismaClient
    const prisma = new PrismaClient(); 
    
    // rs: Nomenclatura que a gente da para quando vamos rodar um select no banco - RecortSet
    // ou seja, criamos um objeto do tipo RS para receber os dados do BD através do script SQL.
    // queryRaw ta dentro da clase do prisma client, então permite que a gente execute algo no BD.
    
    let sql = `select cast(id as float) as id, nome, preco from tbl_produto where id = ${id}`
    
    
    
    const rsProduto = await prisma.$queryRawUnsafe(sql);
    
    if (rsProduto.length > 0)  
    {
        return rsProduto
    }
    
    else {
        return false; 
    }
    }

const selectAllProdutos = async function() { 
        // Import da classe prismaClient, que é responsável pelas interações com o Banco de dados
        const { PrismaClient } = require('@prisma/client');
        
        // Instancia da classe PrismaClient
        const prisma = new PrismaClient(); 
        
        // rs: Nomenclatura que a gente da para quando vamos rodar um select no banco - RecortSet
        // ou seja, criamos um objeto do tipo RS para receber os dados do BD através do script SQL.
        // queryRaw ta dentro da clase do prisma client, então permite que a gente execute algo no BD.
        const rsProdutos = await prisma.$queryRawUnsafe `select cast(id as float) as id, nome, preco from tbl_produto order by id desc`;
        
        
        
        if (rsProdutos.length > 0)  
        {
            return rsProdutos
        }
        
        else {
            return false; 
        }
        
    }


const updateProduto = async function (ingrediente)
    {
        try {
            // Import da classe prismaClient, que é responsável pelas interações com o Banco de dados
       const { PrismaClient } = require('@prisma/client');
    
       // Instancia da classe PrismaClient
       const prisma = new PrismaClient(); 
    
       let sql = `update tbl_produto set 
        nome                     = '${produto.nome}', 
        preco           = '${produto.nome}'
        where id = '${preco.id}'
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

const deleteProduto = async function(id) {
        try {
            // Import da classe prismaClient, que é responsável pelas interações com o Banco de dados
       const { PrismaClient } = require('@prisma/client');
    
       // Instancia da classe PrismaClient
       const prisma = new PrismaClient(); 
    
       let sql = `delete from tbl_produto where id = '${id}'`;
    
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


module.exports = {
   insertProduto,
   selectProdutoById,
   selectAllProdutos,
   updateProduto,
   deleteProduto
}