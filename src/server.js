
const express = require('express')
const cors = require('cors')

const userRoute = require('./routes/user')

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/user', userRoute)

module.exports = app
