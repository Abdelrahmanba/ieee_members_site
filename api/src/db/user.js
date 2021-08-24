const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const mailjet = require('node-mailjet').connect(process.env.MAILJET_API, process.env.MAILJET_SECRET)

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    index: true,
    unique: [true, 'A user with that email address exists.'],
    validate: [validator.isEmail, 'Invalid email format.'],
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: [6, "Password can't be less than 6 characters."],
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  bday: {
    type: Date,
  },
  membershipID: {
    type: Number,
  },
  gender: {
    type: String,
    maxLength: 1,
  },
  imageData: {
    type: Buffer,
  },
  role: {
    type: String,
    default: 'user',
  },

  activeEmail: {
    type: Boolean,
    default: false,
  },
  activeCommttiee: {
    type: Boolean,
    default: false,
  },
  phoneNo: {
    type: String,
  },

  token: {
    type: String,
  },

  eventsParticipatedIn: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
  points: {
    type: Number,
    default: 0,
  },
  committeePoints: {
    type: Number,
    default: 0,
  },
  pointsHistory: [
    {
      title: String,
      amount: Number,
      committee: {
        type: Boolean,
        default: false,
      },
    },
  ],
  secretCode: {
    type: String,
  },
  passwordReset: {
    type: String,
  },
  position: {
    type: String,
    default: 'Member',
  },
})

//encrypt password before saving
userSchema.pre('save', async function (next) {
  const user = this
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }
  next()
})

//hide private data passwords ..
userSchema.methods.toJSON = function () {
  const user = this
  const userObj = user.toObject()

  delete userObj.password
  delete userObj.token
  delete userObj.secretCode
  delete userObj.passwordReset
  delete userObj.eventsParticipatedIn
  delete userObj.eventsVolunteeredIn
  delete userObj.pointsHistory
  delete userObj.imageData
  return userObj
}

//generate Auth token

userSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JSON_SECRET)
  user.token = token
  await user.save()
  return token
}

//find user by email/password
userSchema.statics.findByEmailAndPassword = async function ({ email, password }) {
  const user = await User.findOne({ email })
  if (!user) {
    throw new Error('UserNotFound')
  }
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    throw new Error('BadCredentials')
  }
  return user
}

//send validation email
userSchema.methods.sendVerifcationEmail = async function (secretCode) {
  const user = this
  if (!secretCode) {
    user.secretCode = crypto
      .randomBytes(48)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/\=/g, '')
  } else {
    user.secretCode = secretCode
  }
  await user.save()

  const conf_url = `ieee-annu.com/api/verify-account/${user._id}/${user.secretCode}`

  //MAILJET api call
  const result = await mailjet.post('send', { version: 'v3.1' }).request({
    Messages: [
      {
        TemplateID: 2927753,
        Variables: {
          fname: user.firstName,
          confirmation_link: conf_url,
        },
        TemplateLanguage: true,

        To: [
          {
            Email: user.email,
            Name: user.firstName,
          },
        ],
      },
    ],
  })
}

//send password Reset email
userSchema.methods.sendRestPassword = async function () {
  const user = this
  user.passwordReset = crypto
    .randomBytes(48)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/\=/g, '')

  await user.save()

  const conf_url = `ieee-annu.com/api/reset-password/${user._id}/${user.passwordReset}`

  //MAILJET api call
  const result = await mailjet.post('send', { version: 'v3.1' }).request({
    Messages: [
      {
        TemplateID: 2949248,
        Variables: {
          fname: user.firstName,
          confirmation_link: conf_url,
        },
        TemplateLanguage: true,

        To: [
          {
            Email: user.email,
            Name: user.firstName,
          },
        ],
      },
    ],
  })
}
const User = mongoose.model('User', userSchema)

module.exports = User
