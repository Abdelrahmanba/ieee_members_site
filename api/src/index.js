const app = require('./app')

const PORT = process.env.PORT

app.listen(PORT, ()=> console.log(`server is up and running at port ${PORT}`))


