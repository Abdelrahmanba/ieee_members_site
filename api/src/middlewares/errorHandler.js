const errorHandler = (err, req, res, next) => {
  if (err.name === 'MongoError') {
    res.status(400).send({
      error: 'Used Email',
      message: 'A user with that email address exists.',
    })
  } else if (err.name === 'ValidationError') {
    res.status(400).send({
      error: 'Validation Error',
      message: 'Please Check Your input.',
    })
  } else if (err.message === 'BadCredentials') {
    res.status(401).send({
      error: 'Bad Credentials',
      message: 'Bad email/password combination.',
    })
  } else if (err.message === 'UserNotFound') {
    res.status(400).send({
      error: 'User Not Found',
      message: 'Please double check your input',
    })
  } else if (err.message === 'EventNotFound') {
    res.status(400).send({
      error: 'Event Not Found',
      message: 'Please double check your input',
    })
  } else if (err.message === 'AnnouncementNotFound') {
    res.status(400).send({
      error: 'Announcement Not Found',
      message: 'Please double check your input',
    })
  } else if (err.message === 'BadRequest') {
    res.status(400).send({
      error: 'Bad Request',
      message: 'Please Try agian later.',
    })
  } else if (err.message === 'BadEmailFormat') {
    res.status(400).send({
      error: 'Bad Email Format',
      message: 'Please provide a valid Email Address.',
    })
  } else if (err.message === 'EmptyFields') {
    res.status(400).send({
      error: 'Empty Fields',
      message: 'Please make sure to fill all fields.',
    })
  } else {
    res.status(400).send({
      error: 'Somthing Went Wrong',
      message: 'Please Try agian later.',
    })
  }
}

module.exports = errorHandler
