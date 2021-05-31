const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const fetch = require("node-fetch")
const crypto = require('crypto');


const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    index: true,
    unique: [true, "A user with that email address exists."],
    validate: [validator.isEmail, "Invalid email format."],
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: [6, "Password can't be less than 8 characters."],
  },
  firstName: {
    type: String,
    required: true,
    validate: [validator.isAlpha, "First name must contain letters only."],
  },
  lastName: {
    type: String,
    required: true,
    validate: [validator.isAlpha, "Last name must contain letters only"],
  },
  bday: {
    type: Date,
  },
  gender: {
    type: String,
    maxLength: 1,
  },
  role: {
    type: String,
  },

  active: {
    type: Boolean,
    default: false,
  },

  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  events: [
    {
      event: {
        type: String,
        required: true,
      },
    },
  ],
  points: {
    type: Number,
    defualt: 0,
  },
  pointsHistory: [
    {
      historyItem: {
        type: String,
        required: true,
      },
    },
  ],
  secretCode: {
    type: String,
  },
})

//encrypt password before saving
userSchema.pre("save", async function (next) {
  const user = this
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8)
  }
  next()
})

//hide private data passwords ..
userSchema.methods.toJSON = function () {
  const user = this
  const userObj = user.toObject()

  delete userObj.password
  delete userObj.tokens

  return userObj
}

//generate Auth token

userSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JSON_SECRET)
  user.tokens = user.tokens.concat({ token })
  await user.save()
  return token
}

//find user by email/password
userSchema.statics.findByEmailAndPassword = async function ({
  email,
  password,
}) {
  const user = await User.findOne({ email })
  if (!user) {
    throw new Error("UserNotFound")
  }
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    throw new Error("BadCredentials")
  }
  return user
}
//send validation email
userSchema.methods.sendVerifcationEmail = async function () {
  const user = this
  const random = Math.random() * 1000000
  user.secretCode = crypto.createHash('md5').update(random.toString()).digest('hex')

  //sendinblue api call
  const url = "https://api.sendinblue.com/v3/smtp/email"
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "api-key": process.env.SENDINBLUE_API,
    },
    body: JSON.stringify({
      to: [{email: user.email, name: user.firstName + " " + user.lastName}],
      params: { user: user._id, secretCode: user.secretCode },
    }),
  }

  try {
    const res = await fetch(url, options)
    const resJson = await res.json()

  } catch (e) {
    console.log(e)
  }
}
const User = mongoose.model("user", userSchema)

module.exports = User
