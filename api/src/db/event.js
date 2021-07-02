const mongoose = require('mongoose')

const eventSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    duration: {
      type: String,
      required: true,
      trim: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    location: {
      required: true,
      type: String,
      trim: true,
    },
    orginizers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    description: String,
    images: [
      {
        image: {
          url: String,
        },
      },
    ],
    availableTickets: {
      type: Number,
      required: true,
    },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    price: {
      type: Number,
      required: true,
    },
    society: String,
    allowNonMembers: {
      type: Boolean,
      default: true,
    },
    nonMembers: [
      {
        name: String,
        email: String,
        year: String,
        phone: String,
      },
    ],
    link: {
      type: String,
    },
  },
  { timestamps: true }
)
const Event = mongoose.model('Event', eventSchema)

module.exports = Event
