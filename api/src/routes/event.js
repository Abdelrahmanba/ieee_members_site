const auth = require('../middlewares/auth')
const adminAuth = require('../middlewares/adminAuth')
const committeeAuth = require('../middlewares/committeeAuth')

const Event = require('../db/event')

const express = require('express')

const router = express.Router()

router.get('/event/:id', async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id)
    if (!event) {
      throw new Error('EventNotFound')
    }
    res.status(200).send(event)
  } catch (e) {
    next(e)
  }
})

router.post('/event/', auth, committeeAuth, async (req, res, next) => {
  try {
    const eventInfo = (({ body: { title, duration, startDate, endDate, availableTickets } }) => ({
      title,
      duration,
      startDate,
      endDate,
      availableTickets,
    }))(req)

    const event = new Event(eventInfo)
    await event.save()
    res.status(200).send(event)
  } catch (e) {
    next(e)
  }
})

module.exports = router
