const {MESSAGE_ERROR, MESSAGE_SUCESS} = require('../../modulo/config')

const selectAllTipoPizza = async function() { 
    // Import da classe prismaClient, que é responsável pelas interações com o Banco de dados
    const { PrismaClient } = require('@prisma/client');
    
    // Instancia da classe PrismaClient
    const prisma = new PrismaClient(); 
    
    // rs: Nomenclatura que a gente da para quando vamos rodar um select no banco - RecortSet
    // ou seja, criamos um objeto do tipo RS para receber os dados do BD através do script SQL.
    // queryRaw ta dentro da clase do prisma client, então permite que a gente execute algo no BD.
    const rsTipoPizza = await prisma.$queryRawUnsafe `select cast(id as float) as id, tipo from tbl_tipo_pizza order by id desc`;
    
    
    
    if (rsTipoPizza.length > 0)  
    {
        return rsTipoPizza
    }
    
    else {
        return false; 
    }
    
    }

const selectAllTipoBebida = async function() { 
        // Import da classe prismaClient, que é responsável pelas interações com o Banco de dados
        const { PrismaClient } = require('@prisma/client');
        
        // Instancia da classe PrismaClient
        const prisma = new PrismaClient(); 
        
        // rs: Nomenclatura que a gente da para quando vamos rodar um select no banco - RecortSet
        // ou seja, criamos um objeto do tipo RS para receber os dados do BD através do script SQL.
        // queryRaw ta dentro da clase do prisma client, então permite que a gente execute algo no BD.
        const rsTipoBebida = await prisma.$queryRawUnsafe `select cast(id as float) as id, tipo from tbl_tipo_bebida order by id desc`;
        
        
        
        if (rsTipoBebida.length > 0)  
        {
            return rsTipoBebida
        }
        
        else {
            return false; 
        }
        
     }

const insertTipoPizza = async function (tipo) {

        try {
        const {PrismaClient} = require('@prisma/client')
        const prisma = new PrismaClient()
        let sql = `insert into tbl_tipo_pizza(tipo)
        values ( '${tipo.tipo}')`
        
         
    
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

const insertTipoBebida = async function (tipo) {

            try {
            const {PrismaClient} = require('@prisma/client')
            const prisma = new PrismaClient()
            let sql = `insert into tbl_tipo_bebida(tipo)
            values ( '${tipo.tipo}')`
            
             
        
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

const selectTipoPizzaById = async function (id)
    {
    // Import da classe prismaClient, que é responsável pelas interações com o Banco de dados
    const { PrismaClient } = require('@prisma/client');
    
    // Instancia da classe PrismaClient
    const prisma = new PrismaClient(); 
    
    // rs: Nomenclatura que a gente da para quando vamos rodar um select no banco - RecortSet
    // ou seja, criamos um objeto do tipo RS para receber os dados do BD através do script SQL.
    // queryRaw ta dentro da clase do prisma client, então permite que a gente execute algo no BD.
    
    let sql = `select cast(id as float) as id, tipo from tbl_tipo_pizza where id = ${id}`
    
    
    
    const rsTipoPizza = await prisma.$queryRawUnsafe(sql);
    
    if (rsTipoPizza.length > 0)  
    {
        return rsTipoPizza
    }
    
    else {
        return false; 
    }
    }
    
const selectTipoBebidaById = async function (id)
    {
    // Import da classe prismaClient, que é responsável pelas interações com o Banco de dados
    const { PrismaClient } = require('@prisma/client');
    
    // Instancia da classe PrismaClient
    const prisma = new PrismaClient(); 
    
    // rs: Nomenclatura que a gente da para quando vamos rodar um select no banco - RecortSet
    // ou seja, criamos um objeto do tipo RS para receber os dados do BD através do script SQL.
    // queryRaw ta dentro da clase do prisma client, então permite que a gente execute algo no BD.
    
    let sql = `select cast(id as float) as id, tipo from tbl_tipo_bebida where id = ${id}`
    
    
    
    const rsTipoBebida = await prisma.$queryRawUnsafe(sql);
    
    if (rsTipoBebida.length > 0)  
    {
        return rsTipoBebida
    }
    
    else {
        return false; 
    }
    }

module.exports =
{
    selectAllTipoBebida,
    selectAllTipoPizza,
    insertTipoBebida,
    insertTipoPizza,
    selectTipoBebidaById,
    selectTipoPizzaById
}