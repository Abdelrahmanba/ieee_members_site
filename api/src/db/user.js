const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    index: true,
    validate(email) {
      if (!validator.isEmail(email)) {
        throw new Error("Invalid Email foramt")
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    min: 6,
  },
  firstName: {
    type: String,
    required: true,
    validate(fName) {
      if (!validator.isAlpha(fName)) {
        throw new Error("fname must contain letters only")
      }
    },
  },
  lastName: {
    type: String,
    required: true,
    validate(lName) {
      if (!validator.isAlpha(lName)) {
        throw new Error("lname must contain letters only")
      }
    }
  },
    bday: {
      type: Date
    },
    gender: {
      type: String,
      max: 1,
    },
    role: {
      type: String,
    },

    active: {
      type: Boolean,
    },

    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ]
    
  
  })

//hide private data passwords ..
userSchema.methods.toJSON = function () {
  const user = this
  const userObj = user.toObject()

  delete userObj.password
  delete userObj.tokens

  return userObj
}

//encrypt password before saving
userSchema.pre("save", async function (next) {
  const user = this
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8)
  }
  next()
})

//generate Auth token

userSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JSON_SECRET)
  user.tokens = user.tokens.concat({ token })
  await user.save()
  return token
}

const User = mongoose.model("user", userSchema)

module.exports = User
