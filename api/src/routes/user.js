const express = require("express")
const User = require("../db/user")
const auth = require("../middlewares/auth")

const router = express.Router()

router.post("/users", async (req, res, next) => {
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

router.get("/users/login", async (req, res, next) => {
  try {
    const user = await User.findByEmailAndPassword(req.body)
    const token = await user.generateAuthToken()
    res.status(202).send({ user, token })

  } catch (e) {
    next(e)
  }
})

router.get("/users/me", auth, async ({user,token}, res, next) => {
    try {
      res.status(200).send({ user, token })
    } catch (e) {
      next(e)
    }
  })
  


module.exports = router
