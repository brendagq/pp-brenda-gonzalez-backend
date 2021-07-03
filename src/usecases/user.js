
const bcrypt = require('../lib/bcrypt')
const jwt = require('../lib/jwt')
const User = require('../models/UserModel')

async function createNewUser({ name, email, telephone, password, age, gender, hobbie }) {
    const hashedPassword = await bcrypt.hashPassword(password)

    return new User({
        name, 
        email, 
        telephone, 
        password : hashedPassword, 
        age, 
        gender, 
        hobbie 
    })
    
}

async function loginUser({ email, password }) {
    const userFound = await User.findOne({ email  })
    if (!userFound) throw new Error('El email ingresado no existe')

    const validPassword = await bcrypt.compare(password, userFound.password)
    if (!validPassword) throw new Error('Contraseña incorrecta')

    return jwt.generateToken({ id: userFound._id })
    
}


module.exports = {
    createNewUser,
    loginUser
}

