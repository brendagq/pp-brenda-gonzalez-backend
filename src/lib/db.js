
const mongoose = require('mongoose')
require('dotenv').config()

const {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_NAME
} = process.env

const URL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`

module.exports = () => mongoose.connect(
    URL,
    {    
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false 
    },
    () => console.log("Connected to DB")
)
