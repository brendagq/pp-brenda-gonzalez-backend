
const router = require('express').Router()
const user = require('../usecases/user')
const authRoute = require('../middlewares/authRoute')


//Public Routes

router.post('/register', async ( request, response ) =>{
    try {
        const newUser = await user.createNewUser(request.body)
        await newUser.save()

        response.json({
            status: 200,
            success: true,
            message: "Usuario registrado exitosamente",
            data:{
                user: newUser
            }

        })     
    } catch (error) {
        response.json({
            status: 400,
            success: false,
            message: 'El registro no pudo completarse',
            data: {
                error: error.message
            }
        })
    }
})

router.post('/login', async ( request,response ) =>{
    try {
        const token = await user.loginUser( request.body )

        response.header('token', token)
        response.json({
            status: 200,
            success: true,
            message: "Inicio de sesión exitoso",
            data:{
                token
            }

        }) 
    } catch (error) {
        response.json({
            status: 400,
            success: false,
            message: error.message,
            data: {
                error: error.message
            }
        })
    }
})



//Private Routes

router.get('/personal_info', authRoute, async (request,response) =>{
    try {
        response.send(request.user)       
    } catch (error) {
        response.json({
            status: 400,
            success: false,
            message: error.message,
            data: {
                error: error.message
            }
        })
    }
})

router.get('/user_search', (req,res) =>{
    res.send("Otros usuarios")
})

module.exports = router
