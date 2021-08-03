const express = require('express')
const committeeAuth = require('../middlewares/committeeAuth')
const auth = require('../middlewares/auth')
const osu = require('os-utils')
const os = require('os')
const disk = require('diskusage')

const router = express.Router()

router.get('/systemInfo/', auth, committeeAuth, async (req, res, next) => {
  try {
    const path = os.platform() === 'win32' ? 'c:' : '/'
    const data = {}
    data.disk = await disk.check(path)
    data.cores = osu.cpuCount()
    data.platform = os.platform()
    data.freeMem = osu.freemem()
    data.totalmem = osu.totalmem()
    data.cpuModel = os.cpus()[0].model
    osu.cpuUsage((v) => {
      data.cpuUsage = v
      res.send(data)
    })
  } catch (e) {
    next(e)
  }
})

module.exports = router
