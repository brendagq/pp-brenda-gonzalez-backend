
const jwt = require('jsonwebtoken')

const {JWT_SECRET_WORD} = process.env

function generateToken ( userId ) {
    return jwt.sign( userId , JWT_SECRET_WORD )
}

function verifyToken ( token ) {
    return jwt.verify( token, JWT_SECRET_WORD )
}


module.exports = {
    generateToken,
    verifyToken
} 
