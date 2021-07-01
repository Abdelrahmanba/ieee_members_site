const jwt = require("jsonwebtoken")

const adminAuth = async (req, res, next) => {
  try {
    const user = req.user
    if (user.role !== "admin") {
      throw new Error()
    }
    next()
  } catch (e) {
    res.status(401).send({
      error: "Unauthorized",
      message: "You don't have accsess to this page.",
    })
  }
}
module.exports = adminAuth
