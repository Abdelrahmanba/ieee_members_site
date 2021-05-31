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
    req.user = user
    req.token = token
    next()
  } catch (e) {
    res.status(401).send({
      error: "Unauthorized",
      message: "You don't have accsess to this page.",
    })
  }
}
module.exports = auth
