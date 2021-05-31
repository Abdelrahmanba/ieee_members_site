const request = require("supertest")
const User = require("../src/db/user")
const app = require("../src/app")
const mongoose = require("mongoose")
require('dotenv').config()
const jwt = require('jsonwebtoken')

const userOneId = new mongoose.Types.ObjectId()

const userOne = {
  _id: userOneId,
  email: "user1@gmail.com",
  password: "123456",
  gender: "m",
  firstName: "abdelrahman",
  lastName: "babaa",
  dateOfBirth: "10/10/2000",
  active: true,
  role: "user",
  tokens: [{
    token: jwt.sign({ _id: userOneId }, process.env.JSON_SECRET)
    }]
}

beforeAll(async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/ieee-api-test", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
})

beforeEach(async () => {
  await User.deleteMany()
  await new User(userOne).save()
})

afterAll(() => {
  mongoose.connection.close()
})


test("should sign up sucsessfully", async () => {
  await request(app)
    .post("/users")
    .send({
      email: "user2@gmail.com",
      password: "12345789",
      gender: "m",
      firstName: "abdelrahman",
      lastName: "babaa",
      dateOfBirth: "10/10/2000",
      role: "user",
    })
    .expect(201)
})

test("reject bad email for signup", async () => {
  await request(app)
    .post("/users")
    .send({
      email: "user2@/mail.com",
      password: "1234567",
      gender: "m",
      firstName: "abdelrahman",
      lastName: "babaa",
      dateOfBirth: "10/10/2000",
      role: "user",
    })
    .expect(400)
})

test("reject short passowrd and bad email", async () => {
  await request(app)
    .post("/users")
    .send({
      email: "user2@/mail.com",
      password: "ab23",
      gender: "m",
      firstName: "abdelrahman",
      lastName: "babaa",
      dateOfBirth: "10/10/2000",
      role: "user",
    })
    .expect(400)
})

test("reject bad login", async () => {
  await request(app)
    .get("/users/login")
    .send({
      email: "user1@gmail.com",
      password: "abood123"
    })
    .expect(401)
})

test("accept valid login", async () => {
  await request(app)
    .get("/users/login")
    .send({
      email: "user1@gmail.com",
      password: "123456"
    })
    .expect(202)
})

test("accept valid login", async () => {
  await request(app)
    .get("/users/login")
    .send({
      email: "user1@gmail.com",
      password: "654321"
    })
    .expect(401)
})



test("reject accsess to /me without auth", async () => {
  await request(app)
    .get("/users/me")
    .send()
    .expect(401)
})

test("accept accsess to /me with valid auth", async () => {
  await request(app)
    .get("/users/me")
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
})
