
const bcrypt = require('../lib/bcrypt')
const jwt = require('../lib/jwt')
const User = require('../models/UserModel')
const moment = require('moment')

async function createNewUser({ name, email, telephone, password, age, gender, hobbie }) {

    const userFound = await User.findOne({ email })
    if ( userFound ) throw new Error('El email ingresado ya se encuentra registrado')

    const hashedPassword = await bcrypt.hashPassword( password )

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

    const userFound = await User.findOne({ email })
    if ( !userFound ) throw new Error('El email ingresado no existe')

    const validPassword = await bcrypt.compare( password, userFound.password )
    if ( !validPassword ) throw new Error('Contraseña incorrecta')

    return  jwt.generateToken({ id: userFound._id })

}

async function getUsersList( name, hobbie ) {

    const regExName = name ?  new RegExp( name, 'i' ) : /./gi
    const regExHobbie = hobbie ? new RegExp( hobbie, 'i' ) : /./gi

    const users = await User.find({ name:{ "$regex": regExName }, hobbie:{ "$regex": regExHobbie } }, { password:0 })
   
    return users
}

async function getUserDetail( id ) {

    const userFound = await User.findOne({ _id: id }, { password: 0 })
    if( !userFound ) throw new Error('El usuario no fue encontrado')

    return  userFound

}

async function getUsersFiltered( ) {

    const lastThreeDays = new Date( moment().subtract(3, 'days') )
    
    const users = await User.aggregate([
       { 
            $match:{
                age:{ $gt:18 }, 
                gender:1 ,
                createdAt:{
                    $gte: lastThreeDays,
                }
            }

        },
        {
            $group:{
                _id:"$hobbie",
                users:{
                    $push:{   
                        name : "$name", 
                        telephone: "$telephone", 
                        hobbie: "$hobbie" 
                    }
                }
            }
        }
        
    ])
   
    return users
}

async function deleteUser( id ) {

    const deletedUser = await User.findOneAndDelete({ _id: id }, { password: 0 })
    if( !deletedUser ) throw new Error('El usuario no fue encontrado')

    return  {
        name: deletedUser.name,
        email: deletedUser.email
    }

}



module.exports = {
    createNewUser,
    loginUser,
    getUsersList,
    getUserDetail,
    getUsersFiltered,
    deleteUser
}
