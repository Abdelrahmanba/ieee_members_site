const express = require("express")
const User = require("../db/user")
const auth = require("../middlewares/auth")
const limiter = require("express-rate-limit")
const validator = require("validator")

const createLimit = limiter({
  windowMs: 24 * 60 * 60 * 1000, // 24 hrs in milliseconds
  max: 5,
  message: {
    error: "You can't register more accounts today, try after 24 hrs",
  },
  headers: true,
})

const resendLimit = limiter({
  windowMs: 24 * 60 * 60 * 1000, // 24 hrs in milliseconds
  max: 5,
  message: {
    error:
      "you was temporarily suspended from using this feature try after 24 hrs, something wrong? please contact us at webmaster@ieee-annu.com",
  },
  headers: true,
})

const router = express.Router()

router.post("/users", createLimit, async (req, res, next) => {
  const user = new User(req.body)
  try {
    await user.save()
    const token = await user.generateAuthToken()
    await user.sendVerifcationEmail()
    res.status(201).send({ user, token })
  } catch (e) {
    console.log(e)
    next(e)
  }
})

router.post("/users/login", async (req, res, next) => {
  try {
    if (req.body.email) {
      if (!validator.isEmail(req.body.email)) {
        throw new Error("BadEmailFormat")
      }
    } else {
      throw new Error("BadRequest")
    }

    const user = await User.findByEmailAndPassword(req.body)
    const token = await user.generateAuthToken()
    res.status(202).send({ user, token })
  } catch (e) {
    next(e)
  }
})

router.get(
  "/users/resend_verification/:userId",
  resendLimit,
  async (req, res, next) => {
    try {
      const user = await User.findById(req.params.userId)
      if (!user) {
        throw new Error("UserNotFound")
      }
      await user.sendVerifcationEmail()
      res.status(200).send({ message: `Email was sent to ${user.email}` })
    } catch (e) {
      next(e)
    }
  }
)

router.get("/users/me", auth, async ({ user, token }, res, next) => {
  try {
    res.status(200).send({ user, token })
  } catch (e) {
    next(e)
  }
})

router.get(
  "/api/verify-account/:userId/:secretCode",
  async (req, res, next) => {
    const { userId, secretCode } = req.params

    try {
      const user = await User.findById(userId)
      if (!user) {
        throw new Error("UserNotFound")
      }
      if (secretCode == user.secretCode) {
        if (user.active == true) {
          res.status(400).send({ message: "Invalid Link" })
        }
        user.active = true
        await user.save()
        res.status(202).send({ message: "Sucsessfully Verifuied" })
      }
      res.status(400).send({ message: "Invalid link" })
    } catch (e) {
      next(e)
    }
  }
)

module.exports = router
