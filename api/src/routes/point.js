const express = require('express')
const committeeAuth = require('../middlewares/committeeAuth')
const auth = require('../middlewares/auth')
const Point = require('../db/point')
const router = express.Router()

router.get('/points/committee', auth, committeeAuth, async (req, res, next) => {
  try {
    const pointsList = await Point.find({ type: 'committee' })
    if (!pointsList) {
      throw new Error('AnnouncementNotFound')
    }
    res.status(200).send(pointsList)
  } catch (e) {
    next(e)
  }
})

router.get('/points/members', auth, async (req, res, next) => {
  try {
    const pointsList = await Point.find({ type: 'members' })
    if (!pointsList) {
      throw new Error('AnnouncementNotFound')
    }
    res.status(200).send(pointsList)
  } catch (e) {
    next(e)
  }
})

router.post('/points/', auth, committeeAuth, async (req, res, next) => {
  try {
    const pointsInfo = (({ body: { title, type, amount } }) => ({
      title,
      type,
      amount,
    }))(req)

    const point = new Point(pointsInfo)
    await point.save()
    res.send()
  } catch (e) {
    next(e)
  }
})

router.get('/points/delete', auth, committeeAuth, async (req, res, next) => {
  try {
    const id = req.query.id
    await Point.findByIdAndDelete(id)
    res.send()
  } catch (e) {
    next(e)
  }
})

module.exports = router
