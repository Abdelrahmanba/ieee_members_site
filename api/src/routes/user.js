const express = require('express')
const User = require('../db/user')
const limiter = require('express-rate-limit')
const validator = require('validator')
const bcrypt = require('bcrypt')
const auth = require('../middlewares/auth')
const committeeAuth = require('../middlewares/committeeAuth')
const adminAuth = require('../middlewares/adminAuth')

const createLimit = limiter({
  windowMs: 24 * 60 * 60 * 1000, // 24 hrs in milliseconds
  max: 10,
  message: {
    error: 'Too Many Requests..',
    message: 'You were temporarily suspended from using this feature try after 24 hrs',
  },
  headers: true,
})

const resendLimit = limiter({
  windowMs: 6 * 60 * 60 * 1000, // 6 hrs in milliseconds
  max: 5,
  message: {
    error: 'Too Many Requests..',
    message: 'You were temporarily suspended from using this feature try after 6 hrs',
  },
  headers: true,
})

const router = express.Router()

//create Account
router.post('/users', createLimit, async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body
  const user = new User({ firstName, lastName, email, password })
  try {
    await user.save()
    const token = await user.generateAuthToken()
    await user.sendVerifcationEmail()
    res.status(201).send({ user, token })
  } catch (e) {
    next(e)
  }
})

//get user's events in which he particpated
router.get('/users/eventsParticipated/:id?', auth, async (req, res, next) => {
  try {
    if (req.params.id) {
      const user = await User.findById(req.params.id).populate('eventsParticipatedIn', [
        'society',
        'title',
        'description',
      ])
      if (!user) {
        res.status(404).send()
      }
      const events = user.eventsParticipatedIn
      res.status(200).send(events)
    } else {
      const user = req.user
      await user
        .populate('eventsParticipatedIn', ['society', 'title', 'description'])
        .execPopulate()
      const events = user.eventsParticipatedIn
      res.status(200).send(events)
    }
  } catch (e) {
    next(e)
  }
})

//get user's points history
router.get('/users/pointsHistory/:id?', auth, async (req, res, next) => {
  try {
    if (req.params.id) {
      const user = await User.findById(req.params.id)
      if (!user) {
        throw new Error('UserNotFound')
      }
      res.status(200).send(user.pointsHistory.filter((i) => i.committee === false))
    } else {
      res.status(200).send(req.user.pointsHistory)
    }
  } catch (e) {
    next(e)
  }
})
//upload user avater
router.post('/users/uploadAvatar', auth, async (req, res, next) => {
  try {
    const bindata = new Buffer(req.body.image.split(',')[1], 'base64')
    req.user.imageData = bindata
    await req.user.save()
    res.status(200).send()
  } catch (e) {
    next(e)
  }
})

//reset password
router.get('/users/reset_password/:email', resendLimit, async (req, res, next) => {
  const email = req.params.email
  try {
    const user = await User.findOne({ email: email })
    if (!user) {
      throw new Error('UserNotFound')
    }
    await user.sendRestPassword()
    res.status(200).send({ email })
  } catch (e) {
    next(e)
  }
})

//login
router.post('/users/login', async (req, res, next) => {
  try {
    if (req.body.email) {
      if (!validator.isEmail(req.body.email)) {
        throw new Error('BadEmailFormat')
      }
    } else {
      throw new Error('BadRequest')
    }
    const user = await User.findByEmailAndPassword(req.body)
    const token = await user.generateAuthToken()
    res.status(202).send({ user, token })
  } catch (e) {
    next(e)
  }
})

router.post('/users/update', auth, async (req, res, next) => {
  try {
    if (req.body.firstName) {
      req.user.firstName = req.body.firstName
    }
    if (req.body.lastName) {
      req.user.lastName = req.body.lastName
    }
    if (req.body.bday) {
      req.user.bday = req.body.bday
    }
    if (req.body.gender) {
      req.user.gender = req.body.gender
    }
    if (req.body.phoneNo) {
      req.user.phoneNo = req.body.phoneNo
    }
    if (req.body.email) {
      if (validator.isEmail(req.body.email)) {
        req.user.email = req.body.email
      } else {
        throw new Error('BadEmailFormat')
      }
    }
    if (req.body.password) {
      const isMatch = await bcrypt.compare(req.body.currentPassword, req.user.password)
      if (!isMatch) {
        throw new Error('BadCredentials')
      } else {
        req.user.password = req.body.password
      }
    }
    const user = await req.user.save()
    res.status(200).send(user)
  } catch (e) {
    next(e)
  }
})

//send verifection email
router.get('/users/resend_verification/:userId', resendLimit, async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId)
    if (!user) {
      throw new Error('UserNotFound')
    }
    await user.sendVerifcationEmail()
    res.status(200).send({ message: `Email was sent to ${user.email}` })
  } catch (e) {
    next(e)
  }
})

//perosnal info
router.get('/user/me', auth, async (req, res, next) => {
  try {
    const user = req.user.toObject()
    delete user.token
    delete user.eventsParticipatedIn
    delete user.eventsVolunteeredIn
    delete user.password
    delete user.secretCode
    delete user.passwordReset
    res.status(200).send(user)
  } catch (e) {
    next(e)
  }
})
router.get('/user/:id', async (req, res, next) => {
  try {
    const userData = await User.findById(req.params.id)
    if (!userData) {
      throw new Error('UserNotFound')
    }
    const user = userData.toObject()
    delete user.token
    delete user.pointsHistory
    delete user.eventsParticipatedIn
    delete user.eventsVolunteeredIn
    delete user.password
    delete user.secretCode
    delete user.activeCommttiee
    delete user.activeEmail
    delete user.passwordReset

    res.status(200).send(user)
  } catch (e) {
    next(e)
  }
})
router.get('/users/all/points', auth, committeeAuth, async (req, res, next) => {
  try {
    const users = await User.find({})
    const usersData = users.map((user) => ({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      membershipID: user.membershipID,
      points: user.points,
      pointsHistory: user.pointsHistory,
    }))
    res.status(200).send(usersData)
  } catch (e) {
    next(e)
  }
})
router.get('/users/all/', auth, committeeAuth, adminAuth, async (req, res, next) => {
  try {
    const users = await User.find({})
    const usersData = users.map((user) => ({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      membershipID: user.membershipID,
      position: user.position,
      points: user.points,
      activeEmail: user.activeEmail,
      activeCommttiee: user.activeCommttiee,
      role: user.role,
    }))
    res.status(200).send(usersData)
  } catch (e) {
    next(e)
  }
})
router.get('/users/all/members', auth, async (req, res, next) => {
  try {
    const users = await User.find({
      activeEmail: true,
      activeCommttiee: true,
    })
    const usersData = users.map((user) => ({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      position: user.position,
      points: user.points,
      imageData: user.imageData ? Buffer.from(user.imageData).toString('base64') : undefined,
    }))
    res.status(200).send(usersData)
  } catch (e) {
    next(e)
  }
})
router.get('/users/top3', async (req, res, next) => {
  try {
    const users = await User.find({}).sort({ points: -1 }).limit(3)
    const usersData = users.map((user) => ({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      position: user.position,
      points: user.points,
      imageData: user.imageData ? Buffer.from(user.imageData).toString('base64') : undefined,
    }))
    res.status(200).send(usersData)
  } catch (e) {
    next(e)
  }
})
//link to verify account
router.get('/api/verify-account/:userId/:secretCode', async (req, res, next) => {
  const { userId, secretCode } = req.params

  try {
    const user = await User.findById(userId)
    if (!user) {
      throw new Error('UserNotFound')
    }
    if (secretCode == user.secretCode) {
      if (user.activeEmail == true) {
        res.status(400).send({ message: 'Invalid Link' })
      }
      user.activeEmail = true
      await user.save()
      res.status(202).send({ message: 'Your Email Was Successfully Verified.' })
    }
    res.status(400).send({ message: 'Invalid link' })
  } catch (e) {
    next(e)
  }
})

router.post('/api/reset-password/:userId/:secretCode', async (req, res, next) => {
  const { userId, secretCode } = req.params

  try {
    const user = await User.findById(userId)
    if (!user) {
      throw new Error('UserNotFound')
    }
    if (secretCode == user.passwordReset) {
      user.password = req.body.password
      await user.save()
      res.status(200).send({ user, token: user.token })
    }
    res.status(400).send({ message: 'Invalid Link' })
  } catch (e) {
    next(e)
  }
})

router.get('/users/count', auth, committeeAuth, async (req, res, next) => {
  try {
    const countActive = await User.countDocuments({ activeCommttiee: true, activeEmail: true })
    const countAll = await User.countDocuments({})
    const countWaiting = await User.countDocuments({ activeEmail: true, activeCommttiee: false })

    res.status(200).send({ countAll, countActive, countWaiting })
  } catch (e) {
    next(e)
  }
})
//for waiting table
router.get('/users/committeeAuth', auth, committeeAuth, async (req, res, next) => {
  try {
    const users = await User.find({ activeEmail: true, activeCommttiee: false })
    res.status(200).send(users)
  } catch (e) {
    next(e)
  }
})

//to add new member from the waiting table
router.get(
  '/users/committeeAuth/:id/:memID',
  auth,
  committeeAuth,
  adminAuth,
  async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id)
      if (!user) {
        throw new Error('UserNotFound')
      }
      user.activeCommttiee = true
      user.membershipID = req.params.memID
      await user.save()
      res.status(200).send()
    } catch (e) {
      next(e)
    }
  }
)

//update member info by admin
router.post(
  '/users/update-by-admin/:id/',
  auth,
  committeeAuth,
  adminAuth,
  async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id)
      if (!user) {
        throw new Error('UserNotFound')
      }
      if (req.body.activeCommttiee != undefined) {
        user.activeCommttiee = req.body.activeCommttiee
      }
      if (req.body.activeEmail != undefined) {
        user.activeEmail = req.body.activeEmail
      }
      if (req.body.position) {
        user.position = req.body.position
      }
      if (req.body.email) {
        user.email = req.body.email
      }
      if (req.body.membershipID) {
        user.membershipID = req.body.membershipID
      }
      if (req.body.role) {
        user.role = req.body.role
      }
      if (req.body.pointsHistory) {
        user.pointsHistory = user.pointsHistory.concat(req.body.pointsHistory)
        user.points = user.points + parseInt(req.body.pointsHistory.amount)
        await user.save()
        res.status(200).send(user.pointsHistory)
      }
      if (req.body.removeHistory) {
        user.pointsHistory = user.pointsHistory.filter(
          (v) => v._id.toString() !== req.body.removeHistory._id
        )
        user.points = user.points - parseInt(req.body.removeHistory.amount)
        await user.save()
        res.status(200).send(user.pointsHistory)
      }
      await user.save()

      res.status(200).send()
    } catch (e) {
      next(e)
    }
  }
)

//add points by admin
router.post('/users/addPoints/multi/', auth, committeeAuth, adminAuth, (req, res, next) => {
  try {
    const { selected, amount, title } = req.body
    if (!/^-?\d+$/.test(amount)) {
      throw new Error('ValidationError')
    }
    selected.forEach(async (v) => {
      const user = await User.findById(v.id)
      if (!user) {
        throw new Error('UserNotFound')
      }
      user.pointsHistory = user.pointsHistory.concat({ amount: parseInt(amount), title })
      user.points = user.points + parseInt(amount)

      await user.save()
    })
    res.status(200).send()
  } catch (e) {
    next(e)
  }
})

module.exports = router
