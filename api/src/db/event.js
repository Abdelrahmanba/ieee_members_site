const mongoose = require("mongoose")

const eventSchema = mongoose.Schema({
  name: {
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
  speakers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Speaker" }],

  orginizers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

  description: String,
  images: [
    {
      image: {
        url: String,
      },
    },
  ],
})

const Event = mongoose.model("Event", eventSchema)

module.exports = Event
