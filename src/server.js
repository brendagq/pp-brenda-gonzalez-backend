
const express = require('express')
const cors = require('cors')

const userRoute = require('./routers/user')

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/user', userRoute)

module.exports = app
