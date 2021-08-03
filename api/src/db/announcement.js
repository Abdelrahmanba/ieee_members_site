const mongoose = require('mongoose')

const announcementSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
    deadline: Date,
    description: String,
    featured: String,
    link: {
      type: String,
    },
  },
  { timestamps: true }
)
const Announcement = mongoose.model('Announcement', announcementSchema)

module.exports = Announcement
