const express = require('express')
const committeeAuth = require('../middlewares/committeeAuth')
const auth = require('../middlewares/auth')
const Announcement = require('../db/announcement')
const { moveToUploads } = require('../utils/helperFunctions')
const router = express.Router()

router.get('/announcement/:id', auth, async (req, res, next) => {
  try {
    const announcement = await Announcement.findById(req.params.id)
    if (!announcement) {
      throw new Error('AnnouncementNotFound')
    }
    res.status(200).send(announcement)
  } catch (e) {
    next(e)
  }
})

router.get('/countAnnouncements/', auth, async (req, res, next) => {
  try {
    res.status(200).send({ count })
  } catch (e) {
    next(e)
  }
})

router.get('/announcement', auth, async (req, res, next) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : 0
  const skip = req.query.skip ? parseInt(req.query.skip) : 0
  try {
    const announcements = await Announcement.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    const count = await Announcement.countDocuments()
    res.status(200).send({
      announcements: announcements.map(({ title, date, description, featured, _id }) => ({
        title,
        date,
        description,
        featured,
        _id,
      })),
      count,
    })
  } catch (e) {
    next(e)
  }
})

router.post('/announcement/', auth, committeeAuth, async (req, res, next) => {
  try {
    if (req.body.featured) {
      req.body.featured = req.body.featured + '.jpeg'
    }
    const announcementInfo = (({
      body: { title, date, deadline, description, link, featured },
    }) => ({
      title,
      date,
      deadline,
      description,
      link,
      featured,
    }))(req)

    const announcement = new Announcement(announcementInfo)
    await announcement.save()
    moveToUploads([], req.body.featured)
    res.status(200).send(announcement)
  } catch (e) {
    next(e)
  }
})

router.post('/announcement/deleteAnnouncements', auth, committeeAuth, async (req, res, next) => {
  try {
    const announcements = req.body
    await Announcement.deleteMany({
      _id: { $in: announcements },
    })
    res.send()
  } catch (e) {
    next(e)
  }
})

module.exports = router
