const auth = require('../middlewares/auth')
const committeeAuth = require('../middlewares/committeeAuth')
const multer = require('multer')
const Event = require('../db/event')
const express = require('express')
const sharp = require('sharp')
const path = require('path')
const fs = require('fs')
const { moveToUploads } = require('../utils/helperFunctions')

const limiter = require('express-rate-limit')
const tempPath = path.join('uploads', 'temp')

const router = express.Router()

const upload = multer({
  limits: {
    fileSize: 10000000,
  },
})

const viewLimit = limiter({
  windowMs: 60 * 60 * 1000, // 1 hrs in milliseconds
  max: 150,
  message: {
    error: 'Too Many Requests..',
    message: 'You were temporarily suspended from using this feature try after 24 hrs',
  },
  headers: true,
})

const nonmembersLimit = limiter({
  windowMs: 24 * 60 * 60 * 1000, // 24 hrs in milliseconds
  max: 10,
  message: {
    error: 'Too Many Requests..',
    message: 'You were temporarily suspended from using this feature try after 24 hrs',
  },
  headers: true,
})

router.get('/event/:id', viewLimit, async (req, res, next) => {
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

router.get('/countEvents/:type', async (req, res, next) => {
  try {
    const options = {
      ...(req.params.type !== 'all' && { society: req.params.type }),
      ...(req.query.search && { title: { $regex: new RegExp(req.query.search, 'i') } }),
    }
    const count = await Event.countDocuments(options)

    res.status(200).send({ count })
  } catch (e) {
    next(e)
  }
})

router.get('/event/', viewLimit, async (req, res, next) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : 0
  const skip = req.query.skip ? parseInt(req.query.skip) : 0
  const search = req.query.search ? req.query.search : ''
  const notExpired = req.query.notExpired ? true : false
  const match = {}
  req.query.society && req.query.society != 'all' ? (match.society = req.query.society) : null
  if (notExpired) {
    match.startDate = { $gte: new Date().toISOString() }
  }
  if (search !== '') {
    const regex = new RegExp(search, 'i') // i for case insensitive
    match.title = { $regex: regex }
  }

  try {
    const events = await Event.find(match).sort({ createdAt: -1 }).skip(skip).limit(limit)
    res.status(200).send(events)
  } catch (e) {
    next(e)
  }
})

router.post('/event/', auth, committeeAuth, async (req, res, next) => {
  try {
    if (req.body.images) {
      req.body.images = req.body.images.map((img) => img + '.jpeg')
    }
    if (req.body.featured) {
      req.body.featured = req.body.featured + '.jpeg'
    }
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
        images,
        featured,
        allowNonMembers,
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
      images,
      featured,
      allowNonMembers,
    }))(req)

    const event = new Event(eventInfo)

    await event.save()
    if (!req.body.images) {
      req.body.images = []
    }
    moveToUploads(req.body.images, req.body.featured)
    res.status(200).send(event)
  } catch (e) {
    next(e)
  }
})

router.post('/event/update/:id', auth, committeeAuth, async (req, res, next) => {
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
        link,
        allowNonMembers,
        society,
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
      link,
      allowNonMembers,
      society,
    }))(req)

    if (req.body.images) {
      const event = await Event.findById(req.params.id)
      eventInfo.images = event.images.concat(req.body.images.map((img) => img + '.jpeg'))
      req.body.images = eventInfo.images
    } else {
      req.body.images = []
    }
    if (req.body.featured) {
      eventInfo.featured = req.body.featured + '.jpeg'
      req.body.featured = req.body.featured + '.jpeg'
    } else {
      req.body.featured = undefined
    }
    moveToUploads(req.body.images, req.body.featured)

    await Event.findByIdAndUpdate(req.params.id, eventInfo)

    res.status(200).send()
  } catch (e) {
    next(e)
  }
})
router.post('/event/add_nonMembers/:id', nonmembersLimit, async (req, res, next) => {
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
    info.date = Date.now()
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
    event.participants = event.participants.concat({ user: user._id, date: Date.now() })
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

    event.participants = event.participants.filter((v) => v.user != user._id.toString())
    user.eventsParticipatedIn = user.eventsParticipatedIn.filter((id) => id != event._id.toString())

    await user.save()
    await event.save()

    res.status(201).send(event.participants)
  } catch (e) {
    next(e)
  }
})

router.post('/event/deleteEvents', auth, committeeAuth, async (req, res, next) => {
  try {
    const events = req.body
    await Event.deleteMany({
      _id: { $in: events },
    })
    res.send()
  } catch (e) {
    next(e)
  }
})

router.get('/event/data/:id', auth, committeeAuth, async (req, res, next) => {
  try {
    const { participants, nonMembers, availableTickets, title } = await Event.findById(
      req.params.id
    ).populate(['participants.user', 'nonMembers'])
    res.send({ participants, nonMembers, availableTickets, title })
  } catch (e) {
    next(e)
  }
})
router.post(
  '/event/uploadeImages/',
  auth,
  committeeAuth,
  upload.single('upload'),
  async (req, res, next) => {
    try {
      await sharp(req.file.buffer)
        .jpeg()
        .toFile(path.join('uploads', 'temp', req.body.uid + '.jpeg'))
      res.send()
    } catch (e) {
      next(e)
    }
  }
)
router.get('/event/deleteImage/:name', auth, committeeAuth, async (req, res, next) => {
  const name = req.params.name + '.jpeg'
  try {
    fs.unlinkSync(path.join(tempPath, name))
    res.send()
  } catch (e) {
    next(e)
  }
})
router.get('/event/deleteEventFeatured/:id/:name', auth, committeeAuth, async (req, res, next) => {
  const name = req.params.name + '.jpeg'
  try {
    const event = await Event.findById(req.params.id)
    if (!event) {
      throw new Error('EventNotFound')
    }
    event.featured = undefined
    await event.save()
    try {
      fs.unlinkSync(path.join('uploads', name))
    } catch (e) {}
    res.send()
  } catch (e) {
    next(e)
  }
})
router.get('/event/deleteEventImage/:id/:name', auth, committeeAuth, async (req, res, next) => {
  const name = req.params.name + '.jpeg'
  try {
    const event = await Event.findById(req.params.id)
    if (!event) {
      throw new Error('EventNotFound')
    }
    event.images = event.images.filter((i) => i !== name)
    await event.save()
    try {
      fs.unlinkSync(path.join('uploads', name))
    } catch (e) {}
    res.send()
  } catch (e) {
    next(e)
  }
})

router.use('/uploads', express.static('./uploads'))

module.exports = router
