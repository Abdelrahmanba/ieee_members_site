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
    description: String,
    images: [{ type: String }],
    availableTickets: {
      type: Number,
      required: true,
    },
    participants: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        date: {
          type: Date,
        },
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    society: String,
    allowNonMembers: {
      type: Boolean,
      default: true,
    },
    featured: String,
    nonMembers: [
      {
        name: String,
        email: String,
        year: String,
        phone: String,
        date: Date,
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
