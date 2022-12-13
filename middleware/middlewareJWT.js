const jwt = require('jsonwebtoken')
const SECRET = '7654Amy!'
const EXPIRES = 60

const createJWT = async function (payLoad){
   
    const token = jwt.sign({userID: payLoad}, SECRET, {expiresIn: EXPIRES})
    return token

}
const validateJWT = async function (token){
   let status 

    jwt.verify(token, SECRET, async function (err, decode){

        if (!err)
         status = false
    else 
         status = true
         
        })
        return status
}



module.exports = {
   createJWT,
   validateJWT
}