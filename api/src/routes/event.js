const auth = require('../middlewares/auth')
const adminAuth = require('../middlewares/adminAuth')
const committeeAuth = require('../middlewares/committeeAuth')
const multer = require('multer')
const Event = require('../db/event')
const express = require('express')
const sharp = require('sharp')
const path = require('path')
const fs = require('fs')
var mongoXlsx = require('mongo-xlsx')

const tempPath = path.join('uploads', 'temp')

const router = express.Router()

const uploadImgs = multer({
  limits: {
    fileSize: 10000000,
  },
})

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

    fs.readdir(tempPath, (err, files) => {
      files.forEach(async (file) => {
        const currentPath = path.join('uploads', 'temp', file)
        const destinationPath = path.join('uploads', file)
        if (req.body.images.includes(file) || file === req.body.featured) {
          fs.rename(currentPath, destinationPath, function (err) {
            if (err) {
              throw err
            }
          })
        }
      })
    })

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

router.post(
  '/event/uploadeImages',
  auth,
  committeeAuth,
  uploadImgs.single('upload'),
  async (req, res, next) => {
    try {
      await sharp(req.file.buffer)
        .jpeg()
        .toFile(path.join('uploads', 'temp', req.body.uid + '.jpeg'))
      res.send()
    } catch (e) {
      console.log(e)
      next(e)
    }
  }
)
router.get(
  '/event/deleteImage/:name',
  auth,
  committeeAuth,
  uploadImgs.single('upload'),
  async (req, res, next) => {
    try {
      const name = req.params.name + '.jpeg'
      fs.unlinkSync(path.join(tempPath, name))
      res.send()
    } catch (e) {
      next(e)
    }
  }
)

router.use('/uploads', express.static('./uploads'))

router.get('/event/xlsx/:id', auth, committeeAuth, adminAuth, async (req, res, next) => {
  try {
    const { id } = req.params
    const event = await Event.findById(id).populate('participants')
    if (!event) {
      throw new Error('EventNotFound')
    }

    const model = [
      { displayName: 'firstName', access: 'firstName', type: 'string' },
      { displayName: 'lastName', access: 'lastName', type: 'string' },
      { displayName: 'phoneNo', access: 'phoneNo', type: 'string' },
    ]
    console.log(event.participants)
    mongoXlsx.mongoData2Xlsx(event.participants, model, function (err, data) {})
    res.send()
  } catch (e) {
    console.log(e)
    next(e)
  }
})

module.exports = router
