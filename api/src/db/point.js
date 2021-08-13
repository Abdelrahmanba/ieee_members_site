const mongoose = require('mongoose')

const pointSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    required: true,
    trim: true,
  },
  amount: {
    type: String,
    required: true,
    trim: true,
  },
})
const Point = mongoose.model('Point', pointSchema)

module.exports = Point
