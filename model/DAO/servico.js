const {MESSAGE_ERROR, MESSAGE_SUCESS} = require('../../modulo/config')

const selectAllTipoServico = async function() { 
    // Import da classe prismaClient, que é responsável pelas interações com o Banco de dados
    const { PrismaClient } = require('@prisma/client');
    
    // Instancia da classe PrismaClient
    const prisma = new PrismaClient(); 
    
    // rs: Nomenclatura que a gente da para quando vamos rodar um select no banco - RecortSet
    // ou seja, criamos um objeto do tipo RS para receber os dados do BD através do script SQL.
    // queryRaw ta dentro da clase do prisma client, então permite que a gente execute algo no BD.
    const rsTipoServico = await prisma.$queryRawUnsafe `select cast(id as float) as id, tipo_servico from tbl_servico order by id desc`;
    
    
    
    if (rsTipoServico.length > 0)  
    {
        return rsTipoServico
    }
    
    else {
        return false; 
    }
    
 }

 const insertTipoServico= async function(servico) {
    try {
        const {PrismaClient} = require('@prisma/client')
        const prisma = new PrismaClient()
        let sql = `insert into tbl_servico(tipo_servico)
        values ( '${servico.tipo_servico}')`
        
         
    
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

 module.exports = {
    selectAllTipoServico,
    insertTipoServico

 }