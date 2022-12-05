const {MESSAGE_ERROR, MESSAGE_SUCESS} = require('../../modulo/config')

const selectAllIngredientes = async function() { 
// Import da classe prismaClient, que é responsável pelas interações com o Banco de dados
const { PrismaClient } = require('@prisma/client');

// Instancia da classe PrismaClient
const prisma = new PrismaClient(); 

// rs: Nomenclatura que a gente da para quando vamos rodar um select no banco - RecortSet
// ou seja, criamos um objeto do tipo RS para receber os dados do BD através do script SQL.
// queryRaw ta dentro da clase do prisma client, então permite que a gente execute algo no BD.
const rsIngredientes = await prisma.$queryRawUnsafe `select cast(id as float) as id, nome, acompanhamentos from tbl_ingrediente order by id desc`;



if (rsIngredientes.length > 0)  
{
    return rsIngredientes
}

else {
    return false; 
}

}

const insertIngrediente = async function (ingrediente) {

    try {
    const {PrismaClient} = require('@prisma/client')
    const prisma = new PrismaClient()
    let sql = `insert into tbl_ingrediente(nome, acompanhamentos)
    values ('${ingrediente.nome}', '${ingrediente.acompanhamentos}')`
    
     

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

const updateIngrediente = async function (ingrediente)
    {
        try {
            // Import da classe prismaClient, que é responsável pelas interações com o Banco de dados
       const { PrismaClient } = require('@prisma/client');
    
       // Instancia da classe PrismaClient
       const prisma = new PrismaClient(); 
    
       let sql = `update tbl_ingrediente set 
        nome                     = '${ingrediente.nome}', 
        acompanhamentos           = '${ingrediente.acompanhamentos}'
        where id = '${ingrediente.id}'
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

const deleteIngrediente = async function(id) {
        try {
            // Import da classe prismaClient, que é responsável pelas interações com o Banco de dados
       const { PrismaClient } = require('@prisma/client');
    
       // Instancia da classe PrismaClient
       const prisma = new PrismaClient(); 
    
       let sql = `delete from tbl_ingrediente where id = '${id}'`;
    
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

const selectIngredienteById = async function (id)
    {
    // Import da classe prismaClient, que é responsável pelas interações com o Banco de dados
    const { PrismaClient } = require('@prisma/client');
    
    // Instancia da classe PrismaClient
    const prisma = new PrismaClient(); 
    
    // rs: Nomenclatura que a gente da para quando vamos rodar um select no banco - RecortSet
    // ou seja, criamos um objeto do tipo RS para receber os dados do BD através do script SQL.
    // queryRaw ta dentro da clase do prisma client, então permite que a gente execute algo no BD.
    
    let sql = `select cast(id as float) as id, nome, acompanhamentos from tbl_ingrediente where id = ${id}`
    
    
    
    const rsIngrediente = await prisma.$queryRawUnsafe(sql);
    
    if (rsIngrediente.length > 0)  
    {
        return rsIngrediente
    }
    
    else {
        return false; 
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
    insertIngrediente,
    updateIngrediente,
    selectAllIngredientes,
    deleteIngrediente,
    selectIngredienteById,
  
}