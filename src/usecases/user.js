
const bcrypt = require('../lib/bcrypt')
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

module.exports = {
    createNewUser
}
