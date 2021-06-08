const errorHandler = (err, req, res, next) => {
  if (err.name === "MongoError") {
    res.status(400).send({
      error: "used-email",
      message: "A user with that email address exists.",
    })
  } else if (err.name === "ValidationError") {
    res.status(400).send({
      error: "ValidationError",
      message: err.message,
    })
  } else if (err.message === "BadCredentials") {
    res.status(401).send({
      error: "BadCredentials",
      message: "Bad email/password combination.",
    })
  } else if (err.message === "UserNotFound") {
    res.status(401).send({
      error: "UserNotFound",
      message: "User not found.",
    })
  } else if (err.message === "BadRequest") {
    res.status(400).send({
      error: "BadRequest",
      message: "BadRequest",
    })
  } else if (err.message === "BadEmailFormat") {
    res.status(400).send({
      error: "BadEmailFormat",
      message: "Please provide a valid Email Address.",
    })
  }
}

module.exports = errorHandler
