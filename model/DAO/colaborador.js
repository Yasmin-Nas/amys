const {MESSAGE_ERROR, MESSAGE_SUCESS} = require('../../modulo/config')

const insertUser = async (colaborador) => {

    try{

        const {PrismaClient} = require('@prisma/client')
        const prisma = new PrismaClient()

    let sql = `insert into tbl_colaborador(senha,login,nome)
	values (
    MD5('${colaborador.senha}'),MD5('${colaborador.login}'),MD5('${colaborador.nome}')
    ); `;

    console.log(sql);

    const result = await prisma.$queryRawUnsafe(sql);

    if (result) {
        return result
    }else
        return false


}catch (error) {
    // return false
    console.log(error)
    }
}

const selectAllColaborador= async (dados) => {

    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient(); 


    try{
        let sql = `select tbl_colaborador.senha, tbl_colaborador.login, tbl_colaborador.nome
        from tbl_colaborador where senha_colaborador = MD5('${colaborador.senha}') and login = MD5('${colaborador.login}') and nome  = MD5('${colaborador.nome}' `;
    

    const result = await prisma.$queryRawUnsafe(sql)

    if(result){
        return result
    } else {
        return falsee
    }
}
    catch(error){
        return false
    }


    
   
    
    
    
    if (rsCola.length > 0)  
    {
        return rsCola
    }
    
    else {
        return false; 
    }
    
    }


const deleteUser = async (id) => {
    try {

    let sql = `delete from tbl_colaborador where id = '${id}'`;

    const result = await prisma.$executeRawUnsafe (sql);
    
    if (result) {
        return true;
    }else
        return false;
                                
    } catch (error) {
        return false;
    }                         
}

const selectUserById = async function (id) {


   const sql = `select * from tbl_colaborador where id = '${id}'`;


const rsUser = await prisma.$queryRawUnsafe(sql)

if (rsUser)
return rsUser;
else 
return false;
}

module.exports = {
    selectAllColaborador,
    insertUser,
    selectUserById,
    deleteUser
}
