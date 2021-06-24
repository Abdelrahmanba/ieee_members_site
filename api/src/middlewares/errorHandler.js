const errorHandler = (err, req, res, next) => {
  if (err.name === "MongoError") {
    res.status(400).send({
      error: "Used Email",
      message: "A user with that email address exists.",
    })
  } else if (err.name === "ValidationError") {
    res.status(400).send({
      error: "Validation Error",
      message: err.message,
    })
  } else if (err.message === "BadCredentials") {
    res.status(401).send({
      error: "Bad Credentials",
      message: "Bad email/password combination.",
    })
  } else if (err.message === "UserNotFound") {
    res.status(401).send({
      error: "User Not Found",
      message: "Please double check your input",
    })
  } else if (err.message === "BadRequest") {
    res.status(400).send({
      error: "Bad Request",
      message: "Please Try agian later.",
    })
  } else if (err.message === "BadEmailFormat") {
    res.status(400).send({
      error: "Bad Email Format",
      message: "Please provide a valid Email Address.",
    })
  } else {
    res.status(400).send({
      error: "Somthing Went Wrong",
      message: "Please Try agian later.",
    })
  }
}

module.exports = errorHandler
