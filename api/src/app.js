const express = require("express");
const userRouter = require("./routes/user");
const errorHandler = require('./middlewares/errorHandler.js');

const app = express();

app.use(express.json());
app.use(userRouter);
app.use(errorHandler)

module.exports = app;
