const {MESSAGE_ERROR, MESSAGE_SUCESS} = require('../../modulo/config')

const insertProduto = async function(produto) { 
try {
    const {PrismaClient} = require('@prisma/client')
    const prisma = new PrismaClient()
    let sql = `insert into tbl_produto(nome, acompanhamentos)
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
    
    let sql = `select cast(id as float) as id, nome, preco, foto from tbl_produto where id = ${id}`
    
    
    
    const rsProduto = await prisma.$queryRawUnsafe(sql);
    
    if (rsProduto.length > 0)  
    {
        return rsProduto
    }
    
    else {
        return false; 
    }
    }


module.exports = {
   insertProduto,
   selectProdutoById
}