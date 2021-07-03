
const router = require('express').Router()
const user = require('../usecases/user')


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

router.post('/login', (req,res) =>{
    res.send("Inicio de sesión")
})




//Private Routes

/*router.get('/personal_info', (req,res) =>{
    res.send("Información personal")
})

router.get('/user_search', (req,res) =>{
    res.send("Otros usuarios")
}) */

module.exports = router
