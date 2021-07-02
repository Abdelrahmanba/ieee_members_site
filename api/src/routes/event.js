const auth = require('../middlewares/auth')
const adminAuth = require('../middlewares/adminAuth')
const committeeAuth = require('../middlewares/committeeAuth')

const Event = require('../db/event')

const express = require('express')

const router = express.Router()

router.get('/event/:id', async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id).populate('orginizers')
    if (!event) {
      throw new Error('EventNotFound')
    }
    res.status(200).send(event)
  } catch (e) {
    next(e)
  }
})

router.get('/event/', async (req, res, next) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : 0
  const skip = req.query.skip ? parseInt(req.query.skip) : 0
  const notExpired = req.query.notExpired ? true : false
  const match = {}
  if (notExpired) {
    match.startDate = { $gte: new Date().toISOString() }
  } else {
    delete match.startDate
  }

  try {
    const events = await Event.find(match).sort({ createdAt: -1 }).limit(limit).skip(skip)
    res.status(200).send(events)
  } catch (e) {
    next(e)
  }
})

router.post('/event/', auth, committeeAuth, async (req, res, next) => {
  try {
    const eventInfo = (({
      body: {
        title,
        duration,
        startDate,
        endDate,
        availableTickets,
        location,
        price,
        description,
        society,
        link,
        orginizers,
      },
    }) => ({
      title,
      duration,
      startDate,
      endDate,
      availableTickets,
      location,
      price,
      description,
      society,
      link,
      orginizers,
    }))(req)

    const event = new Event(eventInfo)
    await event.save()
    res.status(200).send(event)
  } catch (e) {
    console.log(e)
    next(e)
  }
})
router.post('/event/add_nonMembers/:id', async (req, res, next) => {
  try {
    const info = (({ body: { name, phone, year, email } }) => ({
      name,
      phone,
      year,
      email,
    }))(req)

    if (!info.name || !info.phone || !info.year || !info.email) {
      throw new Error('EmptyFields')
    }
    const event = await Event.findById(req.params.id)
    if (!event) {
      throw new Error('EventNotFound')
    }
    event.nonMembers = event.nonMembers.concat(info)
    await event.save()
    res.status(200).send({ title: 'Thank You', message: 'Your request has been registered.' })
  } catch (e) {
    next(e)
  }
})

router.get('/event/add_participants/:eventId/', auth, async (req, res, next) => {
  try {
    const user = req.user
    const event = await Event.findById(req.params.eventId)
    if (!event) {
      throw new Error('EventNotFound')
    }
    event.participants = event.participants.concat(user._id)
    user.eventsParticipatedIn = user.eventsParticipatedIn.concat(event._id)
    await user.save()
    await event.save()
    res.status(201).send(event.participants)
  } catch (e) {
    next(e)
  }
})

router.get('/event/remove_participants/:eventId/', auth, async (req, res, next) => {
  try {
    const user = req.user
    const event = await Event.findById(req.params.eventId)
    if (!event) {
      throw new Error('EventNotFound')
    }

    event.participants = event.participants.filter((id) => id != user._id.toString())
    user.eventsParticipatedIn = user.eventsParticipatedIn.filter((id) => id != event._id.toString())

    await user.save()
    await event.save()

    res.status(201).send(event.participants)
  } catch (e) {
    next(e)
  }
})

module.exports = router
