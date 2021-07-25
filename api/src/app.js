const express = require('express')
const userRouter = require('./routes/user')
const eventRouter = require('./routes/event')
const errorHandler = require('./middlewares/errorHandler.js')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())
app.use(userRouter)
app.use(eventRouter)
app.use(errorHandler)

module.exports = app
