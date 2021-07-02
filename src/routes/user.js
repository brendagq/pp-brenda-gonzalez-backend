
const router = require('express').Router()
const User = require('../models/User')

router.post('/register', async (req,res) =>{
    const user = new User({
        name: req.body.name,
        email: req.body.email ,
        telephone: req.body.telephone,
        password: req.body.password ,
        age: req.body.age,
        gender: req.body.gender,
        hobbie: req.body.hobbie
    })
    try{
        const savedUser = await user.save()
        res.send(savedUser)

    }catch(error){
        res.status(400).send(error)
    }
})

router.post('/login', (req,res) =>{
    res.send("Inicio de sesión")
})

router.get('/personal_info', (req,res) =>{
    res.send("Información personal")
})

router.get('/user_search', (req,res) =>{
    res.send("Otros usuarios")
})

module.exports = router
