
const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre es un campo requerido'],
        minlength: 3
    },
    email: {
        type: String,
        required: [true, 'El email es un campo requerido'],
        validate: {
            validator: function(v) {
                return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/.test(v);
            },
            message: props => `${props.value} no es un email valido`
        },
        //unique: true,
    },
    telephone: {
        type: String,
        required: [true, 'El número de telefono es un campo requerido'],
        minlength: [10, 'Agregar un número de 10 dígitos'],
        validate: {
            validator: function(v) {
                return /\d{10}/.test(v);
            },
            message: props => `${props.value} no es un número de telefono valido`
        },
       // unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es un campo requerido']
    },
    age: {
        type: Number,
        required: [true, 'La edad es un campo requerido'],
        min: [13, 'Debes tener al menos 13 años para hacer uso de ésta app']
    },
    gender: {
        type: Number,
        required: [true, 'El genero es un campo requerido'],
          validate: {
            validator: function(v) {
                return /[0-2]/.test(v);
            },
            message: props => `${props.value} no es una opción de genero valida`
        }
    },
    hobbie: {
        type: String,
        required: [true, 'El pasatiempo es un campo requerido']
    },
},
{
    timestamps: true
}
)

module.exports = mongoose.model('User', UserSchema)
