const request = require("supertest")
const User = require("../src/db/user")
const app = require("../src/app")
const mongoose = require("mongoose")

const userOne = {
  email: "user1@gmail.com",
  password: "abood123",
  gender: "m",
  firstName: "abdelrahman",
  lastName: "babaa",
  dateOfBirth: "10/10/2000",
  active: true,
  role: "user",
}
beforeAll(() => {
  mongoose.connect("mongodb://127.0.0.1:27017/ieee-api-test", {
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
      password: "abood123",
      gender: "m",
      firstName: "abdelrahman",
      lastName: "babaa",
      dateOfBirth: "10/10/2000",
      active: true,
      role: "user",
    })
    .expect(201)
})

test("reject bad email for signup", async () => {
  await request(app)
    .post("/users")
    .send({
      email: "user2@/mail.com",
      password: "abood123",
      gender: "m",
      firstName: "abdelrahman",
      lastName: "babaa",
      dateOfBirth: "10/10/2000",
      active: true,
      role: "user",
    })
    .expect(500)
})
