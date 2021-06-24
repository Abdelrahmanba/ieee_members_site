const jwt = require("jsonwebtoken")
const User = require("../db/user")

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "")
    const decoded = jwt.verify(token, process.env.JSON_SECRET)

    const user = await User.findOne({ _id: decoded._id, "tokens.token": token })
    if (!user) {
      throw new Error("Unauthorized")
    }
    if (
      user.activeEmail === false &&
      user.activeCommttiee === false &&
      req.originalUrl !== "/user/me"
    ) {
      throw new Error("NotActivated")
    }
    req.user = user
    req.token = token
    next()
  } catch (e) {
    if (e.message == "NotActivated") {
      res.status(400).send({
        error: "NotActivated",
        message: "You don't have accsess to this page.",
      })
    } else {
      res.status(401).send({
        error: "Unauthorized",
        message: "You don't have accsess to this page.",
      })
    }
  }
}
module.exports = auth
