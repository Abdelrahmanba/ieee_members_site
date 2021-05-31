const errorHandler = (err, req, res, next) => {
  if (err.name === "MongoError") {
    res.status(400).send({
      error: "used-email",
      message: "A user with that email address exists.",
    })
  } else if (err.name === "ValidationError") {
    res.status(400).send({
      error: "ValidationError",
      message: err.message
    })
  }
  else if (err.message === "BadCredentials") {
    res.status(401).send({
      error: "BadCredentials",
      message: "Bad email/password combination."
    })
  }
  else if (err.message === "UserNotFound") {
    res.status(401).send({
      error: "UserNotFound",
      message: "User not found."
    })
  }
}

module.exports = errorHandler
