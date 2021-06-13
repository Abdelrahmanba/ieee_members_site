const mongoose = require("mongoose")

const speakerSchema = mongoose.Schema({
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

const Speaker = mongoose.model("Speaker", speakerSchema)

module.exports = Speaker
