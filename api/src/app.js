const express = require("express")
const userRouter = require("./routes/user")
const errorHandler = require("./middlewares/errorHandler.js")
const cors = require("cors")

const app = express()
app.use(cors())
app.use(express.json())
app.use(userRouter)
app.use(errorHandler)

module.exports = app
