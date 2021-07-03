
const jwt = require('../lib/jwt')

function authRoute (request, response, next) {
    try {
        const token  = request.header('token')
        
        if( !token ) {
            return   response.json({
                        status: 401,
                        success: false,
                        message: "Debes de iniciar sesión",
                        data: {
                            error: "Debes de iniciar sesión"
                        }
                    })
        }

        const verified = jwt.verifyToken( token )
        request.user = verified

        next()

    } catch(error) {
        response.json({
            status: 401,
            success: false,
            message: "El token no es valido",
            data: {
                error: "El token no es valido"
            }
        })
    }
}


module.exports = authRoute
