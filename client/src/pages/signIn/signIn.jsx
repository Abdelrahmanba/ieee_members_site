import { ReactComponent as Particels } from "../../assets/paricles.svg"
import "./signIn.styles.scss"

import { useState } from "react"
import { signIn } from "../../redux/userSlice.js"
import { useDispatch } from "react-redux"
import { Button, Alert } from "antd"
import Textfield from "../../components/textfield/textfield"
import Form from "../../components/form/form"
import ResetPassword from "../../components/resetPassword/resetPassword"
import PublicHeader from "../../components/header/publicHeader"

const SignIn = (props) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(undefined)
  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)

  const dispatch = useDispatch()

  const handleChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value)
    } else {
      setPassword(e.target.value)
    }
  }

  const submit = async (e) => {
    e.preventDefault()
    props.location.state = undefined
    setLoading(true)
    const res = await fetch("http://localhost:3000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
    const jsonRes = await res.json()
    if (jsonRes.token) {
      dispatch(signIn(jsonRes))
      props.history.push("/dashboard/home")
    } else {
      setLoading(false)
      setError(jsonRes)
    }
  }

  return (
    <>
      <PublicHeader />
      <ResetPassword visible={modalVisible} setModalVisible={setModalVisible} />
      <section className="sign-in">
        <div className="signin-box">
          <div className="box-header">
            <Particels className="Particels" />
          </div>
          <Form method="POST">
            <h1 className="signin-header">Welcome Back</h1>
            <Textfield
              onChange={handleChange}
              type="text"
              name="email"
              text="Email Address"
              value={email}
            />
            <Textfield
              onChange={handleChange}
              type="password"
              name="password"
              text="Password"
              value={password}
            />
            <Button block type="primary" loading={loading} onClick={submit}>
              Sign In
            </Button>

            {error ? (
              <Alert
                message="Login Faild"
                description={error.message}
                type="error"
                showIcon
                className={"alert"}
              />
            ) : (
              ""
            )}

            {props.location.state ? (
              <Alert
                message="Sign In Required"
                description="Please Sign In to view this page."
                type="info"
                showIcon
                className="alert"
              />
            ) : (
              ""
            )}
            <p
              className="forgot-password"
              onClick={() => setModalVisible(true)}
            >
              Forgot your password?
            </p>
          </Form>
        </div>
      </section>
    </>
  )
}

export default SignIn
