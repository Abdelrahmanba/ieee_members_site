const app = require('./app')
var cron = require('node-schedule')
const empty = require('empty-folder')

require('./db/connection/connection')

cron.scheduleJob('* * 0 * * *', function () {
  empty('./uploads/temp', false, () => {})
})

const PORT = process.env.PORT

app.listen(PORT, () => console.log(`server is up and running at port ${PORT}`))
