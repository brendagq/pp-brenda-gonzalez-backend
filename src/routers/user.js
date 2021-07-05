
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

router.get('/advanced_search', authRoute, async (request,response) =>{
    try {
        
        const users = await user.getUsersFiltered()
        
        response.json({
            status: 200,
            success: true,
            message: 'Lista de usuarios',
            data: {
                users
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

router.get('/search', authRoute, async (request,response) =>{
    try {
        
        const users = await user.getUsersList( request.query.name, request.query.hobbie )
        
        response.json({
            status: 200,
            success: true,
            message: 'Lista de usuarios',
            data: {
                users
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

router.get('/:id', authRoute, async (request,response) =>{
    try {
        const userData = await user.getUserDetail( request.params.id )

        response.json({
            status: 200,
            success: true,
            message: 'Detalle del usuario',
            data: {
                user: userData
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

router.delete('/:id', authRoute, async (request,response) =>{ 
    try {
        const deletedUser = await user.deleteUser( request.params.id )

        response.json({
            status: 200,
            success: true,
            message: 'El usuario fue eliminado con éxito',
            data: {
                user: deletedUser
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

module.exports = router
